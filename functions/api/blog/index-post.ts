import IIndexEntry from "./index-entry";
import IPost from "./post";

export default async function indexPost(DB: KVNamespace, key: string, post: IPost) {
  const idxJson = await DB.get('__idx');
  const idx: IIndexEntry[] = idxJson ? JSON.parse(idxJson) : [];

  idx.push({
    key,
    title: post.title,
    date: post.date,
    tags: post.tags
  });

  await DB.put('__idx', JSON.stringify(idx));
}
