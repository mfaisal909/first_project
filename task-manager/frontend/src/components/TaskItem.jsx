import { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const save = async () => {
    if (!title.trim()) return;
    await onUpdate(task._id, { title: title.trim(), description: description.trim() });
    setEditing(false);
  };

  const cancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />
      {editing ? (
        <div className="edit-fields">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      ) : (
        <div className="task-content">
          <span className="task-title">{task.title}</span>
          {task.description && <span className="task-desc">{task.description}</span>}
          <div className="task-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
