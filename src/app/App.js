import React, { Component } from 'react';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: "", description: "", tasks:[], editId:''
        }
    }
    componentDidMount(){
        this.fetchTasks()
    }
    addTaskorEdit(e){
        e.preventDefault()
        const { title, description } = this.state
        console.log('state: ', this.state)

        if(this.state.editId != ""){
          fetch(`/api/tasks/${this.state.editId}`,{
            method:"PUT",
            body: JSON.stringify({title, description}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
          .then(res => res.json() )
          .then(data => {
            M.toast({html:"Task Updated"})
            this.fetchTasks()
            this.setState({title:"",description:"",editId:""})
          })
          .catch(err => console.error(err))
        }else{
          const { title, description } = this.state
          fetch('/api/tasks',{
              method: 'POST',
              body: JSON.stringify({title, description}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(res => res.json() )
          .then(data => {
              console.log('update works')
              M.toast({html:'Task Saved'})
              this.setState({title:"",description:""})
              this.fetchTasks()
          })
          .catch(err => console.error(err))
        }
    }
    fetchTasks(){
        fetch('/api/tasks')
        .then(res  => res.json())
        .then(data => {
            this.setState({tasks:data.tasks})
            //console.log('this.state',this.state)
        })
    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({[name]: value})
    }
    deleteTask(id){
      if( confirm('Are you sure you want to delete it?') ){
        fetch(`/api/tasks/${id}`,{
          method:'DELETE',
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
          }
        }).then(res => res.json())
        .then(data => {
          console.log('data')
          M.toast({html:"Task Deleted"})
          this.fetchTasks()
        })
      }
    }
    editTask(id){
      fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({title:data.title, description: data.description, editId: id})
      })
    }
    render(){
        //const tasks = this.state.tasks || []
        return(
            <div>
               {/* NAVIGATION */}
                <nav className="light-blue darken-4" >
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row" >

                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTaskorEdit.bind(this)} >
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={ this.handleChange.bind(this) } type="text"
                                                name="title" value={this.state.title}
                                                placeholder="Title" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="Task Description"
                                                    name="description"
                                                    value={this.state.description}
                                                    onChange={ this.handleChange.bind(this) }
                                                    className="materialize-textarea"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send!
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>


                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map( (task, k) => {
                                            return(
                                                <tr key={k} >
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                      <button onClick={ this.editTask.bind(this, task._id) } className="btn light-blue darken-4" >
                                                        <i className="material-icons">edit</i>
                                                      </button>
                                                      <button onClick={ this.deleteTask.bind(this, task._id) } className="btn light-blue darken-4">
                                                        <i className="material-icons">delete</i>
                                                      </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
