import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("https://todo-jd8q.onrender.com/tasks/")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        if (data.is_completed===false)
        setTasks(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() != "") {
      axios
        .post("https://todo-jd8q.onrender.com/tasks/", {
          title: newTask,
          is_completed: false,
        })
        .then((response) => setTasks([...tasks, response.data]))
        .catch((error) => console.log("error adding task: ", error));
      // setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask("");
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const deleteTask = (id) => {
    
    axios
      .delete(`https://todo-jd8q.onrender.com/tasks/${id}/`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.log("Error deleting task : ", error));
  };

  const completeTask = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id)
    axios.put(`https://todo-jd8q.onrender.com/tasks/${id}/`, {...taskToUpdate, is_completed: true}).then(()=> {
      setTasks(tasks.filter((task) => task.id!==id))
    }).catch((error) => console.log("Error updating the task details : ", error))

  }

  return (
    <div>
      <div className="bg-violet-200 p-2 mt-10 rounded-lg shadow-md max-w-md mx-auto ">
        <h1 className="text-center font-mono mb-4 font-bold pt-2">Todo List</h1>

        <form className="flex mb-4">
          <input
            className="flex-grow p-2 rounded-lg focus: outline-none"
            type="text"
            placeholder="Add a New Task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-violet-400 rounded-lg px-3 mx-2 hover:bg-blue-500 text-white"
            onClick={addTask}
          >
            Add
          </button>
        </form>

        <div className="y-2">
          {tasks.map((task) => (
            <li
              className="text-white text-bold text-mono flex justify-between bg-violet-400 p-2 my-2 rounded-lg shadow-md list-none"
              key={task.id}
            >
              {task.title}
              <div>
                <button onClick={() => completeTask(task.id)}>
                  <svg
                    class="h-8 w-8 text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <svg
                    class="h-8 w-8 text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
