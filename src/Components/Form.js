// we need useState and useEffect hooks
import React,{useState,useEffect} from 'react'


// icons from react icons
import {BsCalendarPlus} from 'react-icons/bs';





const Form = () => {

     // todo value state
     const [todoValue, setTodoValue]=useState('');

  return (
        <div className='mt-3  '>
      {/* form component */}
      <form >
                <div className='flex justify-center' >

                  <input className=' rounded-full text-base md:text-lg text-black shadow-gray-400 shadow-md w-[65%] md:w-[70%] bg-white pl-4 '
                  
                  type='text' placeholder="Add an Item" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>


                 
                    <button className=' text-[1.3rem] md:text-[2rem]   px-2 md:px-4  rounded-xl  '
                     type="submit">
                      <BsCalendarPlus  color='yellow'/>
                    </button>
               
                </div>
        </form>
                {/* end of form component */}

</div>
   
  )
}

export default Form
