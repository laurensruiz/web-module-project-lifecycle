import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todoList">
        <h1> Todo List</h1>
        {
          this.props.todos.reduce((acc, todo) => {
            if(this.props.displayCompleted || !todo.completed)
            //it treats the data as object not an array so you need to concat the div you created previously before making the clear button work
            return acc.concat(<div onClick={this.props.toggleCompleted(todo.id)}key= {todo.id}>{todo.name}{todo.completed? '✔️' : ''}</div>)
            return acc
          }, [])

          
        }
      </div>
    )
  }
}
