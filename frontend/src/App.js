import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";  // Import CSS file

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [darkMode, setDarkMode] = useState(false); 

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get("http://localhost:5000/api/todos")
            .then(response => setTodos(response.data))
            .catch(error => console.error("Error fetching todos:", error));
    };

    const addTodo = () => {
        if (!newTodo.trim()) return;
        axios.post("http://localhost:5000/api/todos/add", { task: newTodo })
            .then(() => {
                setNewTodo("");
                fetchTodos();
            })
            .catch(error => console.error("Error adding todo:", error));
    };

    const toggleComplete = (id, completed) => {
        axios.put(`http://localhost:5000/api/todos/update/${id}`, { completed: !completed })
            .then(() => fetchTodos())
            .catch(error => console.error("Error updating todo:", error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/api/todos/delete/${id}`)
            .then(() => fetchTodos())
            .catch(error => console.error("Error deleting todo:", error));
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        console.log("Dark Mode:", !darkMode); // Debugging line
    };
    

    return (
        <div className={`container ${darkMode ? "dark-mode" : ""}`}>
            <h1>📝 Todo List</h1>

            <button className="dark-mode-btn" onClick={toggleDarkMode}>
    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
     </button>


            {/* Input & Button */}
            <div className="input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new task..."
                />
                <button onClick={addTodo}>Add</button>
            </div>

            {/* Todo List */}
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} className={todo.completed ? "completed" : ""}>
                        <span onClick={() => toggleComplete(todo._id, todo.completed)}>
                            {todo.task}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
