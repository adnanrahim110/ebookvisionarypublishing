import "./load-local-env";

import { createReadStream, existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { createClient } from "@sanity/client";

import { HOME_PAGE } from "../constants";

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

type ImageReference = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

type SanityDocTarget = {
  _id: string;
  title?: string;
  featureCount?: number;
};

const serviceImageSources = [
  { slug: "ghostwriting", folder: "ghostwriting service page" },
  { slug: "book-editing", folder: "book editing service page" },
  { slug: "book-formatting", folder: "book formatting page" },
  { slug: "proofreading", folder: "book proofreading service page" },
  { slug: "author-website", folder: "Author website serivce page" },
  { slug: "book-cover-design", folder: "Book cover design page" },
  { slug: "book-illustration", folder: "book illustration page" },
  { slug: "book-publishing", folder: "book publishing service page" },
] as const;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function imageReference(assetId: string): ImageReference {
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
}

function requireFile(path: string) {
  if (!existsSync(path)) {
    throw new Error(`Missing image file: ${path}`);
  }
}

async function uploadImage(path: string, label: string) {
  requireFile(path);
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
  });

  console.log(`Uploaded ${label}: ${asset._id}`);
  return imageReference(asset._id);
}

async function fetchTargets(query: string, params: Record<string, string>, label: string) {
  const docs = await client.fetch<SanityDocTarget[]>(query, params);

  if (!docs.length) {
    throw new Error(`No Sanity document found for ${label}.`);
  }

  return docs;
}

async function patchTargets(
  docs: SanityDocTarget[],
  set: Record<string, unknown>,
  label: string,
) {
  for (const doc of docs) {
    await client.patch(doc._id).set(set).commit({ autoGenerateArrayKeys: true });
  }

  console.log(`Patched ${label} on ${docs.length} document(s).`);
}

function serviceImagePath(folder: string, imageNumber: number) {
  return resolve(process.cwd(), "Website images", folder, `${imageNumber}.jpg`);
}

async function patchPricingImage() {
  const docs = await fetchTargets(
    `*[_type == "pageContent" && pageKey == "home" && !(_id in path("versions.**"))]{_id}`,
    {},
    "home page content",
  );
  const image = await uploadImage(
    resolve(process.cwd(), "public", "images", "author-publishing.png"),
    "home pricing image",
  );

  await patchTargets(
    docs,
    {
      "pricing.imageAsset": image,
      "pricing.imageAlt": HOME_PAGE.pricing.image.alt,
    },
    "home pricing image",
  );
}

async function patchServiceImages() {
  for (const source of serviceImageSources) {
    const docs = await fetchTargets(
      `*[_type == "service" && slug.current == $slug && !(_id in path("versions.**"))]{
        _id,
        title,
        "featureCount": count(features)
      }`,
      { slug: source.slug },
      `service "${source.slug}"`,
    );

    const overviewImage = await uploadImage(
      serviceImagePath(source.folder, 1),
      `${source.slug} overview image`,
    );
    const featureImages = await Promise.all(
      [2, 3, 4, 5, 6, 7].map((imageNumber) =>
        uploadImage(
          serviceImagePath(source.folder, imageNumber),
          `${source.slug} feature ${imageNumber - 1} image`,
        ),
      ),
    );

    for (const doc of docs) {
      const set: Record<string, unknown> = {
        overviewImage,
      };
      const featureCount = doc.featureCount ?? 0;

      for (let index = 0; index < featureImages.length; index += 1) {
        if (index >= featureCount) {
          console.warn(
            `Skipped ${source.slug} feature image ${index + 1}; document ${doc._id} has only ${featureCount} feature(s).`,
          );
          continue;
        }

        set[`features[${index}].image`] = featureImages[index];
      }

      await patchTargets([doc], set, `${source.slug} service images`);
    }
  }
}

async function main() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN. Create a Sanity token with write access and run this script with that env var set.",
    );
  }

  await patchPricingImage();
  await patchServiceImages();

  console.log(`Seeded Sanity image fields into ${projectId}/${dataset}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
