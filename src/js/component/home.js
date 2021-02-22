import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	const [newTodo, setNewTodo] = useState("");
	const [updateTodo, setUpdateTodo] = useState("");
	const [deleteResult, setDeleteResult] = useState("");
	const [deleteAllResult, setDeleteAllResult] = useState("");

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

	//method: PUT para actualizar un elemento

	function UpdateTodoItem(title, id, todoItem) {
		fetch(BaseURL + "todos/" + id, {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				title: title,
				body: "",
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

	//FUNCION BORRADO TODO EL ARRAY
	function DeleteTodoAll() {
		let id = 0;

		let ArrayCopy = [...todos];
		if (todos.length > 0) {
			for (let i = 0; i < todos.length; i++) {
				id = todos[i].id;
				fetch(BaseURL + "todos/" + id, {
					method: "DELETE"
				}).then(response => {
					if (response.ok) {
						ArrayCopy.splice(i, 1);
					} else {
						setTodos(ArrayCopy);
						setDeleteAllResult(" Delete failed");
						return;
					}
				});
			}

			//let ArrayCopy = [];
			// if (todos.length > 0) {
			// 	for (let i = 0; i < todos.length; i++) {
			// 		id = todos[i].id;
			// 		fetch(BaseURL + "todos/" + id, {
			// 			method: "DELETE"
			// 		}).then(response => {
			// 			if (!response.ok) {
			// 				let ArrayCopy = [...todos];
			// 				ArrayCopy.splice(0, i);
			// 				setTodos(ArrayCopy);
			// 				setDeleteAllResult(" Delete failed");
			// 				return;
			// 			}
			// 		});
			// 	}

			setTodos(ArrayCopy);
			setDeleteAllResult(" All items have been deleted");
		} else setDeleteAllResult(" List empty");
	}

	// despues de borrar se muestra un mensaje que desaparece al 1,5seg
	useEffect(() => {
		const timer = setTimeout(() => {
			setDeleteAllResult("");
		}, 1500);
		return () => clearTimeout(timer);
	}, [deleteAllResult != ""]);

	//FUNCION BORRADO UN ITEM INDIVIDUAL

	function DeleteTodoItem(id) {
		fetch(BaseURL + "todos/" + id, {
			method: "DELETE"
		}).then(response => {
			if (response.ok) {
				let todosArrayCopy = [...todos];
				let arrayPos = todosArrayCopy.findIndex(obj => obj.id == id);
				todosArrayCopy.splice(arrayPos, 1);
				setTodos(todosArrayCopy);
				setDeleteResult("Task " + arrayPos + " has been deleted");
			} else {
				setDeleteResult("Unable to delete task " + id);
			}
		});
	}
	// despues de borrar se muestra un mensaje que desaparece al 1,5seg
	useEffect(() => {
		const timer = setTimeout(() => {
			setDeleteResult("");
		}, 1500);
		return () => clearTimeout(timer);
	}, [deleteResult != ""]);

	//Show save changes o descartar cuando se escribe en un
	function showUpdateIcon(event) {
		setUpdateTodo(event.target.value);
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
			<input
				type="button"
				value="Delete All"
				onClick={event => {
					DeleteTodoAll();
				}}
			/>
			{deleteAllResult}
			<ul>
				{todos.map(todoItem => {
					return (
						<li key={todoItem.id}>
							<input
								type="text"
								defaultValue={todoItem.title}
								onChange={showUpdateIcon}
								onKeyDown={event =>
									event.key === "Enter"
										? UpdateTodoItem(
												updateTodo,
												todoItem.id
										  )
										: null
								}
							/>
							<input
								type="button"
								value="Delete"
								onClick={event => {
									DeleteTodoItem(todoItem.id);
								}}
							/>
							{deleteResult}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
