import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL= 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSeach = this.handleSeach.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.state = { description : '', list: []}
        this.refresh()
    }
    refresh(description='') {
        const search = description ? `&description__regex=/${description}/`:''
        axios.get(`${URL}?sort=-createdAt&${search}`)

        .then(
            resp => {
                
                this.setState({...this.setState, description, list: resp.data})
            }
                
                
            
        )
    }
    handleSeach(){
        console.log(this.state.description)
        this.refresh(this.state.description)
    }
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh(this.state.description))
    }
    handleAdd() {
        const description = this.state.description
        axios.post(URL, {description})
        .then(resp => this.refresh())
    }
    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true})
        .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
        .then(resp => this.refresh(this.state.description))
    }

    handleChange(e){
        this.setState({...this.state, description:e.target.value})
    }
    handleClear(){
        this.refresh()
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='cadastro'></PageHeader>
                <TodoForm 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    handleSeach={this.handleSeach}
                    handleClear = {this.handleClear}
                ></TodoForm>
                <br/>
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                > </TodoList>
            </div>
        )
    }
}