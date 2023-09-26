// we need useState and useEffect hooks
import React,{useState,useEffect} from 'react'


//importing icons from react icons
import {BsCalendarPlus} from 'react-icons/bs';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiEdit} from 'react-icons/bi';


// getting todos from local storage
const getTodosFromLS=()=>{
    const data = localStorage.getItem('Todos');
    if(data){
        return JSON.parse(data);
    }
    else{
        return [];
    }
}


const Form = () => {


    // id state
    const [id,setId]=useState();


     // todo value state
     const [todoValue, setTodoValue]=useState('');

     // todos array of objects
    const [todos, setTodos]=useState(getTodosFromLS());
    // console.log(todos);

     // form submit event
    const handleSubmit=(e)=>{
        e.preventDefault();

        // creating a unique ID for every todo
        const date = new Date();
        const time = date.getTime();
        // end of creating a ID

        // creating a todo object
        let todoObject={
          ID: time,
          TodoValue:todoValue,
          completed: false
        }
        // end of creating a todo object

        setTodos([...todos,todoObject]);
        setTodoValue('');
    }

    

    // handle checkbox
        const handleCheckbox=(id)=>{
            let todoArray=[];
            todos.forEach((todo)=>{
              if(todo.ID===id){
                if(todo.completed===false){
                  todo.completed=true;
                }
                else if(todo.completed===true){
                  todo.completed=false;
                }
              }
              todoArray.push(todo);
              // console.log(todoArray);
              setTodos(todoArray);
            })
          }

    // delete todo
    const handleDelete=(id)=>{
        // console.log(id);
        const filtered = todos.filter((todo)=>{
          return todo.ID!==id
        });
        setTodos(filtered);
      }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('Todos',JSON.stringify(todos));
    }, [todos]);

  return (
        <div className='mt-3  '>
      {/* form component */}
      <form autoComplete="off" onSubmit={handleSubmit}>
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



        {/* Rendering todos depending on length of todos greater than 0 */}
        <div>
          {todos.length>0 &&(
            <div>
              {todos.map(   (individualTodo,index)=>(
                <div className='' key={individualTodo.ID}>
                  <div>
                      
                      {(
                        <input type='checkbox' checked={individualTodo.completed}
                        onChange={()=>handleCheckbox(individualTodo.ID)}/>
                      )}
                      <span
                      style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>{individualTodo.TodoValue}</span>
                  </div>

                  
                  {(
                    <div className=''>

                        <button><BiEdit/></button>


                        <button  onClick={()=>handleDelete(individualTodo.ID)}>
                        <RiDeleteBin6Line/>

                        </button>
                      

                      

                    </div>
                  )}

                    </div>
                     )
                 )} 
              </div>
          )}
          </div>

             

</div>
   
  )
}

export default Form;
