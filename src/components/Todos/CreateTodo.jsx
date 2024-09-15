import { useEffect, useState } from "react";
import { createTodo } from "../../Utility/api";

const CreateTodo = ({ onTodoCreated }) => {
  const [todoData, setTodoData] = useState({
    taskName: "",
    dueDate: "",
    priority: 2,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createTodo(todoData);
      const newTodo = response;

      if (response.success) {
        onTodoCreated(newTodo);
        setErrorMessage(response.message);
        setTodoData({ taskName: "", dueDate: "", priority: 2 });
      } else {
        setErrorMessage(
          response.message || "There was an error creating the todo."
        );
      }
    } catch (error) {
      console.error("There was an error creating todo", error);
      setErrorMessage("There was a server error. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodoData((prevTodoData) => ({
      ...prevTodoData,
      [name]: name === "priority" ? parseInt(value, 10) : value,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return formatDate(today);
  };

  return (
    <div>
      {errorMessage && (
        <div className="bg-gray-200 border border-red-300 text-gray-700 p-4 rounded-lg mx-10 my-5 text-center">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8">
        <label htmlFor="formBasicTask">
          Task <b>*</b>
        </label>
        <input
          type="text"
          name="taskName"
          value={todoData.taskName}
          onChange={handleChange}
          placeholder="Enter Task Name"
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="formBasicTask"
        />
        <label htmlFor="formBasicDueDate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={todoData.dueDate}
          min={getTodayDate()}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="formBasicDueDate"
        />

        <div>
          <label htmlFor="formBasicPriority">Select Priority</label>
          <select
            id="formBasicPriority"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="priority"
            onChange={handleChange}
            value={todoData.priority}
          >
            <option value={1}>Low</option>
            <option value={2}>Normal</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 max hover:bg-blue-600 text-white font-bold py-2 px-12 rounded-lg"
          >
            Create Todo!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
