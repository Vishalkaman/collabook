import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { setNotebook } from "../redux/notebooksSlice";
import example from "./example.json";
import NotebookView from "./NotebookView";

import type { INotebook } from "../types/notebook";

const NotebookManager: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setNotebook(example as INotebook));
	}, [dispatch]);

	return (
		<div className="bg-white min-h-screen py-8">
			<NotebookView />
		</div>
	);
};

export default NotebookManager;
