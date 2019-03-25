import React from 'react'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { markeAsDone, remove, markeAsPending } from './todoActions'

const  TodoList = props => {
    const renderRows = () =>{
        const list = props.list || []
        
        return list.map(todo =>(
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone': ''} >{todo.description}</td>
                <td >
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <IconButton style='success' icon='check' 
                            onClick={() => props.markeAsDone(todo)}
                            hide={todo.done}
                        ></IconButton>
                        <IconButton style='warning' icon='undo' 
                            onClick={() => props.markeAsPending(todo) }
                            hide={!todo.done}
                        ></IconButton>
                        <IconButton style='danger' icon='trash-o' 
                            onClick={ ()=> props.remove(todo)}
                            hide={!todo.done}
                        ></IconButton>
                    </div>
                </td>
            </tr>
        ))
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th className='col-lg-8'>Descrição</th>
                    <th className='col-lg-4'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}
const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = (dispatch) => bindActionCreators({markeAsDone, remove, markeAsPending}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)