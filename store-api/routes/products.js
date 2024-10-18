const express = require("express");
const router = express.Router();
// const {getAllTasks,createTasks,getTasks,updateTasks,deleteTasks}=require("../controllers/tasks")
const {getAllProducts,getAllProductsStatic}=require("../controllers/products")
router.route("/").get(getAllProducts)
router.route("/static").get(getAllProductsStatic)
// router.route("/:id").get(getTasks).patch(updateTasks).delete(deleteTasks)

module.exports = router
