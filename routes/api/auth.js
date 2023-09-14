const express = require("express");
const authCtrl = require("../../controllers/auth");
const { validateBody, auth, isValidId, upload } = require("../../middlewares");
const schemas = require("../../schemas/users");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(schemas.register), authCtrl.register);

router.get("/verify/:token", authCtrl.verify);

router.post("/verify", jsonParser, authCtrl.resendVerify);

router.post("/login", jsonParser, validateBody(schemas.login), authCtrl.login);

router.get("/current", auth, authCtrl.getCurrent);

router.post("/logout", auth, authCtrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), authCtrl.updateAvatar);

router.patch(
  "/:id/subscription",
  auth,
  isValidId,
  jsonParser,
  validateBody(schemas.updateSubscription),
  authCtrl.updateSubscription
);

module.exports = router;
