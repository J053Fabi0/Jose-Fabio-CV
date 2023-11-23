import { z } from "zod";

export type Contact = z.infer<typeof ContactModel>;

const ContactModel = z.object({
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  comment: z.string(),
  createdAt: z.date(),
});

export default ContactModel;
