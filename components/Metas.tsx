import { WEBSITE_URL } from "../env.ts";

export default function Metas({
  title,
  image,
  description,
}: {
  title: string;
  image?: string;
  description?: string;
}) {
  return (
    <>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="theme-color" content="#797979" />
      <meta name="msapplication-TileColor" content="#797979" />
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEBSITE_URL} />
      {image && <meta property="og:image" content={image} />}
      {description && <meta property="og:description" content={description} />}

      {/* <!-- Twitter --> */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:url" content={WEBSITE_URL} />
      {image && <meta property="twitter:image" content={image} />}
      <meta property="twitter:card" content="summary_large_image" />
      {description && <meta property="twitter:description" content={description} />}
    </>
  );
}
