import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import Metas from "../components/Metas.tsx";
import Navbar from "../components/Navbar.tsx";
import { Links } from "../components/Links.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <Head>
        <Metas
          title="Jose Fabio CV"
          description="El CV de Jose Fabio"
          image="https://i.postimg.cc/nzvRy9G7/Mon-Oct-23-10-29-00-PM-CST-2023.png"
        />
        <Links />
      </Head>
      <body class="min-h-screen flex flex-col">
        <Navbar />

        <div class="px-4 pt-4 mx-auto w-full max-w-screen-lg flex-1">
          <Component />
        </div>

        {/* Bottom bar */}
        <footer class="p-3 mt-2 bg-gray-300 text-gray-600">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </footer>
      </body>
    </html>
  );
}
