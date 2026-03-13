import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
}

const yoga = createYoga<Env>({
  schema,
  graphqlEndpoint: '/api/graphql',
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
          return new Response('Missing file', { status: 400, headers: corsHeaders });
        }

        const objectName = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        
        await env.BUCKET.put(objectName, file.stream(), {
          httpMetadata: { contentType: file.type }
        });
        
        return new Response(JSON.stringify({
          key: objectName,
          url: `/api/images/${objectName}`
        }), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      } catch (err: any) {
        return new Response(err.message || 'Server Error', { status: 500, headers: corsHeaders });
      }
    }

    if (url.pathname.startsWith('/api/images/') && request.method === 'GET') {
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

    return yoga.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
