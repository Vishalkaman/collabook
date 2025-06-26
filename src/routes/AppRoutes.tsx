import { Route, Routes } from "react-router-dom";
import NotebookManager from "../components/NotebookManager";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<NotebookManager />} />
            {/* Add more routes here */}
        </Routes>
    );
}