
import { render, screen, fireEvent, test, expect } from '@testing-library/react';
import jest from 'jest-mock';
import Todo from './Todo';

const todo = {
  text: 'Learn Docker',
  done: false,
  _id: '123',
};

const deleteTodo = jest.fn();
const completeTodo = jest.fn();

test('renders todo text and buttons', () => {
  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

  // Verifica que el texto de la tarea esté presente
  expect(screen.getByText('Learn Docker')).toBeInTheDocument();

  // Verifica que el botón "Mark as done" esté presente
  expect(screen.getByText('Mark as done')).toBeInTheDocument();

  // Verifica que el botón "Delete" esté presente
  expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('calls completeTodo when "Mark as done" is clicked', () => {
  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

  // Simula un clic en el botón "Mark as done"
  fireEvent.click(screen.getByText('Mark as done'));

  // Verifica que la función completeTodo haya sido llamada
  expect(completeTodo).toHaveBeenCalledWith(todo);
});

test('calls deleteTodo when "Delete" is clicked', () => {
  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

  // Simula un clic en el botón "Delete"
  fireEvent.click(screen.getByText('Delete'));

  // Verifica que la función deleteTodo haya sido llamada
  expect(deleteTodo).toHaveBeenCalledWith(todo);
});