import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Todo } from '@/models/Todo';
import { authenticateUser } from '@/middleware/auth';
import mongoose from 'mongoose';

interface TodoWithId {
  _id: mongoose.Types.ObjectId;
  userId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// GET /api/todos
export async function GET(request: NextRequest) {
  try {
    const userId = await authenticateUser(request);
    if (userId instanceof NextResponse) return userId;

    await connectDB();

    const todos = await Todo.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean() as TodoWithId[];

    // Map _id to id for frontend compatibility
    const mappedTodos = todos.map(todo => ({
      ...todo,
      id: todo._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(mappedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos
export async function POST(request: NextRequest) {
  try {
    const userId = await authenticateUser(request);
    if (userId instanceof NextResponse) return userId;

    const body = await request.json();
    const { title, description, priority, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const todo = await Todo.create({
      userId,
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
    });

    const todoDoc = todo.toObject() as TodoWithId;

    // Map _id to id for frontend compatibility
    const mappedTodo = {
      ...todoDoc,
      id: todoDoc._id.toString(),
      _id: undefined
    };

    return NextResponse.json(mappedTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
} 