import { crypto } from "@std/crypto";
import { Poppler } from "node-poppler";
import { encodeHex } from "@std/encoding/hex";
import { contentType } from "@std/media-types";

export default async function getResumeHtml(
  zoom: number,
): Promise<{ htmlText: string; headers: Record<string, string> }> {
  await Deno.remove("./index-html.html").catch(() => undefined);

  const poppler = new Poppler();

  await poppler.pdfToHtml(
    "./static/jose-fabio-arguello-loya-resume.pdf",
    "index",
    {
      zoom,
      dataUrls: true,
      singlePage: true,
      imageFormat: "JPG",
      fontFullName: false,
      complexOutput: true,
    },
  );

  let htmlText = await Deno.readTextFile("./index-html.html");
  await Deno.remove("./index-html.html").catch(() => undefined);

  // Use sans-serif font
  htmlText = htmlText.replaceAll(
    /(?<=font-family:)[a-z+-]+(?=;)/gim,
    "sans-serif",
  );

  // Use target blank for all links
  htmlText = htmlText.replaceAll(/(?<=<a) (?=href=")/gm, ' target="_blank" ');

  // Set the background color to white
  htmlText = htmlText.replaceAll(
    /(?<=<body) bgcolor="#[0-9A-Z]{6}" (?=vlink=")/gm,
    ' bgcolor="white" ',
  );

  // Add a style
  htmlText = htmlText.replace(
    /<\/head>/,
    "<style>a { color: #007399; text-decoration: none; } body { display: flex; justify-content: center; margin: 0; }</style></head>",
  );

  // Change the title and add favicon
  htmlText = htmlText.replace(
    "<title>index-html.html</title>",
    "<title>Jose Fabio Argüello Loya</title>" +
      '<link rel="icon" href="./favicon.svg" type="image/svg+xml" />',
  );

  const headers: Record<string, string> = {
    "Content-Type": contentType(".html"),
    "Access-Control-Allow-Origin": "*",
    "Content-Length": htmlText.length.toString(),
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "ETag": `"${
      encodeHex(
        await crypto.subtle.digest(
          "SHA-384",
          new TextEncoder().encode(htmlText),
        ),
      )
    }"`,
  };

  const { mtime } = await Deno.stat(
    "./static/jose-fabio-arguello-loya-resume.pdf",
  );
  if (mtime) headers["Last-Modified"] = mtime.toUTCString();

  return { htmlText, headers };
}
