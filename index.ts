import { crypto } from "@std/crypto";
import { Poppler } from "node-poppler";
import { parse } from "@std/path/parse";
import { encodeHex } from "@std/encoding/hex";
import { contentType } from "@std/media-types";

async function getResponse(zoom: number): Promise<{ htmlText: string; headers: Record<string, string> }> {
  await Deno.remove("./index-html.html").catch(() => undefined);

  const poppler = new Poppler();

  await poppler.pdfToHtml("jose-fabio-arguello-loya-resume.pdf", "index", {
    zoom,
    dataUrls: true,
    singlePage: true,
    imageFormat: "JPG",
    fontFullName: false,
    complexOutput: true,
  });

  let htmlText = await Deno.readTextFile("./index-html.html");
  await Deno.remove("./index-html.html").catch(() => undefined);

  // Use sans-serif font
  htmlText = htmlText.replaceAll(/(?<=font-family:)[a-z+-]+(?=;)/gim, "sans-serif");

  // Use target blank for all links
  htmlText = htmlText.replaceAll(/(?<=<a) (?=href=")/gm, ' target="_blank" ');

  // Set the background color to white
  htmlText = htmlText.replaceAll(/(?<=<body) bgcolor="#[0-9A-Z]{6}" (?=vlink=")/gm, ' bgcolor="white" ');

  // Add a style
  htmlText = htmlText.replace(
    /<\/head>/,
    "<style>a { color: #007399; text-decoration: none; } body { display: flex; justify-content: center; margin: 0; }</style></head>"
  );

  // Change the title and add favicon
  htmlText = htmlText.replace(
    "<title>index-html.html</title>",
    "<title>Jose Fabio Argüello Loya</title>" +
      '<link rel="icon" href="i/favicon/favicon.svg" type="image/svg+xml">'
  );

  const headers: Record<string, string> = {
    "Content-Type": contentType(".html"),
    "Access-Control-Allow-Origin": "*",
    "Content-Length": htmlText.length.toString(),
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "ETag": `"${encodeHex(await crypto.subtle.digest("SHA-384", new TextEncoder().encode(htmlText)))}"`,
  };

  const { mtime } = await Deno.stat("./jose-fabio-arguello-loya-resume.pdf");
  if (mtime) headers["Last-Modified"] = mtime.toUTCString();

  return { htmlText, headers };
}

const mobile = await getResponse(1.5);
const desktop = await getResponse(1.6);

const fileCache = new Map<string, { file: Uint8Array<ArrayBuffer>; headers: HeadersInit }>();

export default {
  async fetch(a: Request) {
    const url = new URL(a.url);
    const pathname = decodeURIComponent(url.pathname);

    switch (pathname) {
      case "/": {
        const userAgent = a.headers.get("User-Agent") || "";
        const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

        const data = isMobile ? mobile : desktop;

        return new Response(data.htmlText, { headers: data.headers });
      }

      default: {
        try {
          if (pathname.startsWith("/.git")) throw 1;
          if (pathname.startsWith("/deno")) throw 1;
          if (pathname.startsWith("/README")) throw 1;
          if (pathname === "/index-html.html") throw 1;
          if (pathname.startsWith("/index.ts")) throw 1;

          if (fileCache.has(pathname)) {
            const { file, headers } = fileCache.get(pathname)!;
            return new Response(file, { headers });
          }

          const file = await Deno.readFile("." + pathname);
          const headers: HeadersInit = {
            "Content-Type": contentType(parse(pathname).ext) || contentType(".txt"),
            "ETag": `"${encodeHex(await crypto.subtle.digest("SHA-384", file))}"`,
          };

          fileCache.set(pathname, { file, headers });

          return new Response(file, { headers });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      }
    }
  },
};
