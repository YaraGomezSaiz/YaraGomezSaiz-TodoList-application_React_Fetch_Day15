import React, { useState, useEffect } from "react";
import InputText from "./inputText.jsx";
import Task from "./task.jsx";
import setTimeout_useEffect from "../setTimeout";

//create your first component
export function Home() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
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

	// CREAR UNA NUEVA TAREA

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

	//method: PUT para actualizar un elemento

	function UpdateTodoItem(todoItem) {
		fetch(BaseURL + "todos/" + todoItem.id, {
			method: "PUT",
			body: JSON.stringify({
				id: todoItem.id,
				title: todoItem.title,
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

	//FUNCION BORRADO UN ITEM INDIVIDUAL

	function deleteTodoItem(id) {
		let arrayCopy = [...todos];
		fetch(BaseURL + "todos/" + id, {
			method: "DELETE"
		}).then(response => {
			if (response.ok) {
				findDeleteItem(id, arrayCopy);
				setDeleteResult("Task " + id + " has been deleted");
			} else {
				setDeleteResult("Unable to delete task " + id);
			}
		});
	}

	//FUNCION BORRADO TODO EL ARRAY
	async function DeleteTodoAll() {
		let arrayCopy = [...todos];
		let id_errors = [];
		let id = 0;
		let url = "";
		let fetch_obj = { method: "DELETE" };

		if (todos.length > 0) {
			for (let i = 0; i < todos.length; i++) {
				id = todos[i].id;
				let itemsLeft = 0;
				url = BaseURL + "todos/" + id;
				let response = await fetch(url, fetch_obj);
				if (!response.ok) {
					id_errors[i] = id;
				} else {
					itemsLeft = todos.length - i;
					setDeleteAllResult(itemsLeft + " Items left");
					findDeleteItem(id, arrayCopy);
				}
			}

			if (todos.length === 0) {
				setDeleteAllResult(" All items have been deleted");
			} else {
				setDeleteAllResult(" Delete failed");
			}
		} else {
			setDeleteAllResult(" List empty");
		}
	}

	//funcion que busca un id en el array y lo borra
	function findDeleteItem(id, arrayCopy) {
		let arrayPos = arrayCopy.findIndex(item => item.id === id);
		arrayCopy.splice(arrayPos, 1);
		setTodos(arrayCopy);
	}

	//LLAMADA A funcion setTimeout

	//setTimeout_useEffect(setDeleteAllResult, 1500);

	return (
		<div>
			<div>
				<InputText inputTask={CreateTodoItem} />
				<input
					className="deleteAllButton"
					type="button"
					value="Delete All"
					onClick={event => {
						DeleteTodoAll();
					}}
				/>
				{deleteAllResult}
			</div>
			<ul>
				{todos.map(todoItem => {
					return (
						<Task
							key={todoItem.id}
							Item={todoItem}
							deleteItem={deleteTodoItem}
							saveChanges={UpdateTodoItem}
						/>
					);
				})}
			</ul>
		</div>
	);
}
