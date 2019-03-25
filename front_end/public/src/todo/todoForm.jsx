import React, {Component} from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeDescription, search, add, clear} from './todoActions'

class TodoForm extends Component{
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }
    componentWillMount(){
        this.props.search()
    }
    keyHandler(e){
        const {add, search, description, clear} = this.props
        if(e.key === 'Enter'){
            e.shiftKey ? search() : add(description)
        }else if(e.key ==='Escape') {
            clear()
        }
    }
    render(){
        const {add, search, description, changeDescription} = this.props
        
        
        return (
            <Grid cols="12 9 10">
                <form>
                    <div className='form-group'>
                        <label >Tarefa </label>
                        <input type="text" className='form-control' id='tarefa' 
                            onChange={changeDescription} 
                            onKeyUp ={this.keyHandler}
                            value={description} 
                            placeholder="Escreva uma tarefa" />
                        <small id="emailHelp" className="form-text text-muted"> {description}  Adicione aqui sua nova tarefa!.</small>  
                    </div>
                    <IconButton style='primary' icon='plus' texto=' Adicionar' onClick={() => add(description)}></IconButton>
                    <IconButton style='success' icon='search' onClick={search} texto=' Pesquisar'> </IconButton>
                    <IconButton style='info' icon='close' onClick={this.props.clear} texto=' Limpar'></IconButton>
                </form>
            </Grid>
        )
    }
}


const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => bindActionCreators({changeDescription, search, add, clear}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)