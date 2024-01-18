import { Contact } from "../../models/index";
import { HttpError } from "../../helpers";

import type { Request, Response } from "express"

const removeContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError.setHttpError(400, "Not found");
  }

  res.json(result);
};

export default  removeContact;
