// we need useState and useEffect hooks
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

// importing toasts
import { toast } from "react-toastify";

//importing icons from react icons
import { BsCalendarPlus } from "react-icons/bs";

// getting todos from local storage
const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Form = () => {
  // id state
  const [id, setId] = useState();

  // todo value state
  const [todoValue, setTodoValue] = useState("");

  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());
  // console.log(todos);

  // edit form
  const [editForm, setEditForm] = useState(false);

  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();

    // creating a unique ID for every todo
    const date = new Date();
    const time = date.getTime();
    // end of creating a ID

    // creating a todo object
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };
    // end of creating a todo object

    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  // handle checkbox
  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      // console.log(todoArray);
      setTodos(todoArray);
    });
  };

  // edit todo
  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.TodoValue);
    setId(index);
  };

  // edit todo submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // copying todos state in items variable
    let items = [...todos];
    // storing the element at a particular index in item variable
    let item = items[id];
    // manipulating the item (object) keys
    item.TodoValue = todoValue;
    item.completed = false;
    // after manipulating item, saving it at the same index in items
    items[id] = item;
    // updating todos with items
    setTodos(items);
    setEditForm(false);
    setTodoValue("");
  };

  // delete todo
  const handleDelete = (id) => {
    // console.log(id);
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="mt-3  flex justify-between w-[100%] ">
      <div className=" w-[80%] ">
        {/* form component */}
        {editForm === false && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input
                className=" rounded-full text-base md:text-lg text-black shadow-gray-400 shadow-md w-[65%] md:w-[70%] bg-white pl-4 "
                type="text"
                placeholder="Add an Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />

              <button
                className=" text-[1.3rem] md:text-[2rem]   px-2 md:px-4  rounded-xl  "
                onClick={() => toast.success(" Todo added 🏍 ")}
                type="submit"
              >
                <BsCalendarPlus color="yellow" />
              </button>
            </div>
          </form>
        )}
        {/* end of form component */}

        {/* edit form component */}
        {editForm === true && (
          <form autoComplete="off " onSubmit={handleEditSubmit}>
            <div className="flex justify-center">
              <input
                className="rounded-full text-base md:text-lg text-black shadow-gray-400 shadow-md w-[65%] md:w-[70%] bg-white pl-4 "
                type="text"
                placeholder="Edit your Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />

              <button
                className="text-[0.5rem] md:text-[1rem] font-bold ml-2   px-2 md:px-4  rounded-xl bg-violet-600 text-yellow-400"
                type="submit"
                onClick={() => toast.info("Todo updated👍")}
              >
                Update
              </button>
            </div>
          </form>
        )}
        {/* end of edit form component */}

        {/* Rendering todos depending on length of todos greater than 0 */}

        <div className="mt-3   ">
          {todos.length > 0 && (
            <div className="flex flex-col-reverse">
              {todos.map((individualTodo, index) => (
                <TodoList
                  individualTodo={individualTodo}
                  index={index}
                  editForm={editForm}
                  handleCheckbox={handleCheckbox}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  key={index}
                />
              ))}
            </div>
          )}

          {todos.length === 0 && (
            <div className="text-yellow-400 text-center mt-10 font-mono text-2xl font-semibold">
              Lets add some Todos in your Todo-List 😀
            </div>
          )}
        </div>
      </div>

      {/* delete all todos */}
      {editForm === false && todos.length > 0 && (
        <div className="">
          <button
            className=" bg-pink-800 text-yellow-400 font-semibold p-2 ml-4 rounded-lg"
            onClick={() => {
              setTodos([]);
              toast.error(" All Todos deleted 🏴‍☠️ ");
            }}
          >
            Delete All Todos
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
