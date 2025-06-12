import { promises as fs } from 'fs';
import path from 'path';

const expensesFilePath = path.join(process.cwd(), 'data', 'expenses.json');

// Initialize expenses file if it doesn't exist
try {
  fs.access(expensesFilePath);
} catch (_error) {
  fs.writeFile(expensesFilePath, JSON.stringify([], null, 2));
}

export async function getExpenses() {
  try {
    const data = await fs.readFile(expensesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (_error) {
    throw new Error('Failed to read expenses data');
  }
}

export async function updateExpense(id, data) {
  try {
    const expenses = await getExpenses();
    const expenseIndex = expenses.findIndex(exp => exp.id === id);
    
    if (expenseIndex === -1) {
      throw new Error('Expense not found');
    }

    const updatedExpense = {
      ...expenses[expenseIndex],
      ...data,
      id: id,
      totalExpense: data.expenseItems.reduce((sum, item) => sum + item.amount, 0),
      remainingAmount: data.initialBalance - data.expenseItems.reduce((sum, item) => sum + item.amount, 0)
    };

    expenses[expenseIndex] = updatedExpense;
    await fs.writeFile(expensesFilePath, JSON.stringify(expenses, null, 2));
    
    return updatedExpense;
  } catch (_error) {
    throw new Error('Failed to update expense');
  }
}
