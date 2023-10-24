import Typography from "../components/Typography.tsx";

interface Experience {
  title: string;
  description: string;
  image: string;
}

const experience: Experience[] = new Array(5).fill({
  title: "Experience",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  image: "https://via.placeholder.com/150",
});

interface Skill {
  title: string;
  image: string;
}

const skills: Skill[] = new Array(5).fill({
  title: "Skill",
  image: "https://via.placeholder.com/150",
});

export default function Home() {
  return (
    <>
      <section
        id="vision"
        class="rounded p-3 my-2 mx-3 flex justify-around items-center shadow-lg shadow-gray-400 bg-gray-200"
      >
        <Typography variant="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
        <img src="https://via.placeholder.com/150" alt="Me" class="hover:animate-ping rounded" />
      </section>

      <section id="experience" class="rounded p-3 mt-5 grid gap-3 grid-cols-1">
        <Typography variant="h2">Experience</Typography>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experience.map((exp) => (
            <article class="rounded shadow-md shadow-gray-300 p-3 flex flex-col items-center bg-gray-100">
              <img src={exp.image} alt={exp.title} class="rounded mb-4" />
              <Typography variant="h4">{exp.title}</Typography>
              <Typography>{exp.description}</Typography>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" class="rounded p-3 mt-5 grid gap-3 grid-cols-1">
        <Typography variant="h2">Skills</Typography>
        <div class="flex gap-3 flex-wrap">
          {skills.map((skill) => (
            <article class="rounded shadow-md shadow-gray-300 p-3 flex flex-col items-center bg-gray-100 w-44">
              <img src={skill.image} alt={skill.title} class="rounded mb-4" />
              <Typography variant="h4">{skill.title}</Typography>
            </article>
          ))}
        </div>
      </section>

      <div class="mb-4" />
    </>
  );
}
