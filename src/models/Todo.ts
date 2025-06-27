import mongoose from 'mongoose';
import { Priority } from '@/types/todo';

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
todoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes
todoSchema.index({ userId: 1, createdAt: -1 });
todoSchema.index({ userId: 1, completed: 1 });
todoSchema.index({ userId: 1, dueDate: 1 });

export interface TodoDocument extends mongoose.Document {
  userId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const Todo = mongoose.models.Todo || mongoose.model<TodoDocument>('Todo', todoSchema); 