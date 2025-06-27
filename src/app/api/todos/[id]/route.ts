import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Todo, TodoDocument } from '@/models/Todo';
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

// GET /api/todos/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const userId = await authenticateUser(request);
    if (userId instanceof NextResponse) return userId;

    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const todo = await Todo.findOne({ _id: id, userId }).lean() as TodoWithId;
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    // Map _id to id for frontend compatibility
    const mappedTodo = {
      ...todo,
      id: todo._id.toString(),
      _id: undefined
    };

    return NextResponse.json(mappedTodo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const userId = await authenticateUser(request);
    if (userId instanceof NextResponse) return userId;

    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, priority, dueDate, completed } = body;

    await connectDB();

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(completed !== undefined && { completed }),
        updatedAt: new Date(),
      },
      { new: true, lean: true }
    ) as TodoWithId;

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Failed to update todo' },
        { status: 500 }
      );
    }

    // Map _id to id for frontend compatibility
    const mappedTodo = {
      ...updatedTodo,
      id: updatedTodo._id.toString(),
      _id: undefined
    };

    return NextResponse.json(mappedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const userId = await authenticateUser(request);
    if (userId instanceof NextResponse) return userId;

    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
} 