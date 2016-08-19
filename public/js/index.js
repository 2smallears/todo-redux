import {Component} from 'react';
import {render} from 'react-dom';
import React from 'react'
import {createStore} from 'redux'
import reducer from './reducer'

let store = createStore(reducer);

const App = React.createClass({
    add: function () {
        let text = this.refs.item.value;
        if (text === '') {
            return;
        }
        store.dispatch({type: "ADD", item: text});
        document.getElementById('value').value = '';
    },
    deleteTodo: function (index) {
        store.dispatch({type: 'DELETE', item: index})
    },
    changeState: function (index) {
        store.dispatch({type: 'CHANGESTATE', item: index})
    },
    filter(filterName) {
        store.dispatch({type: 'FILTER', filterName});
    },
    filterTodos() {
      if(store.getState().filterName === 'ALL') {
          return store.getState().todos;
      } else if(store.getState().filterName === 'ACTIVE') {
          return store.getState().todos.filter(todo => !todo.isComplete);
      } else {
          return store.getState().todos.filter(todo => todo.isComplete);
      }
    },
    render: function () {
        return <div>
            <h1>todo</h1>
            <input type="text" id="value" ref="item"/>
            <button onClick={this.add}>add</button>
            <TodoList todos={this.filterTodos()} deleteTodo={this.deleteTodo}
                      changeState={this.changeState}/>
            <TodoFooter onFilter={this.filter}/>
        </div>;
    }
});
const TodoList = React.createClass({
    deleteTodo: function (index) {
        this.props.deleteTodo(index);
    },
    changeState(index){
        this.props.changeState(index);
    },
    render: function () {
        const todos = this.props.todos.map((ele, index) => {
            return <div key={index}>
                <input type="checkbox" checked={ele.isComplete} name="ele" onClick={this.changeState.bind(this, index)}/>
                <span style={{"textDecoration": ele.isComplete ? "line-through" : ""}}>{ele.item}</span>
                <button onClick={this.deleteTodo.bind(this, index)}>X</button>
            </div>
        });
        return <div>
            {todos}
        </div>
    }

});

const TodoFooter = React.createClass({
    filter: function (filterName) {
        this.props.onFilter(filterName);
    },
    render: function () {
        return <div>
            <span onClick={this.filter.bind(this, 'ALL')}>ALL</span>&nbsp;
            <span onClick={this.filter.bind(this, 'ACTIVE')}>ACTIVE</span>&nbsp;
            <span onClick={this.filter.bind(this, 'COMPLETED')}>COMPLETED</span>
        </div>;
    }
});
store.subscribe(appRender);

function appRender() {
    render(
        <App />, document.getElementById('root')
    )
}

appRender();
