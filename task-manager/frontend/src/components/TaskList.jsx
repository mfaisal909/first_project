import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  if (!tasks.length) return <p className="empty">No tasks yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TaskList;
