import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export interface Env {
  DB: D1Database;
}

const yoga = createYoga<Env>({
  schema,
  graphqlEndpoint: '/api/graphql',
});

export default {
  async fetch(request: Request, env: Env) {
    return yoga.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
