import db from "../data/database.ts";
import { TiDelete } from "react-icons/ti";
import { Handlers } from "$fresh/server.ts";
import Input from "../components/Input.tsx";
import redirect from "../utils/redirect.ts";
import Button from "../components/Button.tsx";
import LocaleDate from "../islands/LocaleDate.tsx";
import { Contact } from "../data/models/Contact.ts";
import Typography from "../components/Typography.tsx";

interface CommentsProps {
  contacts: Contact[];
}

interface FormInput {
  id: keyof Contact;
  name: string;
  class?: string;
  autocomplete?: string;
  required?: boolean;
}

const formInputs: FormInput[] = [
  { id: "name", name: "Nombre", autocomplete: "name", required: true },
  { id: "email", name: "Correo", autocomplete: "email" },
  { id: "phone", name: "Teléfono", autocomplete: "tel", class: "col-span-1 sm:col-span-2 lg:col-span-1" },
  {
    id: "comment",
    required: true,
    name: "Mensaje",
    autocomplete: "off",
    class: "col-span-1 sm:col-span-2 lg:col-span-3",
  },
];

export const handler: Handlers<CommentsProps> = {
  async POST(req) {
    const newContact = Object.fromEntries((await req.formData()).entries()) as Contact | { delete: string };

    if ("delete" in newContact) {
      await db.contacts.delete(newContact.delete);
    } else {
      newContact.createdAt = new Date();
      await db.contacts.add(newContact);
    }

    return redirect("/comments");
  },
};

export default async function Comments() {
  const { result: contacts } = await db.contacts.getMany();

  return (
    <>
      <form method="POST" class="mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formInputs.map(({ id, name, ...props }) => (
            <Input {...props} name={name} id={id} />
          ))}
        </div>

        <div class="flex justify-center w-full mt-10">
          <Button color="green" type="submit">
            Publicar
          </Button>
        </div>
      </form>

      <section class="mt-10">
        <Typography class="text-center" variant="h3">
          Comentarios
        </Typography>

        <form method="post" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {contacts.map((contact) => (
            <article class="relative rounded shadow-md shadow-gray-300 p-3 flex flex-col items-center bg-gray-100">
              <button type="submit" name="delete" value={contact.id.toString()}>
                <TiDelete size={30} class="text-red-400 absolute top-0 right-0 cursor-pointer" />
              </button>
              <Typography variant="h4">{contact.value.name}</Typography>
              <Typography>{contact.value.comment}</Typography>
              <Typography variant="smallP" class="w-full mt-3">
                <LocaleDate date={contact.value.createdAt.valueOf()} />
              </Typography>
            </article>
          ))}
        </form>
      </section>
    </>
  );
}
