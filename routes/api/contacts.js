const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

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

module.exports = router;
