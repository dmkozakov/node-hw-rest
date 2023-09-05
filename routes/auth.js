const express = require("express");
const ctrl = require("../controllers/auth");
const { validateBody, auth } = require("../middlewares");
const schemas = require("../schemas/users");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(schemas.register), ctrl.register);

router.post("/login", jsonParser, validateBody(schemas.login), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

router.patch(
  "/:userId/subscription",
  auth,
  jsonParser,
  validateBody(schemas.updateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
