const { Router } = require("express");
const TasksController = require("./controllers/TasksController");

const router = Router();

router.get("/tasks", TasksController.get);
router.get("/tasks/pdf", TasksController.getPDF);
router.post("/tasks/create", TasksController.create);
router.get("/tasks/:id", TasksController.get);
router.put("/tasks/update/:id", TasksController.update);
router.delete("/tasks/delete/:id", TasksController.delete);

module.exports = router;