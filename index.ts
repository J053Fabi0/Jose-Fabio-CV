import { crypto } from "@std/crypto";
import { Poppler } from "node-poppler";
import { encodeHex } from "@std/encoding/hex";

async function getResponse(zoom: number): Promise<{ htmlText: string; headers: Record<string, string> }> {
  try {
    await Deno.remove("./index-html.html");
  } catch {
    // file was non-existent
  }

  const poppler = new Poppler();

  await poppler.pdfToHtml("jose-fabio-arguello-loya-resume.pdf", "index", {
    zoom,
    dataUrls: true,
    singlePage: true,
    fontFullName: false,
    imageFormat: "JPG",
    complexOutput: true,
  });

  let htmlText = await Deno.readTextFile("./index-html.html");

  // Use sans-serif font
  htmlText = htmlText.replaceAll(/(?<=font-family:)[a-z+-]+(?=;)/gim, "sans-serif");

  // Use target blank for all links
  htmlText = htmlText.replaceAll(/(?<=<a) (?=href=")/gm, ' target="_blank" ');

  // Center the pdf div and set the background color to white
  htmlText = htmlText.replaceAll(
    /(?<=<body) bgcolor="#[0-9A-Z]{6}" (?=vlink=")/gm,
    ' style="display: flex; justify-content: center; margin: 0;" bgcolor="white" '
  );

  // Change the title
  htmlText = htmlText.replace("<title>index-html.html</title>", "<title>Jose Fabio Argüello Loya</title>");

  const headers: Record<string, string> = {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Content-Length": htmlText.length.toString(),
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "ETag": `"${encodeHex(await crypto.subtle.digest("SHA-384", new TextEncoder().encode(htmlText)))}"`,
  };

  const { mtime } = await Deno.stat("./jose-fabio-arguello-loya-resume.pdf");
  if (mtime) headers["Last-Modified"] = mtime.toUTCString();

  return { htmlText, headers };
}

const mobile = await getResponse(1);
const desktop = await getResponse(1.5);

export default {
  async fetch(a: Request) {
    const { pathname } = new URL(a.url);

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

          const file = await Deno.readFile("." + pathname);
          return new Response(file);
        } catch {
          return new Response("Not found", { status: 404 });
        }
      }
    }
  },
};
