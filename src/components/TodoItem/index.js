import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, changeStatus} = props
  const {id, title, status} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const changeToNewStatus = event => {
    const statusTodo = event.target.value
    changeStatus(id, statusTodo)
  }

  return (
    // FIX6: The HTML elements should be wrapped inside a single element when returning
    <li className="todo-item">
      <p className="title">{title}</p>
      <select value={status} onChange={changeToNewStatus}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Done">Done</option>
        <option value="In progress">In Progress</option>
      </select>
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
