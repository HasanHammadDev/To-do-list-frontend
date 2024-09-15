import React, { useEffect, useState } from 'react';
import { getTodoList, toggleTaskCompletion, removeTodo, reorderTodos } from "../../Utility/api";
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import SortByPriority from './SortByPriority';
import Header from '../Header/Header';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [username, setUsername] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await getTodoList(sortOrder);
        setTodoList(response.todos);
        setUsername(response.username);
      } catch (error) {
        console.error('An error occurred while trying to fetch the todo list:', error);
      }
    };

    getTodos();
  }, [sortOrder]);
  

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleReorder = async (todoId, moveUp) => {
    try {
      const response = await reorderTodos(todoId, moveUp);

      if (response.success) {
        setTodoList(response.todos);
      }
    } catch (error) {
      console.error('There was an error reordering the todos', error);
    }
  };

  const handleToggleCompletion = async (id, currentCompletionState) => {
    try {
      await toggleTaskCompletion({ id, completed: currentCompletionState });
      
      setTodoList(prevTodos =>
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, is_completed: !currentCompletionState } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleTodoCreated = (newTodo) => {
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleTodoDeletion = async (todoId) => {
    try {
      const response = await removeTodo(todoId);
  
      if (response.success) {
        const updatedTodos = response.todos;
  
        setTodoList(prevTodos => {
          const filteredTodos = prevTodos.filter(todo => todo.id !== todoId);
  
          return filteredTodos.map(todo => {
            const updatedTodo = updatedTodos.find(updated => updated.id === todo.id);
            return updatedTodo ? { ...todo, order: updatedTodo.order } : todo;
          });
        });
      } else {
        console.error('Error removing todo:', response.message);
      }
    } catch (error) {
      console.error('Error while removing todo:', error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg">
      <Header username={username} />
      <div className="mb-4">
        <CreateTodo onTodoCreated={handleTodoCreated} />
      </div>
      <SortByPriority onSortChange={handleSortChange} />
      <div className="max-w-2xl mx-auto m-1">
        <p className="text-gray-600 text-sm">{todoList.length} tasks remaining</p>
      </div>
      <div className="bg-white rounded-lg divide-y divide-gray-200">
        {todoList.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No todos yet. Add some tasks to get started!</p>
        ) : (
          todoList.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              task={todo.task}
              dueDate={todo.due_date}
              isCompleted={todo.is_completed}
              createdAt={todo.created_at}
              priority={todo.priority}
              onToggleCompletion={handleToggleCompletion}
              handleTodoDeletion={handleTodoDeletion}
              handleReorder={handleReorder}
              sortOrder={sortOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;