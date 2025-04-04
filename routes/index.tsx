import { Handlers } from "$fresh/server.ts";
import getResumeHtml from "../utils/getResumeHtml.ts";

const mobile = await getResumeHtml(1.5);
const desktop = await getResumeHtml(1.6);

export const handler: Handlers = {
  GET(req) {
    const userAgent = req.headers.get("User-Agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

    const data = isMobile ? mobile : desktop;

    return new Response(data.htmlText, { headers: data.headers });
  },
};
