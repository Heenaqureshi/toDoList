import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const TodoApp = () => {
  const [state, setState] = useState({
    message: "",
  });
  const [store, setStore] = useState([])

  const addTask = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value })
    
  }

  const addMoreTask = (event) => {
    event.preventDefault()
    // console.log(state);
    axios.post("http://localhost:4000/todoApp", state)
      .then((res) => {
        console.log(res.data);
        
        if(res.status==200 || res.status==201){
          toast.success('Data Send Successfully');
        }
        else{
          toast.error('Data Not Send Successfully');

        }
        
      })
      event.target.reset()
      getAllData();
    }
  const getAllData=()=>{
    axios.get("http://localhost:4000/todoApp")
    .then((res) => {
       console.log(res.data)
      setStore(res.data)
    })
    getAllData()
  }
  
  useEffect(() => {
    getAllData()
  },[])

  const deleteTodoList=(id)=>{
    axios.delete("http://localhost:4000/todoApp/"+id)
    .then((res)=>{
      getAllData()
    })
  }
  return (
    <>
      <div className="container-fluid">
      <Toaster/>
        <div className="header">
          <h1 className="title">Just do it...</h1>
        </div>
        <div>
          <form action="" method="post" onSubmit={addMoreTask}>
            <div className="input-group mb-3">
              <input type="text" name='message' onChange={addTask} className="form-control todo-input " placeholder="Add a task" aria-describedby="button-addon2" style={{ width: "350px" }} />
              <button className="btn btn-light" type="submit" id="button-addon2">+</button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="todo">
              <div className="todo text-align-center">
                {
                  store.map((item,index)=>
                  <div className='d-flex'>
                    <p className='todo-task'>{item.message}</p>
                  <Link className='edit_btn' to={`/edit/${item.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                  <button className='delete_btn'onClick={()=>{deleteTodoList(item.id)}}><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                  )
                }
              </div>
              
            </div>
        </div>
      </div>
    </div >
      

    </>
  )
}

export default TodoApp