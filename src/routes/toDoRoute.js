const express = require('express');
const router = express.Router();
//Controller
const {ToDoCreate, readToDoList, ToDoUpdate,ToDoStatusUpdate, removeToDo, ToDoFilterByStatus, ToDoFilterByDate} = require('../controllers/ToDoListController');
//Middleware
const {authVerify} = require('../middlewares/authVerifyMiddleware');

router.post("/toDoCreate", authVerify, ToDoCreate);
router.get("/readToDoList", authVerify, readToDoList);
router.post("/ToDoUpdate", authVerify, ToDoUpdate);
router.post("/ToDoStatusUpdate", authVerify, ToDoStatusUpdate);
router.post("/removeToDo", authVerify, removeToDo);
router.post("/ToDoFilterByStatus", authVerify, ToDoFilterByStatus);
router.post("/ToDoFilterByDate", authVerify, ToDoFilterByDate);




module.exports = router;