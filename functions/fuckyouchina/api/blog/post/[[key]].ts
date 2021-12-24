import JsonResponse from "../../json-response";

export async function onRequestGet(context: EventContext<{ DB: KVNamespace }, "key", any>) {
  const { params, env } = context;

  const key = typeof params.key === 'string' ? params.key : params.key.join('/');
  const post = await env.DB.get(key as string);
  if (post) {
    return new JsonResponse(JSON.parse(post));
  } else {
    return new Response(`Post key: ${key} was not found!`, {
      status: 400,
      statusText: "Not found"
    });
  }
}
