import { Contact } from "../../models/index";

import type { Request, Response } from "express"

const listContacts = async (req: Request, res: Response) => {
  const result = await Contact.find();
  res.json(result);
};

export default listContacts;
