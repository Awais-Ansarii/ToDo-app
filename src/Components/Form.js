// we need useState and useEffect hooks
import React,{useState,useEffect} from 'react'

// importing toasts
import {toast } from 'react-toastify';



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

    // edit form
    const [editForm, setEditForm]=useState(false);

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

    // edit todo
    const handleEdit=(todo,index)=>{
        setEditForm(true);
        setTodoValue(todo.TodoValue);
        setId(index);
      }

    // edit todo submit
    const handleEditSubmit=(e)=>{
        e.preventDefault();
        // copying todos state in items variable
        let items = [...todos];
        // storing the element at a particular index in item variable
        let item = items[id];
        // manipulating the item (object) keys
        item.TodoValue=todoValue;
        item.completed=false;
        // after manipulating item, saving it at the same index in items
        items[id]=item;
        // updating todos with items
        setTodos(items);
        setEditForm(false);
        setTodoValue('');
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
        <div className='mt-3    '>

            <div className=''>

      {/* form component */}
      { editForm===false && <form autoComplete="off" onSubmit={handleSubmit}>
                <div className='flex justify-center' >

                  <input className=' rounded-full text-base md:text-lg text-black shadow-gray-400 shadow-md w-[65%] md:w-[70%] bg-white pl-4 '
                  
                  type='text' placeholder="Add an Item" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>


                 
                    <button  className=' text-[1.3rem] md:text-[2rem]   px-2 md:px-4  rounded-xl  '
                        onClick={ () => toast.success( " Todo added 🏍 " )} 
                     type="submit">
                      <BsCalendarPlus  color='yellow'/>
                    </button>
               
                </div>
        </form>
      }
                {/* end of form component */}


        {/* edit form component */}
        {editForm===true &&(
            <div className=" ">
              <form autoComplete="off " onSubmit={handleEditSubmit}>
                <div className="input-and-button">
                  <input
                  className='rounded-full text-base md:text-lg text-black shadow-gray-400 shadow-md w-[65%] md:w-[70%] bg-white pl-4 '
                   type='text' placeholder="Edit your Item" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  <div className='text-[1.3rem] md:text-[2rem]   px-2 md:px-4  rounded-xl bg-violet-600 text-yellow-400'>
                    <button type="submit" 
                    onClick={()=>toast.info( "Todo updated👍" )}>
                      UPDATE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {/* end of edit form component */}



        {/* Rendering todos depending on length of todos greater than 0 */}
        <div className='mt-3 border-blue-800 border-2'>
          {todos.length>0 &&(
            <div>
              {todos.map(   (individualTodo,index)=>(
                <div className='bg-green-600 m-2 p-2 flex justify-between' key={individualTodo.ID}>

                  <div className='flex gap-3'>

                       {/* we dont need to show checkbox when edit button is clicked */}
                      
                      {
                        editForm===false && (
                            <input type='checkbox' checked={individualTodo.completed}
                            onChange={()=>handleCheckbox(individualTodo.ID)}/>
                        )
                      }

                      <span
                      style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                      
                      {individualTodo.TodoValue}
                      
                      </span>
                  </div>

                   {/* we dont need to show edit and delete icons when edit button is clicked */}
                  
                  { editForm===false &&
                    (
                    <div className='flex gap-3'>

                        <button onClick={ ()=> 
                                  handleEdit(individualTodo,index)
                         }>
                            <BiEdit/>
                        </button>


                        <button  onClick={()=>{handleDelete(individualTodo.ID);
                         toast.warning( "Todos deleted ✂" )}}>
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

            
                 {/* delete all todos */}
              { (editForm===false && todos.length>0 ) && (
                <div className='' >
                  <button className=' bg-pink-800 text-yellow-400 p-2 rounded-lg'
                  onClick={()=> {setTodos([]); toast.error( " All Todos deleted 🏴‍☠️ " )}   } >
                    Delete All Todos
                  </button>
                </div>
              )}



              
            
        </div>
       
   
  )
}

export default Form;
