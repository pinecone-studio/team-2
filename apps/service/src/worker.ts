import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export interface Env {
  DB: D1Database;
  // BUCKET: R2Bucket;  // add back when R2 is enabled
}

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return yoga.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
