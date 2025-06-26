import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface Notebook {
  id: string;
  filename: string;
  lastCheckpoint: string | null; // ISO timestamp, e.g., "2025-06-25T13:06:00.000Z"
}

interface NotebookState {
  notebooks: Record<string, Notebook>;
  activeNotebookId: string | null;
}

const initialState: NotebookState = {
  notebooks: {
    default: {
      id: 'default',
      filename: 'Untitled Notebook',
      lastCheckpoint: null,
    },
  },
  activeNotebookId: 'default', // Default notebook for single-notebook use
};

const notebooksSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {
    createNotebook: (state, action: PayloadAction<{ id: string; filename: string }>) => {
      state.notebooks[action.payload.id] = {
        id: action.payload.id,
        filename: action.payload.filename,
        lastCheckpoint: null,
      };
      if (!state.activeNotebookId) {
        state.activeNotebookId = action.payload.id;
      }
    },
    setActiveNotebook: (state, action: PayloadAction<string>) => {
      if (state.notebooks[action.payload]) {
        state.activeNotebookId = action.payload;
      }
    },
    updateFilename: (state, action: PayloadAction<{ notebookId: string; filename: string }>) => {
      const notebook = state.notebooks[action.payload.notebookId];
      if (notebook) {
        notebook.filename = action.payload.filename;
        notebook.lastCheckpoint = new Date().toISOString(); // Update checkpoint on filename change
      }
    },
    saveNotebook: (state, action: PayloadAction<{ notebookId: string }>) => {
      const notebook = state.notebooks[action.payload.notebookId];
      if (notebook) {
        notebook.lastCheckpoint = new Date().toISOString();
      }
    },
    deleteNotebook: (state, action: PayloadAction<string>) => {
      delete state.notebooks[action.payload];
      if (state.activeNotebookId === action.payload) {
        state.activeNotebookId = Object.keys(state.notebooks)[0] || null;
      }
    },
  },
});

export const { createNotebook, setActiveNotebook, updateFilename, saveNotebook, deleteNotebook } =
  notebooksSlice.actions;
export default notebooksSlice.reducer;