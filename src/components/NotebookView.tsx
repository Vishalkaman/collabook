import React from "react";
import { useAppSelector } from "../redux/store";
import NotebookCell from "./NotebookCell";

const NotebookView: React.FC = () => {
	const cells = useAppSelector((state) => state.notebooks.notebook.cells);

	return (
		<div className="p-4 max-w-4xl mx-auto">
			{cells.map((cell) => (
				<NotebookCell key={cell.id} cell={cell} />
			))}
		</div>
	);
};

export default NotebookView;
