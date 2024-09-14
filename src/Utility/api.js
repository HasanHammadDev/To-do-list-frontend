import axios from 'axios';

const endpoint = import.meta.env.VITE_REACT_APP_API_ENDPOINT;

export const registerAccount = async (accountInformation) => {
    try {
        const response = await axios.post(`${endpoint}/register/create`, accountInformation, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during registration:', error.response);
            return error.response?.data;
        } else {
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}

export const loginAccount = async (loginInformation) => {
    try {
        const response = await axios.post(`${endpoint}/login/`, loginInformation, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error logging in:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error during login:', error);
        }
        throw error;
    }
}

export const getTodoList = async (sortOrder) => {
    try {
        const response = await axios.get(`${endpoint}/todos/all`, {
            params: { sortOrder },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching todos:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while fetching todos:', error);
        }
        throw error;
    }
};

export const toggleTaskCompletion = async (todoInformation) => {
    try {
        const response = await axios.put(`${endpoint}/todos/toggle-completion`, todoInformation, {
            withCredentials: true,
        })
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error toggling task completion:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while trying to toggle completion of todo:', error);
        }
        throw error;
    }
}

export const createTodo = async (todoData) => {
    try {
        const response = await axios.post(`${endpoint}/todos/create`, todoData, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error creating todo:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while creating todo:', error);
        }
        throw error;
    }
}

export const editTodo = async (todoData) => {
    try {
        const response = await axios.put(`${endpoint}/todos/edit-todo`, todoData, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error editing todo:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while editing todo:', error);
        }
        throw error;
    }
}

export const removeTodo = async (todoId) => {
    try {
        const response = await axios.put(`${endpoint}/todos/remove-todo`, { todoId }, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error removing todo:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while removing todo:', error);
        }
        throw error;
    }
}

export const reorderTodos = async (todoId, moveUp) => {
    try {
        const response = await axios.put(`${endpoint}/todos/reorder`, {todoId, moveUp}, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error reordering todos:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while reordering todos:', error);
        }
        throw error;
    }
}

export const getTodoById = async (todoId) => {
    try {
        const response = await axios.get(`${endpoint}/todos/${todoId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching todo by id:', error.response?.data || error.message);
            return error.response?.data;
        } else {
            console.error('Unexpected error while fetching todo by id:', error);
        }
        throw error;
    }
}

export const checkTokenValidity = async () => {
    try {
        const response = await axios.get(`${endpoint}/login/validate-token`, { withCredentials: true });
        return response.data.success;
    } catch (error) {
        console.error('Error during token validation', error);
        return false;
    }
};

export const logoutAccount = async () => {
    try {
        const response = await axios.post(`${endpoint}/logout`, null, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during logout:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error during logout:', error);
        }
        throw error;
    }
}