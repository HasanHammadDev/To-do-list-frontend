import { logoutAccount } from "../../Utility/api";
import { useAuth } from "../context/AuthContext";

const Header = ({ username }) => {

    const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logoutAccount();
      if (response.success) {
        setIsLoggedIn(false);
      } else {
        console.error("Logout failed:", response.message || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-around h-20 border rounded shadow-md bg-slate-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          <span className="text-blue-700">{username}</span>'s Todo List
        </h2>
        <button
          onClick={handleLogout}
          className="text-blue border border-blue-700 hover:bg-gray-300 font-semibold py-2 px-4 rounded text-center"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
