import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  KV: KVNamespace;
}

const yoga = createYoga<Env>({
  schema,
  graphqlEndpoint: '/api/graphql',
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function handleUpload(request: Request, env: Env): Promise<Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return new Response('Missing file', {
        status: 400,
        headers: corsHeaders,
      });
    }

    const objectName = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    await env.BUCKET.put(objectName, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return new Response(
      JSON.stringify({
        key: objectName,
        url: `/api/images/${objectName}`,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server Error';
    return new Response(message, { status: 500, headers: corsHeaders });
  }
}

async function handleImages(url: URL, env: Env): Promise<Response> {
  const key = url.pathname.replace('/api/images/', '');
  const object = await env.BUCKET.get(key);

  if (object === null) {
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }

  const headers = new Headers(corsHeaders);
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body as ReadableStream, { headers });
}

async function handleKvSet(request: Request, env: Env): Promise<Response> {
  try {
    const { key, value } = await request.json<{
      key?: string;
      value?: unknown;
    }>();

    if (!key) {
      return new Response('Missing key', { status: 400, headers: corsHeaders });
    }

    await env.KV.put(key, JSON.stringify(value ?? null), {
      expirationTtl: 60 * 60,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server Error';
    return new Response(message, { status: 500, headers: corsHeaders });
  }
}

async function handleKvGet(url: URL, env: Env): Promise<Response> {
  const key = url.searchParams.get('key');
  if (!key) {
    return new Response('Missing key', { status: 400, headers: corsHeaders });
  }

  const value = await env.KV.get(key, 'json');

  return new Response(JSON.stringify({ key, value }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/upload' && request.method === 'POST') {
      return handleUpload(request, env);
    }

    if (url.pathname.startsWith('/api/images/') && request.method === 'GET') {
      return handleImages(url, env);
    }
    if (url.pathname === '/api/kv/set' && request.method === 'POST') {
      return handleKvSet(request, env);
    }

    if (url.pathname === '/api/kv/get' && request.method === 'GET') {
      return handleKvGet(url, env);
    }

    return yoga.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
