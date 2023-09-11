const express = require("express");
const ctrl = require("../../controllers/contacts/index");
const { authenticate } = require("../../middlewares/index");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put("/:contactId", authenticate, ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, ctrl.favoriteContact);

module.exports = router;
