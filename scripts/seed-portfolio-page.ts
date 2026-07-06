import "./load-local-env";

import { PORTFOLIO_PAGE } from "../constants";

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "8as027bx";
const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-05-04";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

type ReferenceValue = {
  _key?: string;
  _type?: "reference";
  _ref?: string;
};

type PortfolioBookDoc = {
  _id: string;
};

type PortfolioPageDoc = {
  _id: string;
  portfolioBooks?: ReferenceValue[];
};

type PortfolioQueryResult = {
  portfolioPage: PortfolioPageDoc | null;
  books: PortfolioBookDoc[];
};

function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function pageHero(hero: { breadcrumbs?: unknown[] } & Record<string, unknown>) {
  const rest = { ...hero };
  delete rest.breadcrumbs;
  return rest;
}

function keyForRef(id: string, index: number) {
  const normalizedId = id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
  return `book${index + 1}${normalizedId}`;
}

function makeRef(id: string, index: number): Required<ReferenceValue> {
  return {
    _key: keyForRef(id, index),
    _type: "reference",
    _ref: id,
  };
}

function mergeBookRefs(
  existingRefs: ReferenceValue[] | undefined,
  books: PortfolioBookDoc[],
) {
  const refs: Required<ReferenceValue>[] = [];
  const seen = new Set<string>();

  for (const item of existingRefs || []) {
    if (!item?._ref || seen.has(item._ref)) continue;

    refs.push({
      _key: item._key || keyForRef(item._ref, refs.length),
      _type: "reference",
      _ref: item._ref,
    });
    seen.add(item._ref);
  }

  for (const book of books) {
    if (seen.has(book._id)) continue;

    refs.push(makeRef(book._id, refs.length));
    seen.add(book._id);
  }

  return refs;
}

function refsChanged(
  existingRefs: ReferenceValue[] | undefined,
  nextRefs: ReferenceValue[],
) {
  const existing = (existingRefs || []).map((item) => item?._ref).filter(Boolean);
  const next = nextRefs.map((item) => item._ref).filter(Boolean);

  return (
    existing.length !== next.length ||
    existing.some((ref, index) => ref !== next[index])
  );
}

async function sanityQuery<T>(query: string): Promise<T> {
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Sanity query failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { result: T };
  return data.result;
}

async function sanityMutate(mutations: unknown[]) {
  if (mutations.length === 0) return;

  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Sanity mutation failed (${response.status}): ${body}`);
  }
}

async function main() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN. Create a Sanity token with write access and run this script with that env var set.",
    );
  }

  const data = await sanityQuery<PortfolioQueryResult>(`{
    "portfolioPage": *[_type == "pageContent" && pageKey == "portfolio"][0]{
      _id,
      portfolioBooks[]{_key, _type, _ref}
    },
    "books": *[_type == "portfolioBook"] | order(orderRank asc, _createdAt asc){_id}
  }`);

  const portfolioBooks = mergeBookRefs(
    data.portfolioPage?.portfolioBooks,
    data.books,
  );
  const mutations: unknown[] = [];

  if (!data.portfolioPage) {
    mutations.push({
      createIfNotExists: clean({
        _id: "pageContent-portfolio",
        _type: "pageContent",
        pageKey: "portfolio",
        seo: PORTFOLIO_PAGE.seo,
        pageHero: pageHero(PORTFOLIO_PAGE.hero),
        portfolio: PORTFOLIO_PAGE.portfolio,
        ctaBanner: PORTFOLIO_PAGE.ctaBanner,
        portfolioBooks,
      }),
    });
  } else if (refsChanged(data.portfolioPage.portfolioBooks, portfolioBooks)) {
    mutations.push({
      patch: {
        id: data.portfolioPage._id,
        set: { portfolioBooks },
      },
    });
  }

  await sanityMutate(mutations);

  const action = mutations.length ? "Updated" : "No changes needed for";
  console.log(
    `${action} Portfolio page content in ${projectId}/${dataset}. Book references: ${portfolioBooks.length}. Existing portfolio books were not replaced.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
