import { Document, Message } from "@prisma/client";

export type ExtendedDocument = Document & {
  messages: Message[];
};
