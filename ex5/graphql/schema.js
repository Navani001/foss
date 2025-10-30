const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean
} = require('graphql');

const Task = require('../models/Task');

// Comment Type
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    user: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString }
  }
});

// HistoryLog Type
const HistoryLogType = new GraphQLObjectType({
  name: 'HistoryLog',
  fields: {
    field: { type: GraphQLString },
    oldValue: { type: GraphQLString },
    newValue: { type: GraphQLString },
    updatedBy: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
});

// Task GraphQL Type
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    completedAt: { type: GraphQLString },

    // 🔹 New fields
    priority: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    estimatedHours: { type: GraphQLString },
    actualHours: { type: GraphQLString },
    progress: { type: GraphQLString },
    attachments: { type: new GraphQLList(GraphQLString) },
    createdBy: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    reviewer: { type: GraphQLString },
    team: { type: new GraphQLList(GraphQLString) },
    isRecurring: { type: GraphQLBoolean },
    recurrencePattern: { type: GraphQLString },
    dependencies: { type: new GraphQLList(GraphQLString) },
    subTasks: { type: new GraphQLList(GraphQLString) },
    comments: { type: new GraphQLList(CommentType) },
    historyLog: { type: new GraphQLList(HistoryLogType) }
  })
});

// Input type for creating/updating
const TaskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    priority: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    estimatedHours: { type: GraphQLString },
    actualHours: { type: GraphQLString },
    progress: { type: GraphQLString },
    attachments: { type: new GraphQLList(GraphQLString) },
    createdBy: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    reviewer: { type: GraphQLString },
    team: { type: new GraphQLList(GraphQLString) },
    isRecurring: { type: GraphQLBoolean },
    recurrencePattern: { type: GraphQLString },
    dependencies: { type: new GraphQLList(GraphQLString) },
    subTasks: { type: new GraphQLList(GraphQLString) }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => await Task.findById(id)
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { status: { type: GraphQLString }, search: { type: GraphQLString } },
      resolve: async (_, { status, search }) => {
        const filter = {};
        if (status) filter.status = status;
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        return await Task.find(filter).sort({ createdAt: -1 });
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: {
      type: TaskType,
      args: { input: { type: new GraphQLNonNull(TaskInput) } },
      resolve: async (_, { input }) => {
        const task = new Task({ ...input });
        return await task.save();
      }
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(TaskInput) }
      },
      resolve: async (_, { id, input }) => {
        return await Task.findByIdAndUpdate(id, { $set: { ...input } }, { new: true, runValidators: true });
      }
    },
    patchTaskStatus: {
      type: TaskType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }, status: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { id, status }) => {
        const valid = ['TODO', 'IN_PROGRESS', 'DONE'];
        if (!valid.includes(status)) throw new Error('Invalid status');
        return await Task.findByIdAndUpdate(id, { status }, { new: true });
      }
    },
    deleteTask: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        const res = await Task.findByIdAndDelete(id);
        return !!res;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
