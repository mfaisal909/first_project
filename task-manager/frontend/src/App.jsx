import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import * as api from './services/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.getTasks();
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (data) => {
    const res = await api.createTask(data);
    setTasks((prev) => [res.data, ...prev]);
  };

  const handleToggle = async (id) => {
    const res = await api.toggleTask(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleUpdate = async (id, data) => {
    const res = await api.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="count">Total tasks: {tasks.length}</p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h2>Pending ({pending.length})</h2>
            <TaskList tasks={pending} onToggle={handleToggle} onDelete={handleDelete} onUpdate={handleUpdate} />
          </section>
          <section>
            <h2>Completed ({completed.length})</h2>
            <TaskList tasks={completed} onToggle={handleToggle} onDelete={handleDelete} onUpdate={handleUpdate} />
          </section>
        </>
      )}
    </div>
  );
};

export default App;
