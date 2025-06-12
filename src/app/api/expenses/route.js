import { NextResponse } from 'next/server';
import { getExpenses, updateExpense } from '@/lib/expenses';

export async function GET(_request) {
  try {
    const expenses = await getExpenses();
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const updatedExpense = await updateExpense(id, data);
    return NextResponse.json(updatedExpense);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
