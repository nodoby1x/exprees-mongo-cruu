const express = require("express");
const router = express.Router();
const controller = require("../controller/employee");

router.get("/", controller.findAll);
router.get("/all/:id", controller.findAllOf);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.put("/deactivate/:id", controller.deactivate);

module.exports = router;
