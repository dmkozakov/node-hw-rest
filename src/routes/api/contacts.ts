import express from "express";
import ctrl from "../../controllers/contacts";
import { validateBody, isValidId } from "../../middlewares";
import schemas from "../../schemas/contacts";

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addContact), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addContact), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteContact),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

export default router;
