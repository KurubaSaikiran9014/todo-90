// FIX1: The import statement for Component class should be written like this
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'

import TodoItem from '../TodoItem'

import './index.css'

// const initialTodosList = [
//   {
//     id: 1,
//     title: 'Book the ticket for today evening',
//     status: 'Done',
//   },
//   {
//     id: 2,
//     title: 'Rent the movie for tomorrow movie night',
//     status: 'Completed',
//   },
//   {
//     id: 3,
//     title: 'Confirm the slot for the yoga session tomorrow morning',
//     status: 'In Progress',
//   },
//   {
//     id: 4,
//     title: 'Drop the parcel at Bloomingdale',
//     status: 'Done',
//   },
//   {
//     id: 5,
//     title: 'Order fruits on Big Basket',
//     status: 'In Progress',
//   },
//   {
//     id: 6,
//     title: 'Fix the production issue',
//     status: 'Pending',
//   },
//   {
//     id: 7,
//     title: 'Confirm my slot for Saturday Night',
//     status: 'Done',
//   },
//   {
//     id: 8,
//     title: 'Get essentials for Sunday car wash',
//     status: 'Completed',
//   },
// ]

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('todoData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class SimpleTodos extends Component {
  // FIX2: The syntax to assign value to the state should be as mentioned below
  state = {
    todosList: getCartListFromLocalStorage(),
    todoName: '',
    todoStatus: 'Pending',
  }

  // FIX3: Here, the class method doesn't need keyword "const" for declaration
  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  changeTodoStatus = (id, statusTodo) => {
    const {todosList} = this.state
    const updatedTodosList = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {...eachTodo, status: statusTodo}
      }
      return {...eachTodo}
    })

    this.setState({
      todosList: updatedTodosList,
    })
  }

  onChangeInput = event => this.setState({todoName: event.target.value})

  onChangeStatus = event => this.setState({todoStatus: event.target.value})

  addTodo = () => {
    const {todoName, todoStatus} = this.state
    const newTodo = {
      id: uuidv4(),
      title: todoName,
      status: todoStatus,
    }
    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
      todoName: '',
      todoStatus: 'Pending',
    }))
  }

  saveTodo = () => {
    const {todosList} = this.state
    localStorage.setItem('todoData', JSON.stringify(todosList))
  }

  render() {
    const {todosList, todoName, todoStatus} = this.state

    localStorage.setItem('todoData', JSON.stringify(todosList))

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <Header />
          <h1 className="heading">Simple Todos</h1>
          <div className="cont">
            <input type="text" onChange={this.onChangeInput} value={todoName} />
            <select value={todoStatus} onChange={this.onChangeStatus}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Done">Done</option>
              <option value="In progress">In Progress</option>
            </select>
            <button type="button" onClick={this.addTodo}>
              Add Todo
            </button>
            <button type="button" onClick={this.saveTodo}>
              Save Todos
            </button>
          </div>
          <ul className="todos-list">
            {/* FIX4: map() is an array method and should be used only on arrays */}
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                changeStatus={this.changeTodoStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
