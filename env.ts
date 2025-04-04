import "@std/dotenv/load";
import { number, safeEnv } from "@safe-env/safe-env";

const { PORT } = safeEnv({
  PORT: number({ defaultValue: 5055 }),
});

export { PORT };
