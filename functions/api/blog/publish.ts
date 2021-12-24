import JsonResponse from "../json-response";
import indexPost from "./index-post";
import IPost from "./post";

interface IBody {
  token: string;
  key: string;
  post: IPost;
}

function verifyBody(body: IBody, env: { SECURITY_TOKEN: string }) {
  if (body.token !== env.SECURITY_TOKEN) {
    console.log(body.token, env.SECURITY_TOKEN);
    return new JsonResponse(
      "Ryko i koko, chuj ci w oko, spierdalaj od mojej funkcji!",
      { status: 403 }
    );
  }

  if (typeof body.key !== 'string' || body.key.length === 0) {
    return new JsonResponse(
      "Key is not set or is not a string",
      { status: 400 }
    )
  }

  if (!body.post) {
    return new JsonResponse(
      "No post in body, u kiddin' me?",
      { status: 400 }
    );
  }

  return null;
}

export async function onRequestPost(context: EventContext<{ DB: KVNamespace, SECURITY_TOKEN: string }, any, any>) {
  const { request, env } = context;

  const body = await request.json<IBody>();

  const potentialErrorResponse = verifyBody(body, env);
  if (potentialErrorResponse) {
    return potentialErrorResponse;
  }

  try {
    const stringifiedPost = JSON.stringify(body.post);
    const postFromDB = await env.DB.get(body.key);

    // Little bit cursed comparing content that can be kilobytes in size, but whatever XD
    // So if uploaded post is equal to post in DB, then I will not write it to database
    // Waste of my precious write operations
    if (postFromDB && stringifiedPost === postFromDB) {
      return new JsonResponse(body.post, { status: 200 });
    }

    await env.DB.put(body.key, stringifiedPost);
    await indexPost(env.DB, body.key, body.post);
    return new JsonResponse(body.post, { status: 201 });
  }
  catch (err) {
    return new JsonResponse((<any>err)?.toString(), {
      status: 500
    });
  }
}
