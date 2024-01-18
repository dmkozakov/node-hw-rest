import { Contact } from "../../models/index";

import type { Request, Response } from "express"

const addContact = async (req: Request, res: Response) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

export default  addContact;
