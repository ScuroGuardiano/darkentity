export default class JsonResponse extends Response {
  constructor(
    body?: any,
    init: globalThis.ResponseInit = {}
  ) {
    const headers = new Headers(init.headers ?? {});
    headers.append('content-type', 'application/json');
    init.headers = headers;
    super(JSON.stringify(body), init);
  }
}
