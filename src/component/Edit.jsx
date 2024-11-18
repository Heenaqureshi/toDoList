import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Edit = () => {
    const [state, setState]=useState({
      message:""    
  })
  
    const _navigate = useNavigate();
    const {id}=useParams()

    useEffect(()=>{
        axios.get("http://localhost:4000/todoApp/"+id)
        .then((res)=>{
            setState(res.data)
            
        })
    },[])
    const addTask=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const updateTask=(event)=>{
        event.preventDefault()
        axios.put("http://localhost:4000/todoApp/"+id,state)
        .then((res)=>{
            _navigate("/")
        })
    }
    
  return (
    <div>
        <div className="container-fluid">
        <div className="header">
          <h1 className="title">Just do it.</h1>
        </div>
        <div>
          <form action="" method="post" onSubmit={updateTask}>
            <div className="input-group mb-3">
              <input type="text" name='message' value={state.message} onChange={addTask} className="form-control todo-input " placeholder="Add a task" aria-describedby="button-addon2" style={{ width: "350px" }} />
              <button className="btn btn-light" type="submit" id="button-addon2">+</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
