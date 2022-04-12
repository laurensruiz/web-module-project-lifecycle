import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos:[],
    error:'',
    todoInput: '',
  }

  onChange = e =>{
    const {value} = e.target // has to be word value
    this.setState({ ...this.state, todoInput: value})
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then( res => {
      //initially put debugger to check response in sources
      this.setState({ ...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message})
    })
  }
  componentDidMount(){
    //fetch the todos from the server
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todoList">
        <h1> Todo List</h1>
        {
          this.state.todos.map(todo => {
            return <div key= {todo.id}>{todo.name}</div>
          })
        }
      </div>
      <form id= "todoForm">
        <input value ={this.state.todoInput} onChange={this.onChange} type="text" placeholder='Type your new todo'></input>
        <input type='submit'></input>
        <button>Clear Completed Tasks</button>
      </form>
      </div>
    )
  }
}
