const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
  dueDate: { type: Date },

  // 🔹 20 additional attributes
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW' },
  tags: [{ type: String }],
  category: { type: String },
  estimatedHours: { type: Number },
  actualHours: { type: Number },
  progress: { type: Number, min: 0, max: 100 },
  attachments: [{ type: String }],
  createdBy: { type: String },
  assignedTo: { type: String },
  reviewer: { type: String },
  team: [{ type: String }],
  completedAt: { type: Date },
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: { type: String, enum: ['DAILY', 'WEEKLY', 'MONTHLY'] },
  dependencies: [{ type: String }],
  subTasks: [{ type: String }],
  comments: [{
    user: String,
    text: String,
    date: { type: Date, default: Date.now }
  }],
  historyLog: [{
    field: String,
    oldValue: String,
    newValue: String,
    updatedBy: String,
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
