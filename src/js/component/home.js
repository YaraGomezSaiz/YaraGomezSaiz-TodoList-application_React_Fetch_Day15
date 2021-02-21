import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	const [newTodo, setNewTodo] = useState("");
	const [updateTodo, setUpdateTodo] = useState("");
	
	let BaseURL = "https://jsonplaceholder.typicode.com/";

	// OBTENER LISTADO COMPLETO AL CARGAR LA PAGINA

	useEffect(() => {
		//method: GET para obtener el listado completo
		fetch(BaseURL + "todos/", {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setTodos(responseJson);
			});
	}, []);

	// CREAR E INSERTAR UNA NUEVA TAREA EN EL LISTADO

	// Al pulsar enter sobre el input entrada task nueva se guarda el contenido
	function saveTodoData(event) {
		if (event.key === "Enter") {
			setTodo(newTodo);
			CreateTodoItem(newTodo);
		}
	}

	//method: POST es para crear un nuevo elemento
	function CreateTodoItem(newTodo) {
		fetch(BaseURL + "todos", {
			method: "POST",
			body: JSON.stringify({
				title: newTodo,
				body: " ",
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				let todosArrayCopy = [...todos, responseJson];
				setTodos(todosArrayCopy);
			});
	}

	// ACTUALIZAR EL VALOR DE UNA TAREA EXISTENTE

	// Al pulsar enter sobre el propio input modificado se actualiza su valor
	function updateTodoData(event) {
		if (event.key === "Enter") {
			setTodo(newTodo);
			UpdateTodoItem(newTodo);
		}
	}

	//method: PUT para actualizar un elemento

	function UpdateTodoItem(newTodo) {
		let index = saveIndex;

		fetch(BaseURL + "todos/1", {
			method: "PUT",
			body: JSON.stringify({
				id: index,
				title: newTodo,
				body: "",
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				console.log(responseJson.id);
				//console.log(todos.find(responseJson.id));
				let todosArrayCopy = [...todos, responseJson];
				setTodos(todosArrayCopy);
			});
	}

	return (
		<div>
			<input
				type="text"
				placeholder="new task"
				onChange={event => {
					setNewTodo(event.target.value);
				}}
				onKeyDown={saveTodoData}
			/>
			{todo}
			<ul>
				{todos.map(todoItem => {
					return (
						<li key={todoItem.title}>
							<input
								type="text"
								defaultValue={todoItem.title}
								onChange={event => {
									setNewTodo(event.target.value);
								}}
								onKeyDown={updateTodoData}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
