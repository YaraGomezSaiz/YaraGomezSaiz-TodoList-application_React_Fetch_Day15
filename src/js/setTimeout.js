import React, { useState, useEffect } from "react";

export default function setTimeout_useEffect(text, time) {
	let change;
	if (text != "") {
		change = 1;
	} else {
		change = 0;
	}
	// despues de borrar se muestra un mensaje que desaparece al 1,5seg
	useEffect(() => {
		const timer = setTimeout(() => {
			text("");
		}, time);
		return () => clearTimeout(timer);
	}, [change]);
	return text;
}
