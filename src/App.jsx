import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid'; 

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleEdit= ()=>{

  }
  const handleDelete= (e, id)=>{ 
    let newTodos = todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos)

    
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
   setTodo('')
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  

  return (
    <>
    <Navbar/>
    <div className="container bg-violet-200 mx-auto rounded-xl p-5 my-5 min-h-[80vh]">
       <div className="addTodo my-5">
        <h2 className='text-lg font-bold'>Add a ToDo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
        <button onClick={handleAdd} className='bg-violet-600 hover:bg-violet-800 text-white p-3 py-1 rounded-md mx-6 text-sm font-bold'>Add</button>
       </div>
      <h2 className='text-lg font-bold'>Your ToDos</h2>

      <div className="todos">
        {todos.length ===0 && <div className='m-5'> No Todos to display </div> }
        {todos.map(item=>{

     
        return <div key = {item.id} className="todo flex my-3 w-1/4 justify-between">
          <div className="flex gap-5">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id='' />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
            <div className="buttons">
              <button onClick={handleEdit} className='bg-violet-600 hover:bg-violet-800 text-white p-2 py-1 rounded-md mx-1 text-sm font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-600 hover:bg-violet-800 text-white p-2 py-1 rounded-md mx-1 text-sm font-bold'>Delete</button>
            </div>
          </div>
             })}
      </div>
    </div>
    </>
  )
}

export default App
