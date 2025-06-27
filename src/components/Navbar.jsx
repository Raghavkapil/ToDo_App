import React from 'react'



const Navbar = ({onReset}) => {

  const handleReset = (e) => {
    let ans = confirm("This will delete all your tasks!")
    if(ans){
     onReset()
    }
  }
  
  

  return (
   <nav className='flex justify-between bg-violet-600 text-white py-2'>
    <div className="logo">
      <span className='font-bold text-xl mx-8'>toDo</span>
    </div>
    <ul className="flex gap-8 mx-9">
      <li className='cursor-pointer hover:font-bold transition-all'>
        Home
      </li>
      
      <li className='cursor-pointer hover:font-bold transition-all' onClick={handleReset}>
        Reset 
      </li>
    </ul>
   </nav>
  )
}

export default Navbar
