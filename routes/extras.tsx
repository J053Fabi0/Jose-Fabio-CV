import Typography from "../components/Typography.tsx";
import TimeTilBirthday from "../islands/TimeTilBirthday.tsx";

export default function Extras() {
  return (
    <>
      <section
        id="vision"
        class="rounded p-3 my-2 mx-3 grid grid-cols-1 gap-3 shadow-lg shadow-gray-400 bg-gray-200"
      >
        <Typography variant="lead">Tiempo para cumpleaños - 15 de septiembre</Typography>
        <TimeTilBirthday />
      </section>
    </>
  );
}
