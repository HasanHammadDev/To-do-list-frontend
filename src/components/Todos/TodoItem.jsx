import {
  CheckCircle,
  Circle,
  Calendar,
  Clock,
  Trash,
  ArrowBigUp,
  ArrowBigDown,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";

const TodoItem = ({
  id,
  task,
  dueDate,
  priority,
  isCompleted,
  createdAt,
  onToggleCompletion,
  handleTodoDeletion,
  handleReorder,
  sortOrder,
}) => {
  const handleToggleCompletion = () => {
    onToggleCompletion(id, isCompleted);
  };

  const priorityLabels = {
    1: "Low",
    2: "Normal",
    3: "High",
  };

  const priorityClasses = {
    1: "text-green-500",
    2: "text-blue-500",
    3: "text-red-500",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`flex items-center p-4 border-b border-gray-200 ${
        isCompleted ? "bg-green-50" : "bg-white"
      }`}
    >
      {isCompleted ? (
        <CheckCircle
          className="text-green-500 mr-3 flex-shrink-0 cursor-pointer"
          onClick={handleToggleCompletion}
        />
      ) : (
        <Circle
          className="text-gray-300 mr-3 flex-shrink-0 cursor-pointer"
          onClick={handleToggleCompletion}
        />
      )}
      <div className="flex-grow">
        <h3
          className={`text-lg font-medium ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {task}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <p
            className={`mr-3 font-bold ${
              priorityClasses[priority] || "text-gray-500"
            }`}
          >
            {priorityLabels[priority]}
          </p>
          <Calendar className="w-4 h-4 mr-1" />
          <span className="mr-4">
            {dueDate ? formatDate(dueDate) : "No due date"}
          </span>
          <Clock className="w-4 h-4 mr-1" />
          <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Link to={`/edit/${id}`}>
          <Edit className="text-red-600 cursor-pointer w-10 h-10 p-2 hover:bg-gray-200 border rounded mr-2" />
        </Link>
        {sortOrder === "default" && (
          <div className="mr-2">
            <ArrowBigUp
              onClick={() => {
                handleReorder(id, true);
              }}
              className="text-gray-900 hover:bg-slate-400 cursor-pointer border rounded my-2"
            />
            <ArrowBigDown
              onClick={() => {
                handleReorder(id, false);
              }}
              className="text-gray-900 hover:bg-slate-400 cursor-pointer border rounded my-2"
            />
          </div>
        )}

        <Trash
          className="text-red-600 cursor-pointer w-10 h-10 p-2 hover:bg-red-200 border rounded"
          onClick={() => {
            handleTodoDeletion(id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
