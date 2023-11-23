import { kvdex, indexableCollection } from "kvdex";
import ContactModel from "./models/Contact.ts";

const kv = await Deno.openKv();

const db = kvdex(kv, {
  contacts: indexableCollection(ContactModel, {
    indices: {},
  }),
});

export default db;
