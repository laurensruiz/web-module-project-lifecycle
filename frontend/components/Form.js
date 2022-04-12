import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
      <form 
        id= "todoForm" 
        onSubmit={this.props.onSubmit}>
        <input 
          value={this.props.todoInput} 
          onChange={this.props.onChange} type="text" 
          placeholder='Type your new todo'>
            
          </input>
        <input type='submit'></input>
      </form>
      <button 
        onClick={this.props.toggleDisplayCompletedness}>{this.props.displayCompleted? 'Hide' : 'Show'} Completed Tasks</button>
      </div>
    )
  }
}
