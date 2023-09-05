const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, auth } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();
const jsonParser = express.json();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, isValidId, ctrl.getContactById);

router.post("/", auth, jsonParser, validateBody(schemas.addContact), ctrl.addContact);

router.put(
  "/:contactId",
  auth,
  jsonParser,
  isValidId,
  validateBody(schemas.addContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  auth,
  jsonParser,
  isValidId,
  validateBody(schemas.updateFavoriteContact),
  ctrl.updateStatusContact
);

router.delete("/:contactId", auth, isValidId, ctrl.removeContact);

module.exports = router;
