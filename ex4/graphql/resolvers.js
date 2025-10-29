const Task = require("../models/Task");

module.exports = {
  Query: {
    tasks: async () => Task.find().sort({ createdAt: -1 }),
    task: async (args) => Task.findById(args.id),
  },
  Mutation: {
    createTask: async (args) => {
      console.log("Received args:", args);
      console.log("Input:", args.input);
      if (!args.input) {
        throw new Error("Input is required");
      }
      const task = new Task({
        title: args.input.title,
        description: args.input.description || "",
        priority: args.input.priority || "MEDIUM",
      });
      return await task.save();
    },
    updateTask: async (args) => {
      const updated = await Task.findByIdAndUpdate(args.id, args.input, { new: true, runValidators: true });
      if (!updated) throw new Error("Task not found");
      return updated;
    },
    deleteTask: async (args) => !!(await Task.findByIdAndDelete(args.id)),
  },
};
