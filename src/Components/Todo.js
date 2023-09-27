import Form from "./Form"

const Todo = () => {
  return (
    <div className='flex flex-col mt-10 w-[70%] '>
      
        <h1 className=' font-extrabold text-center font-serif text-yellow-400 text-2xl md:text-4xl border border-yellow-400 mb-2 p-2 border-dashed'>My TODO App</h1>

        <Form />


    </div>
  )
}

export default Todo
