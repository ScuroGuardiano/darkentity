interface IBody {
  token: string;
  key: string;
  post: any;
}

function verifyBody(body: IBody, env: { SECURITY_TOKEN: string }) {
  if (body.token !== env.SECURITY_TOKEN) {
    console.log(body.token, env.SECURITY_TOKEN);
    return new Response(
      "Ryko i koko, chuj ci w oko, spierdalaj od mojej funkcji!",
      { status: 403 }
    );
  }

  if (typeof body.key !== 'string' || body.key.length === 0) {
    return new Response(
      "Key is not set or is not a string",
      { status: 400 }
    )
  }

  if (!body.post) {
    return new Response(
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
    await env.DB.put(body.key, JSON.stringify(body.post));
    return new Response(null, { status: 204 });
  }
  catch (err) {
    return new Response((<any>err)?.toString(), {
      status: 500
    });
  }
}
