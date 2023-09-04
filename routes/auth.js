const express = require("express");
const ctrl = require("../controllers/auth");
const { validateBody } = require("../middlewares");
const schemas = require("../schemas/users");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(schemas.register), ctrl.register);
router.post("/login", jsonParser, validateBody(schemas.login), ctrl.login);

module.exports = router;
