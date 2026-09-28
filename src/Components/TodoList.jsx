import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleAddList = (todoIndex) => {
    const listInput = listInputs[todoIndex];

    if (listInput && listInput.trim() !== '') {
      const updatedTodos = [...todos];

      updatedTodos[todoIndex].lists.push(listInput);

      setTodos(updatedTodos);

      setListInputs({
        ...listInputs,
        [todoIndex]: ''
      });
    }
  };

  const handleListInputChange = (todoIndex, value) => {
    setListInputs({
      ...listInputs,
      [todoIndex]: value
    });
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>

        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
          />

          <button
            className="add-list-button"
            onClick={handleAddTodo}
          >
            Add Heading
          </button>
        </div>
      </div>

      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <h2>{todo.heading}</h2>

            <input
              type="text"
              placeholder="Enter list item"
              value={listInputs[index] || ''}
              onChange={(e) =>
                handleListInputChange(index, e.target.value)
              }
            />

            <button
              className="add-list-button"
              onClick={() => handleAddList(index)}
            >
              Add List
            </button>

            <button className="delete-button">
              Delete
            </button>

            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex}>{list}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;