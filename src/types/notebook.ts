export interface INotebookOutput {
	output_type: "stream" | "execute_result" | "error";
	data: string[];
}

export interface INotebookCell {
	cell_type: "code" | "markdown";
	id: string;
	execution_count: number | null;
	source: string[];
	outputs: INotebookOutput[];
}

export interface INotebook {
	cells: INotebookCell[];
}
