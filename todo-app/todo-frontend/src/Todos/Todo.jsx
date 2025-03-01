
import PropTypes from 'prop-types';

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
      <span>{todo.text}</span>
      <div>
        {todo.done ? (
          <span>Done</span>
        ) : (
          <button onClick={() => completeTodo(todo)}>Mark as done</button>
        )}
        <button onClick={() => deleteTodo(todo)}>Delete</button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default Todo;