import { Head } from "$fresh/runtime.ts";

export default function Portafolio() {
  return (
    <>
      <Head>
        <title>Portafolio Jose Fabio</title>
      </Head>
      <div className="container pl-16 pt-16">
        <h1 className="m-0 mb-8 text-3xl font-normal">
          Some of my latest works
          <br />
          as Full Stack Web
        </h1>

        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-xl font-semibold">Badger</h2>
            <p>
              Product design — 2022 —{"  "}
              <a className="" href="https://getbadger.io/">
                getbadger.io
              </a>
            </p>
          </header>
          <p>
            Badger is a new product from marketgoo to generate and share SEO
            reports for agencies and professional freelances.
          </p>
          <p>It's still in progress. Some early mockups:</p>

          <div className="carousel no-scrollbar flex snap-x gap-4 overflow-x-auto border-x border-gray-900">
            {new Array(10).fill(0).map(() => (
              <figure className="ml-[-1px] min-w-[800px] snap-start">
                <img
                  src="https://oscarotero.com/portfolio/badger/mockup.webp"
                  alt="Mockup 1"
                  className="block w-full border border-gray-900"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
