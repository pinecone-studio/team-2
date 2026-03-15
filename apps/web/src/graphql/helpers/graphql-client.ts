import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  'https://team-service.nbhishgee22.workers.dev/api/graphql';

export async function gqlRequest<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
): Promise<TData> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });

  const json = await res.json();

  if (!res.ok || json.errors?.length) {
    throw new Error(json.errors?.[0]?.message ?? 'GraphQL request failed');
  }

  return json.data as TData;
}
