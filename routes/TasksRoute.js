const express = require('express')
const router = express.Router();
const { createTask, getAllTickets, getTasksByUser, deleteTasks } = require('../controllers/TasksController');
router.route('/create')
    .post(createTask);
router.route('/list')
    .get(getAllTickets);
router.route('/').get(getTasksByUser);
// router.route('/:id').put(updateTasks)
router.route('/:id').delete(deleteTasks)
module.exports = router