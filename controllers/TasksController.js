const IssueModel = require('../schemas/Tasks');
const User = require('../schemas/User')
const asyncHandler = require('express-async-handler')

const getAllTickets = asyncHandler(async (req, res) => {
    try {
      const allTickets = await IssueModel.find({});
      res.status(200).json(allTickets)
    } catch(err) {
        res.status(500)
        throw new Error(err.message)
    }
})
const createTask = asyncHandler(async (req, res) => {
    const {project, type, status, name, issueId, description, email, startDate, endDate, reportFrom} = req.body;
    if(!project, !type, !status, !name, !issueId, !description, !email, !startDate, !endDate, !reportFrom) {
      res.status(400).json({message: "All Fields are manditory"})
    }
    try {
        const tasks = new IssueModel({project, type, status, name, issueId, description, email, startDate, endDate, reportFrom});
        await tasks.save();
        res.status(200).json({message: "Task Created Successfully"})
    } catch (err) {
        res.status(500)
        throw new Error(err.message)
    }
})

const deleteTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await IssueModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Task Deleted Successfully", tasks})
  } catch (error) {
    res.status(500)
    throw new Error(err.message)
  }
})

const getTasksByUser = asyncHandler(async (req, res) => {
    const { userEmail } = req.query;
    console.log(userEmail);
  try {
    const user = await User.findOne({ email: userEmail });
     console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = await IssueModel.find({ email: user.email });

    res.status(200).json(tasks);
  } catch (err) {
        res.status(500)
        throw new Error(err.message)
    }
});

module.exports = { createTask, getAllTickets, getTasksByUser, deleteTasks }