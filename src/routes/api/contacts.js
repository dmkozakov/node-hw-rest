const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, auth, validateQuery } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();
const jsonParser = express.json();

router.get("/", auth, validateQuery(schemas.listContactsQuery), ctrl.listContacts);

router.get("/:id", auth, isValidId, ctrl.getContactById);

router.post("/", auth, jsonParser, validateBody(schemas.addContact), ctrl.addContact);

router.put(
  "/:id",
  auth,
  jsonParser,
  isValidId,
  validateBody(schemas.addContact),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  auth,
  jsonParser,
  isValidId,
  validateBody(schemas.updateFavoriteContact),
  ctrl.updateStatusContact
);

router.delete("/:id", auth, isValidId, ctrl.removeContact);

module.exports = router;