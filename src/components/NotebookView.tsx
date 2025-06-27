/*
This is a dummy file.. used for just testing the example notebook
*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import Markdown from "react-markdown";
import notebookData from "./example.json";

import type { Notebook } from "../types/notebook";

// interface NotebookOutput {
// 	output_type: "stream" | "execute_result" | "error";
// 	data: string[];
// }

// interface NotebookCell {
// 	cell_type: "code" | "markdown";
// 	id: string;
// 	execution_count: number | null;
// 	source: string[];
// 	outputs: NotebookOutput[];
// }

// interface Notebook {
// 	cells: NotebookCell[];
// }

const NotebookView: React.FC = () => {
	const navigate = useNavigate();
	const notebook: Notebook = notebookData as Notebook;

	const handleBack = () => {
		navigate("/");
	};

	return (
		<Box sx={{ p: 4, maxWidth: 1200, mx: "auto", bgcolor: "#FFF2E0" }}>
			<Box sx={{ mb: 2 }}>
				<Button
					variant="contained"
					onClick={handleBack}
					sx={{ bgcolor: "#898AC4", "&:hover": { bgcolor: "#A2AADB" } }}
				>
					Back to Explorer
				</Button>
			</Box>
			{notebook.cells.map((cell) => (
				<Box
					key={cell.id}
					sx={{
						mb: 2,
						border: "1px solid #A2AADB",
						borderRadius: 1,
						p: 2,
						bgcolor: "#C0C9EE",
					}}
				>
					{cell.cell_type === "code" ? (
						<>
							<Typography variant="caption" sx={{ fontFamily: "monospace" }}>
								In [{cell.execution_count || 0}]:
							</Typography>
							<TextField
								fullWidth
								multiline
								value={cell.source.join("\n")}
								InputProps={{ readOnly: true }}
								variant="outlined"
								sx={{
									mt: 1,
									mb: 1,
									"& .MuiInputBase-root": {
										fontFamily: "monospace",
										bgcolor: "#FFF2E0",
									},
								}}
							/>
							{cell.outputs.length > 0 && (
								<Box sx={{ mt: 1 }}>
									{cell.outputs.map((output, index) => (
										<Box key={index}>
											{output.output_type === "execute_result" && (
												<Typography
													variant="caption"
													sx={{ fontFamily: "monospace" }}
												>
													Out [{cell.execution_count}]:
												</Typography>
											)}
											<pre
												style={{
													fontFamily: "monospace",
													color:
														output.output_type === "error"
															? "#d32f2f"
															: "inherit",
													backgroundColor:
														output.output_type === "error"
															? "#ffebee"
															: "transparent",
													padding:
														output.output_type === "error"
															? "8px"
															: "0",
													borderRadius:
														output.output_type === "error"
															? "4px"
															: "0",
													margin: 0,
												}}
											>
												{output.data.join("\n")}
											</pre>
										</Box>
									))}
								</Box>
							)}
						</>
					) : (
						<Box
							sx={{
								fontFamily: "monospace",
								bgcolor: "#FFF2E0",
								p: 2,
								borderRadius: 1,
							}}
						>
							<Markdown>{cell.source.join("\n")}</Markdown>
						</Box>
					)}
				</Box>
			))}
		</Box>
	);
};

export default NotebookView;
