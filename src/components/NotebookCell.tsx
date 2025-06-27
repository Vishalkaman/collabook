import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import type { INotebookCell as NotebookCellType } from "../types/notebook";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import {
	selectCell,
	updateCellSource,
	deleteCell,
	addCellAbove,
	addCellBelow,
	moveCell,
	duplicateCell,
} from "../redux/notebooksSlice";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";

interface Props {
	cell: NotebookCellType;
}

const NotebookCell: React.FC<Props> = ({ cell }) => {
	const dispatch = useAppDispatch();
	const selectedId = useAppSelector((state) => state.notebooks.selectedCellId);
	const isSelected = selectedId === cell.id;

	const handleSourceChange = (value: string) => {
		dispatch(updateCellSource({ id: cell.id, source: [value] }));
	};

	return (
		<div
			className={`border rounded-2xl p-2 my-3 shadow transition-all duration-300 ${
				isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
			}`}
			onClick={() => dispatch(selectCell(cell.id))}
		>
			<div className="mb-2">
				<CodeMirror
					value={cell.source.join("\n")}
					theme={vscodeDark}
					extensions={
						cell.cell_type === "markdown"
							? [markdown({ base: markdownLanguage })]
							: [javascript()]
					}
					onChange={handleSourceChange}
					basicSetup={{ lineNumbers: true }}
				/>
			</div>

			{isSelected && (
				<div className="flex flex-wrap gap-2 mt-2">
					<Tooltip title="Add cell above">
						<IconButton size="small" onClick={() => dispatch(addCellAbove(cell.id))}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Add cell below">
						<IconButton size="small" onClick={() => dispatch(addCellBelow(cell.id))}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Move up">
						<IconButton
							size="small"
							onClick={() => dispatch(moveCell({ id: cell.id, direction: "up" }))}
						>
							<ArrowUpwardIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Move down">
						<IconButton
							size="small"
							onClick={() => dispatch(moveCell({ id: cell.id, direction: "down" }))}
						>
							<ArrowDownwardIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Duplicate cell">
						<IconButton size="small" onClick={() => dispatch(duplicateCell(cell.id))}>
							<FileCopyIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete cell">
						<IconButton size="small" onClick={() => dispatch(deleteCell(cell.id))}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</div>
			)}

			{cell.outputs.length > 0 && (
				<div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono text-gray-800">
					{cell.outputs.map((output, idx) => (
						<div key={idx} className="mb-1">
							{output.output_type === "error" && (
								<div className="text-red-500">{output.data.join("\n")}</div>
							)}
							{output.output_type !== "error" && <div>{output.data.join("\n")}</div>}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default NotebookCell;

// import React from "react";
// import { useAppDispatch, useAppSelector } from "../redux/store";
// import type { INotebookCell as NotebookCellType } from "../types/notebook";
// import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
// import { javascript } from "@codemirror/lang-javascript";
// import {
// 	selectCell,
// 	updateCellSource,
// 	deleteCell,
// 	addCellAbove,
// 	addCellBelow,
// 	moveCell,
// 	duplicateCell,
// } from "../redux/notebooksSlice";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FileCopyIcon from "@mui/icons-material/FileCopy";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import AddIcon from "@mui/icons-material/Add";

// interface Props {
// 	cell: NotebookCellType;
// }

// const NotebookCell: React.FC<Props> = ({ cell }) => {
// 	const dispatch = useAppDispatch();
// 	const selectedId = useAppSelector((state) => state.notebooks.selectedCellId);
// 	const isSelected = selectedId === cell.id;

// 	const handleSourceChange = (value: string) => {
// 		dispatch(updateCellSource({ id: cell.id, source: [value] }));
// 	};

// 	return (
// 		<div
// 			className={`border rounded-2xl p-2 my-3 shadow transition-all duration-300 ${
// 				isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
// 			}`}
// 			onClick={() => dispatch(selectCell(cell.id))}
// 		>
// 			<div className="mb-2">
// 				<CodeMirror
// 					value={cell.source.join("\n")}
// 					theme={vscodeDark}
// 					extensions={
// 						cell.cell_type === "markdown"
// 							? [markdown({ base: markdownLanguage })]
// 							: [javascript()]
// 					}
// 					onChange={handleSourceChange}
// 					basicSetup={{ lineNumbers: true }}
// 				/>
// 			</div>

// 			{isSelected && (
// 				<div className="flex flex-wrap gap-2 mt-2">
// 					<IconButton size="small" onClick={() => dispatch(addCellAbove(cell.id))}>
// 						<AddIcon fontSize="small" />
// 					</IconButton>
// 					<IconButton size="small" onClick={() => dispatch(addCellBelow(cell.id))}>
// 						<AddIcon fontSize="small" />
// 					</IconButton>
// 					<IconButton
// 						size="small"
// 						onClick={() => dispatch(moveCell({ id: cell.id, direction: "up" }))}
// 					>
// 						<ArrowUpwardIcon fontSize="small" />
// 					</IconButton>
// 					<IconButton
// 						size="small"
// 						onClick={() => dispatch(moveCell({ id: cell.id, direction: "down" }))}
// 					>
// 						<ArrowDownwardIcon fontSize="small" />
// 					</IconButton>
// 					<IconButton size="small" onClick={() => dispatch(duplicateCell(cell.id))}>
// 						<FileCopyIcon fontSize="small" />
// 					</IconButton>
// 					<IconButton size="small" onClick={() => dispatch(deleteCell(cell.id))}>
// 						<DeleteIcon fontSize="small" />
// 					</IconButton>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default NotebookCell;
