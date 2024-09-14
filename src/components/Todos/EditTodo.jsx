import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo, getTodoById } from "../../Utility/api";

const EditTodo = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await getTodoById(todoId);
        if (response.success) {
          const formattedTodo = {
            ...response,
            due_date: response.due_date ? formatDate(response.due_date) : ""
          };
          setTodoData(formattedTodo);
          setError(null);
        } else {
          setError("Todo item not found.");
        }
      } catch (error) {
        setError("There was an error fetching the todo.");
        console.error("There was an error fetching todo", error);
      }
    };
    getTodo();
  }, [todoId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodoData((prevTodoData) => ({
      ...prevTodoData,
      [name]: name === "priority" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await editTodo(todoData);
      if (response.success) {
        navigate("/");
      }

    } catch (error) {
      console.error("There was an error editing todo", error);
    }
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
      {error && (
        <div className="bg-red-200 border border-red-300 text-red-700 p-4 rounded-lg mx-10 my-5 text-center">
          {error}
        </div>
      )}
      {!error && (
        <form className="max-w-2xl mx-auto mt-8" onSubmit={handleSubmit}>
          <label htmlFor="formBasicTask">Task</label>
          <input
            type="text"
            name="task"
            value={todoData.task || ""}
            onChange={handleChange}
            placeholder="Enter Task Name"
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="formBasicTask"
          />

          <label htmlFor="formBasicDueDate">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={todoData.due_date || ""}
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
              value={todoData.priority || 1}
            >
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2"
          >
            Update Todo
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTodo;
