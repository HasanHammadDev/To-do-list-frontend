import { Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Home from "./components/Pages/Home";
import EditTodo from "./components/Todos/EditTodo";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:todoId" element={<EditTodo />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
