export interface NotebookOutput {
	output_type: "stream" | "execute_result" | "error";
	data: string[];
}

export interface NotebookCell {
	cell_type: "code" | "markdown";
	id: string;
	execution_count: number | null;
	source: string[];
	outputs: NotebookOutput[];
}

export interface Notebook {
	cells: NotebookCell[];
}

