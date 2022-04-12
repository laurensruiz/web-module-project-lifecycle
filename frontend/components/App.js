import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos:[],
    error:'',
    todoInput: '',
    displayCompleted: true,
  }

  onChange = e =>{
    const {value} = e.target // has to be word value
    this.setState({ ...this.state, todoInput: value})
  }
//cleanup helpers//
  resetForm = () => {
    this.setState({ ...this.state, todoInput:''})
  }

  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message})
  }
//cleanup helpers
  postOnSubmit = () =>{
    axios.post(URL, {name: this.state.todoInput})
    .then(res => {
      //debugger
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)}) //check debugger
      //this.fetchAllTodos() // avoid multiple requests
      this.resetForm() // a lot cleaner to do this
    })
    .catch(this.setAxiosResponseError)
  }

  onSubmit = e => {
    e.preventDefault();
    this.postOnSubmit()
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then( res => {
      //initially put debugger to check response in sources
      this.setState({ ...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
    
  }

  toggleCompleted = id => e => {
    axios.patch(`${URL}/${id}`)
    .then(res =>{
      //this.fetchAllTodos() multiple requests but lazy
      this.setState({ 
        ...this.state, todos: this.state.todos.map( todo => {
          if(todo.id !== id)
          return todo
          return res.data.data
      })})
    })
    .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompletedness = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
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
          this.state.todos.reduce((acc, todo) => {
            if(this.state.displayCompleted || !todo.completed)
            return acc.concat(<div onClick={this.toggleCompleted(todo.id)}key= {todo.id}>{todo.name}{todo.completed? '✔️' : ''}</div>)
            return acc
          }, [])
            //return <div onClick={this.toggleCompleted(todo.id)}key= {todo.id}>{todo.name}{todo.completed? '✔️' : ''}</div>
          
        }
      </div>
      <form id= "todoForm" onSubmit={this.onSubmit}>
        <input value ={this.state.todoInput} onChange={this.onChange} type="text" placeholder='Type your new todo'></input>
        <input type='submit'></input>
      </form>
      <button onClick={this.toggleDisplayCompletedness}>{this.state.displayCompleted? 'Hide' : 'Show'} Completed Tasks</button>
      </div>
    )
  }
}
