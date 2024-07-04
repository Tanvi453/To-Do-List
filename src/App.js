import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState(""); // Separate state for new task input
  const [list, setList] = useState(JSON.parse(localStorage.getItem("todo")) || []);
  const [isEdit, setIsEdit] = useState(-1);
  const [editTask, setEditTask] = useState({ newtask: "" }); // Separate state for edit task input

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(list));
  }, [list]);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleEditTaskChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newTask.trim() === "") {
      return;
    }

    setList([...list, { newtask: newTask }]);
    setNewTask("");
  };

  const handleSave = () => {
    if (editTask.newtask.trim() === "") {
      return;
    }

    const editData = list.map((item, index) => (isEdit === index ? editTask : item));
    setList(editData);
    setIsEdit(-1);
    setEditTask({ newtask: "" });
  };

  const handleDelete = (idx) => {
    const deleteData = list.filter((_, index) => index !== idx);
    setList(deleteData);
  };

  const handleEdit = (idx) => {
    setIsEdit(idx);
    const editData = list.find((_, index) => index === idx);
    setEditTask(editData);
  };

  const handleCancel = () => {
    setIsEdit(-1);
    setEditTask({ newtask: "" });
  };

  return (
    <>
      <div className='header'>
        <h1>ToDo List</h1>
      </div>

      <div className='content'>
        <input
          type='text'
          id='newtask'
          name='newtask'
          value={newTask}
          placeholder='New Task'
          onChange={handleNewTaskChange}
        />
        <button type='button' onClick={handleSubmit} className='button'>
          Create
        </button>
      </div>

      <div>
        <table>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  {isEdit === index ? (
                    <input
                      type='text'
                      id='newtask'
                      name='newtask'
                      value={editTask.newtask}
                      placeholder='Edit Task'
                      onChange={handleEditTaskChange}
                    />
                  ) : (
                    item.newtask
                  )}
                </td>
                <td>
                  {isEdit === index ? (
                    <div className='task'>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <div className='task'>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
