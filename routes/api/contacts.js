const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", jsonParser, validateBody(schemas.addContact), ctrl.addContact);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  validateBody(schemas.addContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  isValidId,
  validateBody(schemas.updateFavoriteContact),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
