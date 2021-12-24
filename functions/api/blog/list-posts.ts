import JsonResponse from "../json-response";
import IIndexEntry from "./index-entry";

const allowedSortFields = [ 'date', 'title' ];
const sortDirections = ['asc', 'desc'];

function getQueryParams(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ?? 666666;
  const offset = url.searchParams.get('offset') ?? 0;
  const sort = url.searchParams.get('sort') ?? 'date:desc';
  const tags = url.searchParams.getAll('tags');

  return {
    limit: parseInt(limit.toString()),
    offset: parseInt(offset.toString()),
    sort,
    tags
  }
}

function verifyQueryParams({ limit, offset, sort, tags }: any) {
  const [ sortField, sortDirection ] = sort.split(':');
  if (!allowedSortFields.includes(sortField) || !sortDirections.includes(sortDirection)) {
    return new JsonResponse(
      `Invalid sort parameter. Use: <field>:<direction>. Allowed fields: ${allowedSortFields.join(', ')}, allowed directions: ${sortDirections.join(', ')}`,
      { status: 400 }
    );
  }

  if (Number.isNaN(limit)) {
    return new JsonResponse(
      `Limit parameter must be a number`,
      { status: 400 }
    );
  }

  if (Number.isNaN(offset)) {
    return new JsonResponse(
      `Offset parameter must be a number`,
      { status: 400 }
    );
  }

  return null;
}

function compareToSort<T>(a: T, b: T) {
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  return a < b ? -1 : 1;
}

function sortIdx(idx: IIndexEntry[], sort: string): IIndexEntry[] {
  const [ sortField, sortDirection ] = sort.split(':');
  idx.sort((a, b) => compareToSort(a[sortField], b[sortField]));

  if (sortDirection === 'desc') {
    idx.reverse();
  }
  return idx;
}

function filterByTags(idx: IIndexEntry[], tags?: string[]) {
  if (!tags || tags.length === 0) {
    return idx;
  }
  return idx.filter(entry => {
    if (!(entry.tags instanceof Array)) {
      return false;
    }
    return tags.some(tag => entry.tags!.includes(tag));
  });
}

export async function onRequestGet(context: EventContext<{ DB: KVNamespace }, "key", any>) {
  const { request, env } = context;
  const idxJson = await env.DB.get('__idx');

  if (!idxJson) {
    return new JsonResponse([]);
  }

  const { limit, offset, sort, tags } = getQueryParams(request);
  const potentialErrorResponse = verifyQueryParams({ limit, offset, sort, tags });
  if (potentialErrorResponse) {
    return potentialErrorResponse;
  }

  const idx = JSON.parse(idxJson) as IIndexEntry[];
  idx.forEach(entry => entry.date = new Date(entry.date));

  // Sorting
  sortIdx(idx, sort);

  // Filter by tags
  const filtered = filterByTags(idx, tags);

  // now limit & offset
  const limited = filtered.slice(offset, offset + limit);

  return new JsonResponse(limited);
}
