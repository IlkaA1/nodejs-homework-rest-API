const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.favoriteContact);

module.exports = router;
