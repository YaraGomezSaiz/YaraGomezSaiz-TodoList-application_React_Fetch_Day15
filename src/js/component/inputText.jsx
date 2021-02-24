import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function InputText(props) {
	const [inputValue, setInputValue] = useState("");
	const [inputTask, setInputTask] = useState("");

	function saveInputValue(text) {
		setInputTask(text);
		props.inputTask(text);
	}

	return (
		<div>
			<input
				className="newTask"
				type="text"
				placeholder="Introduce new task"
				onChange={event => setInputValue(event.target.value)}
				onKeyDown={event =>
					event.key === "Enter" ? saveInputValue(inputValue) : null
				}
			/>
		</div>
	);
}

InputText.propTypes = {
	inputTask: PropTypes.func
};
