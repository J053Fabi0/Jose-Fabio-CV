import { Head } from "$fresh/runtime.ts";

interface Project {
  title: string;
  from: string;
  to: string;
  description: string;
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

        <div className="flex flex-col gap-4">
          {projets.map((p) => (
            <>
              <header>
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p>
                  {p.from} — {p.to}
                </p>
              </header>
              <p>{p.description}</p>

              <div className="carousel no-scrollbar flex snap-x gap-4 overflow-x-auto border-x border-gray-900">
                {p.images.map((url) => (
                  <figure className="ml-[-1px] min-w-[min(100%,800px)] snap-start">
                    <img
                      src={url}
                      className="block h-full w-full border border-gray-900 object-cover"
                    />
                  </figure>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
