import { Route, Routes } from "react-router-dom";
import NotebookManager from "../components/NotebookManager";
import NotebookView from "../components/NotebookView";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<NotebookManager />} />
			<Route path="/notebookview" element={<NotebookView />} />
			{/* Add more routes here */}
		</Routes>
	);
}
