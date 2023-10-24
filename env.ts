import { loadSync } from "std/dotenv/mod.ts";

const env = loadSync({ examplePath: "./.example.env" });

/** With https and without traising slash */
export const WEBSITE_URL = env.WEBSITE_URL;
