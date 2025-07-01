import { Route, Routes } from "react-router-dom";
import NotebookManager from "../components/NotebookManager";
import NotebookView from "../components/NotebookView";
import TestView from "../components/Notebook/TestView";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<NotebookManager />} />
			<Route path="/notebookview" element={<NotebookView />} />
			<Route path="/test_view" element={<TestView />} />
			{/* Add more routes here */}
		</Routes>
	);
}
