import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue]);
			setInputValue("");
		}
	};

	const deleteTodo = (index) => {
		setTodos(todos.filter((_, i) => i !== index));
	};

	return (
		<div className="todo-container">
			<h1 className="title">todos</h1>

			<div className="todo-box">
				<input
					type="text"
					placeholder="What needs to be done?"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<ul>
					{todos.length === 0 ? (
						<li className="empty">No hay tareas, añadir tareas</li>
					) : (
						todos.map((todo, index) => (
							<li key={index} className="todo-item">
								{todo}
								<span
									className="delete"
									onClick={() => deleteTodo(index)}
								>
									<i className="fas fa-trash"></i>
								</span>
							</li>
						))
					)}
				</ul>

				<div className="footer">
					{todos.length} item{todos.length !== 1 && "s"} left
				</div>
			</div>
		</div>
	);
};

export default Home;