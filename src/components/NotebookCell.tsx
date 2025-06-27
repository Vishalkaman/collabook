import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import type { NotebookCell as NotebookCellType } from "../types/notebook";
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
import { Button, IconButton } from "@mui/material";
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
					<IconButton size="small" onClick={() => dispatch(addCellAbove(cell.id))}>
						<AddIcon fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => dispatch(addCellBelow(cell.id))}>
						<AddIcon fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						onClick={() => dispatch(moveCell({ id: cell.id, direction: "up" }))}
					>
						<ArrowUpwardIcon fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						onClick={() => dispatch(moveCell({ id: cell.id, direction: "down" }))}
					>
						<ArrowDownwardIcon fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => dispatch(duplicateCell(cell.id))}>
						<FileCopyIcon fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={() => dispatch(deleteCell(cell.id))}>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</div>
			)}
		</div>
	);
};

export default NotebookCell;
