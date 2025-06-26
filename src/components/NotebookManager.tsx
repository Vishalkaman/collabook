import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../src/redux/store";
import {
	createNotebook,
	setActiveNotebook,
	updateFilename,
	saveNotebook,
} from "../../src/redux/notebooksSlice";

const NotebookManager: React.FC = () => {
	const dispatch = useDispatch();
	const notebooks = useSelector((state: RootState) => state.notebooks.notebooks);
	const activeNotebookId = useSelector((state: RootState) => state.notebooks.activeNotebookId);
	const activeNotebook = activeNotebookId ? notebooks[activeNotebookId] : null;

	const [filename, setFilename] = useState(activeNotebook?.filename || "");

	// Sync filename input with active notebook
	useEffect(() => {
		setFilename(activeNotebook?.filename || "");
	}, [activeNotebook]);

	const handleFilenameChange = () => {
		if (activeNotebookId && filename.trim()) {
			dispatch(updateFilename({ notebookId: activeNotebookId, filename }));
		}
	};

	const handleSave = () => {
		if (activeNotebookId) {
			dispatch(saveNotebook({ notebookId: activeNotebookId }));
		}
	};

	const createNewNotebook = () => {
		const id = Math.random().toString(36).substr(2, 9); // Use uuid in production
		dispatch(
			createNotebook({
				id,
				filename: `Untitled Notebook ${Object.keys(notebooks).length + 1}`,
			})
		);
	};

	const formatCheckpoint = (timestamp: string | null) => {
		if (!timestamp) return "Never saved";
		return new Date(timestamp).toLocaleString("en-IN", {
			timeZone: "Asia/Kolkata",
			dateStyle: "medium",
			timeStyle: "short",
		});
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Notebook Manager</h1>
			<div className="flex gap-2 mb-4">
				<button
					className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
					onClick={createNewNotebook}
				>
					New Notebook
				</button>
				{Object.values(notebooks).map((notebook) => (
					<button
						key={notebook.id}
						className={`px-4 py-2 rounded ${
							activeNotebookId === notebook.id
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-800"
						}`}
						onClick={() => dispatch(setActiveNotebook(notebook.id))}
					>
						{notebook.filename}
					</button>
				))}
			</div>
			{activeNotebook && (
				<div className="border rounded p-4">
					<div className="flex flex-col gap-2 mb-4">
						<label className="font-semibold">Notebook Filename:</label>
						<input
							type="text"
							className="p-2 border rounded w-full"
							value={filename}
							onChange={(e) => setFilename(e.target.value)}
							onBlur={handleFilenameChange}
						/>
					</div>
					<div className="flex gap-2 items-center mb-4">
						<button
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
							onClick={handleSave}
						>
							Save Notebook
						</button>
						<span className="text-gray-600">
							Last saved: {formatCheckpoint(activeNotebook.lastCheckpoint)}
						</span>
					</div>
				</div>
			)}
			{!activeNotebook && (
				<p className="text-gray-500">Create or select a notebook to start.</p>
			)}
		</div>
	);
};

export default NotebookManager;
