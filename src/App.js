import Todo from "./Components/Todo";

import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className=" bg-black text-white w-screen h-screen flex justify-center ">
    
    <Todo/>

    <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;

