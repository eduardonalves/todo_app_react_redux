import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if(e.key === 'Enter'){
            e.shiftKey ? props.handleSeach() : props.handleAdd()
        }else if(e.key ==='Escape') {
            props.handleClear()
        }
    }
    return (
        <Grid cols="12 9 10">
            <form>
                <div className='form-group'>
                    <label >Tarefa </label>
                    <input type="text" className='form-control' id='tarefa' 
                        onChange={props.handleChange} 
                        onKeyUp ={keyHandler}
                        value={props.description} 
                        placeholder="Escreva uma tarefa" />
                    <small id="emailHelp" className="form-text text-muted">Adicione aqui sua nova tarefa!.</small>  
                </div>
                <IconButton style='primary' icon='plus' texto=' Adicionar' onClick={props.handleAdd}></IconButton>
                <IconButton style='success' icon='search' onClick={props.handleSeach} texto=' Pesquisar'> </IconButton>
                <IconButton style='info' icon='close' onClick={props.handleClear} texto=' Limpar'></IconButton>
            </form>
        </Grid>
    )
}