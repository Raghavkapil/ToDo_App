import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid'


function App() {

  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  
  const [showFinished, setshowFinished] = useState(false)

  const SaveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))    
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    
  }
  
  
  useEffect(()=>{
    let todostring = localStorage.getItem("todos");
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])

  const handleEdit= (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodos)
    SaveToLS()

  }
  const handleDelete= (e, id)=>{ 
    let newTodos = todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos)
    SaveToLS()
    
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
   setTodo('')
   SaveToLS()
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
    SaveToLS()
  }
  
  const handleReset = () => {
    setTodos([]);
    SaveToLS()
    
  }
  

  return (
    <>
    <Navbar onReset={handleReset}/>
    <div className="mx-3 md:container bg-violet-200 md:mx-auto rounded-xl p-5 my-5 min-h-[80vh] md:w-1/2">
       <div className="addTodo my-5 flex flex-col gap-4 ">
        <h2 className='text-lg font-bold cursor-text'>What's next?</h2>
        <div className="flex ">

        <input onChange={handleChange} value={todo} type="text"  className='w-full rounded-xl text-sm p-2'  />
        <button onClick={handleAdd} disabled={todo.length<=2} className='disabled:bg-violet-300 bg-violet-600 cursor-pointer hover:bg-violet-800 text-white p-3 py-1 rounded-xl mx-6 text-sm font-bold'>Add</button>
        </div>
       </div>
       <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show all...
      <h2 className='text-lg font-bold'>Your to-dos</h2>

      <div className="todos">
        {todos.length ===0 && <div className='m-5'> Nothing to do... </div> }
        {todos.map(item=>{

     
        return (showFinished || !item.isCompleted) && <div key = {item.id} className="todo flex my-3 w-full justify-between">
          <div className="flex gap-5">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-600 hover:bg-violet-800 text-white p-2 py-1 rounded-md mx-1 text-sm font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-red-600 hover:bg-red-800 text-white p-2 py-1 rounded-md mx-1 text-sm font-bold'>
                Delete
              </button>
            </div>
          </div>
             })}
      </div>
    </div>
    </>
  )
}

export default App
