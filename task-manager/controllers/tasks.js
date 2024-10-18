const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks,amount:tasks.length })
  // res.status(200).json({ status: 'success',  data: { tasks ,results: tasks.length} })
});
const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  // res.status(201).json({ task });
  res.status(201).json({task})
});
// const getTasks = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

//When we use the middleware asyncWrapper, we don't need to use the try catch block why we use asyncWrapper
//  because it will automatically catch the error and send the response to the client automatically.
const getTasks = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error=new Error('Not Found')
    // error.status=404
    // return next(error)
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task });
});

// const deleteTasks = asyncWrapper(async (req, res,next) => {
//   const { id: taskID } = req.params;
//   const task = await Task.findOneAndDelete({ _id: taskID });
//   if (!task) {
//     return next(createCustomError(`No task with id : ${taskID}`, 404))
//     // return res.status(404).json({ msg: `No task with id : ${taskID}` });

//     // return next(createCustomError(`No task with id : ${taskID}`, 404))
//   }
//   res.status(200).send("Task is deleted successfully")
//   // res.start(200).json({
//   //   task: null,
//   //   status: "success",
//   //   msg: "Task is deleted successfully",
//   // });
// });
const deleteTasks = asyncWrapper(async (req, res, next) => {
  console.log(req.params)
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({
    task: null,
    status: "success",
    msg: "Task is deleted successfully",
  });
})
const updateTasks = asyncWrapper(async (req, res,next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task });
});
module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
