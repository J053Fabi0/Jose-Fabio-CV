import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime/src/index.d.ts";

interface Project {
  title: string;
  from: string;
  to: string;
  link?: string;
  description: string | JSX.Element;
  images: string[];
}

const projets: Project[] = [
  {
    title: "Mining Nodes Service",
    from: "07/2023",
    to: "05/2024",
    description:
      "Service for crypto enthusiasts. Automated the creation of mining nodes in the Incognito blockchain.",
    images: [
      "./portafolio/mining-nodes-1.png",
      "./portafolio/mining-nodes-2.png",
    ],
  },
  {
    title: "Tiendita",
    from: "01/2022",
    to: "01/2023",
    link: "https://tiendita-demo.josefabio.com",
    description: (
      <>
        Manage retail sales and products' stocks of a business store.
        <br />
        The{" "}
        <a href="https://tiendita-demo.josefabio.com" target="blank">
          live demo
        </a>{" "}
        works with any user and password.
      </>
    ),
    images: [
      "./portafolio/tiendita-1.png",
      "./portafolio/tiendita-2.png",
      "./portafolio/tiendita-3.png",
    ],
  },
];

export default function Portafolio() {
  return (
    <>
      <Head>
        <title>Portafolio Jose Fabio</title>
      </Head>
      <div className="container px-6 pt-16 md:pl-16">
        <h1 className="m-0 mb-8 text-3xl font-normal">
          Some of my latest works
          <br />
          as Full Stack Web
        </h1>
      </div>

      <div className="mb-16 flex flex-col gap-16">
        {projets.map((p) => (
          <div>
            <div className="container px-6 md:pl-16">
              <div className="flex max-w-[600px] flex-col gap-4 font-sans">
                <header>
                  <h2 className="text-xl font-semibold">{p.title}</h2>
                  <p>
                    {p.from} — {p.to}
                    {p.link ? (
                      <>
                        {" "}
                        —{" "}
                        <a href={p.link} target="blank">
                          {p.link}
                        </a>
                      </>
                    ) : null}
                  </p>
                </header>
                <p>{p.description}</p>
              </div>
            </div>
            <div className="no-scrollbar mt-4 flex snap-x gap-4 overflow-x-auto pl-4">
              {p.images.map((url) => (
                <figure className="ml-[-1px] min-w-[min(100%,800px)] snap-center last:mr-16">
                  <img
                    src={url}
                    className="block h-full w-full border border-gray-900 object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
