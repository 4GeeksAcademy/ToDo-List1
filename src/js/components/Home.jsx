import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const USERNAME = "brandon_gaviria_2026";
const BASE_URL = "https://playground.4geeks.com/todo";

const Home = () => {
	const [tareas, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		crearUsuario();
		obtenerTareas();
	}, []);

	const crearUsuario = () => {
		fetch(`${BASE_URL}/users/${USERNAME}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		}).catch(error => console.log(error));
	};

	const obtenerTareas = () => {
		fetch(`${BASE_URL}/users/${USERNAME}`)
			.then(resp => resp.json())
			.then(data => {
				if (data.todos) {
					setTareas(data.todos);
				}
			})
			.catch(error => console.log(error));
	};

	const agregarTarea = () => {
		const tarea = {
			label: inputValue,
			is_done: false
		};

		fetch(`${BASE_URL}/todos/${USERNAME}`, {
			method: "POST",
			body: JSON.stringify(tarea),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => {
				setInputValue("");
				obtenerTareas();
			})
			.catch(error => console.log(error));
	};

	const eliminarTarea = (id) => {
		fetch(`${BASE_URL}/todos/${id}`, {
			method: "DELETE"
		})
			.then(() => obtenerTareas())
			.catch(error => console.log(error));
	};

	const eliminarTodasLasTareas = () => {
		fetch(`${BASE_URL}/users/${USERNAME}`, {
			method: "DELETE"
		})
			.then(() => {
				setTareas([]);
				crearUsuario();
			})
			.catch(error => console.log(error));
	};

	const manejarTecla = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			agregarTarea();
		}
	};

	return (
		<div className="todo-container">
			<h1 className="title">ToDo List 2.0</h1>

			<div className="todo-box">
				<input
					type="text"
					placeholder="¿Qué necesitas hacer?"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={manejarTecla}
				/>

				<ul>
					{tareas.length === 0 ? (
						<li className="empty">
							No hay tareas, añade una nueva
						</li>
					) : (
						tareas.map((tarea) => (
							<li key={tarea.id} className="todo-item">
								{tarea.label}

								<span
									className="delete"
									onClick={() => eliminarTarea(tarea.id)}
								>
									<i className="fas fa-trash"></i>
								</span>
							</li>
						))
					)}
				</ul>

				<div className="footer">
					{tareas.length} tarea
					{tareas.length !== 1 && "s"} pendiente
					{tareas.length !== 1 && "s"}
				</div>

				<button
					className="btn btn-danger w-100"
					onClick={eliminarTodasLasTareas}
				>
					Borrar todas las tareas
				</button>
			</div>
		</div>
	);
};

export default Home;