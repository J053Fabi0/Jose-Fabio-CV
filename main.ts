/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="dom.iterable" />
/// <reference no-default-lib="true" />
/// <reference lib="dom.asynciterable" />

import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { start } from "$fresh/server.ts";

await start(manifest, config);
