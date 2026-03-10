// apps/service/pages/api/graphql.ts
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@/src/graphql/schema';
import { resolvers } from '@/src/graphql/resolvers';
import { createContext } from '@/src/graphql/context';

export const config = { runtime: 'edge' };

const schema = makeExecutableSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  context: ({ request }) => createContext(request),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response, Request, Headers },
});

export default yoga;
