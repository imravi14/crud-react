import React, { useReducer } from 'react';
import AddTask from './Addtask.jsx';
import TaskList from './Tasklist.jsx';
import './App.css';

const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

let nextId = initialTasks.length;

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: nextId++, text: action.text, done: false }];
    case 'changed':
      return tasks.map(task =>
        task.id === action.task.id ? action.task : task
      );
    case 'deleted':
      return tasks.filter(task => task.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const handleAddTask = text => dispatch({ type: 'added', text });
  const handleChangeTask = task => dispatch({ type: 'changed', task });
  const handleDeleteTask = taskId => dispatch({ type: 'deleted', id: taskId });

  return (
    <div className="task-app">
      <h1>Prague Itinerary</h1>
      <div className="add">
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
