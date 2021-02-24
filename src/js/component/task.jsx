import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import setTimeout_useEffect from "../setTimeout";

//  FUNCION QUE GENERA CADA TAREA DE FORMA INDEPENDIENTE

export default function Task(props) {
	const [inputUpdateValue, setInputUpdateValue] = useState(props.Item.title);
	const [comments, setComments] = useState("");

	let showUpdateButton = false;

	//Se comprueba si el valor de la tarea ha variado para mostrar botones "save" & "discard"
	if (props.Item.title != inputUpdateValue) {
		showUpdateButton = true;
	} else {
		showUpdateButton = false;
	}

	// Al guardar cambios se introduce el nuevo titulo en el objeto y se llama
	//a la funcion del componenete home "UpdateTodoItem" para actualizarlo en el array
	function saveTaskChanges() {
		let obj = props.Item;
		obj.title = inputUpdateValue;
		props.saveChanges(obj);
		//setComments("Task " + props.Item.id + "has been updated");
	}

	//LLAMADA A funcion setTimeout
	setTimeout_useEffect(setComments, 1500);

	return (
		<li>
			<input
				type="text"
				value={inputUpdateValue}
				onChange={event => setInputUpdateValue(event.target.value)}
			/>
			{showUpdateButton ? (
				<input type="button" value="Save" onClick={saveTaskChanges} />
			) : (
				""
			)}
			{showUpdateButton ? (
				<input
					type="button"
					value="Discard"
					onClick={event => setInputUpdateValue(props.Item.title)}
				/>
			) : (
				""
			)}

			<input
				type="button"
				value="Delete"
				onClick={event => {
					props.deleteItem(props.Item.id);
					setComments("Task " + props.Item.id + " has been deleted");
				}}
			/>
			{comments}
		</li>
	);
}

Task.propTypes = {
	Item: PropTypes.object,
	saveChanges: PropTypes.func,
	deleteItem: PropTypes.func
};
