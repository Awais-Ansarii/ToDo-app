import React from "react";
// importing toasts
import { toast } from "react-toastify";

//importing icons from react icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const TodoList = ({
  individualTodo,
  index,
  editForm,
  handleCheckbox,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div
      className="bg-yellow-400 text-black font-semibold text-xl m-2 p-2 flex  justify-between"
      key={individualTodo.ID}
    >
      <div className="flex  gap-3">
        {/* we dont need to show checkbox when edit button is clicked */}

        {editForm === false && (
          <input
            type="checkbox"
            checked={individualTodo.completed}
            onChange={() => handleCheckbox(individualTodo.ID)}
          />
        )}

        <span
          style={
            individualTodo.completed === true
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {individualTodo.TodoValue}
        </span>
      </div>

      {/* we dont need to show edit and delete icons when edit button is clicked */}

      {editForm === false && (
        <div className="flex gap-3">
          <button onClick={() => handleEdit(individualTodo, index)}>
            <BiEdit />
          </button>

          <button
            onClick={() => {
              handleDelete(individualTodo.ID);
              toast.warning("Todo deleted ✂");
            }}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
