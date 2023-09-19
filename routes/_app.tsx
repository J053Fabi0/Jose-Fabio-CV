import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jose Fabio CV</title>
      </head>
      <body>
        <header>
          <nav>
            <h1>Jose Fabio</h1>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About me</a>
              </li>
            </ul>
          </nav>
        </header>
        <Component />
      </body>
    </html>
  );
}
