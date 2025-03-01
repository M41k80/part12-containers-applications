import { useEffect, useState } from 'react';
import axios from '../util/apiClient';

import List from './List';
import Form from './Form';

const TodoView = () => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const { data } = await axios.get('/todos');
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error('Expected an array but got:', data);
        setTodos([]); // Asigna un array vacío en caso de error
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]); // Asigna un array vacío en caso de error
    }
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo) => {
    try {
      const { data } = await axios.post('/todos', todo);
      if (data && typeof data === 'object') {
        setTodos([...todos, data]);
      } else {
        console.error('Invalid todo data:', data);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`/todos/${todo._id}`);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async (todo) => {
    try {
      await axios.put(`/todos/${todo._id}`, {
        text: todo.text,
        done: true,
      });
      refreshTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  );
};

export default TodoView;