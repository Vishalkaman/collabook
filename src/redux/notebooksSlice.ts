import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { INotebook, INotebookCell } from "../types/notebook";

interface NotebooksState {
	notebook: INotebook;
	selectedCellId: string | null;
}

const initialState: NotebooksState = {
	notebook: {
		cells: [],
	},
	selectedCellId: null,
};

const notebooksSlice = createSlice({
	name: "notebooks",
	initialState,
	reducers: {
		setNotebook(state, action: PayloadAction<INotebook>) {
			state.notebook = action.payload;
		},
		selectCell(state, action: PayloadAction<string>) {
			state.selectedCellId = action.payload;
		},
		addCellAbove(state, action: PayloadAction<string>) {
			const index = state.notebook.cells.findIndex((c) => c.id === action.payload);
			if (index !== -1) {
				const newCell: INotebookCell = {
					id: crypto.randomUUID(),
					cell_type: "code",
					execution_count: null,
					source: [""],
					outputs: [],
				};
				state.notebook.cells.splice(index, 0, newCell);
			}
		},
		addCellBelow(state, action: PayloadAction<string>) {
			const index = state.notebook.cells.findIndex((c) => c.id === action.payload);
			if (index !== -1) {
				const newCell: INotebookCell = {
					id: crypto.randomUUID(),
					cell_type: "code",
					execution_count: null,
					source: [""],
					outputs: [],
				};
				state.notebook.cells.splice(index + 1, 0, newCell);
			}
		},
		deleteCell(state, action: PayloadAction<string>) {
			state.notebook.cells = state.notebook.cells.filter((c) => c.id !== action.payload);
		},
		moveCell(state, action: PayloadAction<{ id: string; direction: "up" | "down" }>) {
			const index = state.notebook.cells.findIndex((c) => c.id === action.payload.id);
			const targetIndex = action.payload.direction === "up" ? index - 1 : index + 1;
			if (index !== -1 && targetIndex >= 0 && targetIndex < state.notebook.cells.length) {
				const [movedCell] = state.notebook.cells.splice(index, 1);
				state.notebook.cells.splice(targetIndex, 0, movedCell);
			}
		},
		duplicateCell(state, action: PayloadAction<string>) {
			const index = state.notebook.cells.findIndex((c) => c.id === action.payload);
			if (index !== -1) {
				const cellToCopy = state.notebook.cells[index];
				const newCell = { ...cellToCopy, id: crypto.randomUUID() };
				state.notebook.cells.splice(index + 1, 0, newCell);
			}
		},
		updateCellSource(state, action: PayloadAction<{ id: string; source: string[] }>) {
			const cell = state.notebook.cells.find((c) => c.id === action.payload.id);
			if (cell) {
				cell.source = action.payload.source;
			}
		},
	},
});

export const {
	setNotebook,
	selectCell,
	addCellAbove,
	addCellBelow,
	deleteCell,
	moveCell,
	duplicateCell,
	updateCellSource,
} = notebooksSlice.actions;

export default notebooksSlice.reducer;
