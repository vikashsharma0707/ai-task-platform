import mongoose from 'mongoose';

const logEntrySchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    inputText: { type: String, required: true },
    operation: {
      type: String,
      required: true,
      enum: ['uppercase', 'lowercase', 'reverse_string', 'word_count'],
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'success', 'failed'],
      default: 'pending',
    },
    result: { type: String, default: null },
    logs: [logEntrySchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

export const Task = mongoose.model('Task', taskSchema);
