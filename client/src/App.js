import React, { Component } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {
  state = { todos: [] }

  componentDidMount() {
    axios.get('/api/items')
      .then(res => this.setState({ todos: res.data }))
  }

  createItem = (name) => {
    const item = { name }
    axios.post('/api/items', { item })
      .then(res => {
        const { todos } = this.state;
        this.setState({ todos: [...todos, res.data] })
      })
  }

  updateTodo = (id) => {
    axios.put(`/api/items/${id}`)
      .then(res => {
        let todos = this.state.todos.map(t => {
          if (t.id === id)
            return res.data;
          return t;
        });

        this.setState({ todos });
      })
  }

  deleteTodo = (id) => {
    axios.delete(`/api/items/${id}`)
      .then(() => {
        const { todos } = this.state;
        this.setState({ todos: todos.filter(t => t.id !== id) })
      })
  }

  render() {
    return (
      <div className="container">
        <TodoForm addItem={this.createItem} />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;