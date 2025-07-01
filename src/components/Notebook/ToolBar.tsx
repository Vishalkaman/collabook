import {
	Save,
	Add,
	ContentCut,
	ContentCopy,
	ContentPaste,
	PlayArrow,
	PauseCircle,
	RestartAlt,
	FastForward,
} from "@mui/icons-material";

export default function ToolBar() {
	const buttons = [
		{ Icon: Save, label: "Save" },
		{ Icon: Add, label: "Add" },
		{ Icon: ContentCut, label: "Cut" },
		{ Icon: ContentCopy, label: "Copy" },
		{ Icon: ContentPaste, label: "Paste" },
		{ Icon: PlayArrow, label: "Run" },
		{ Icon: PauseCircle, label: "Pause" },
		{ Icon: RestartAlt, label: "Restart" },
		{ Icon: FastForward, label: "Next" },
	];

	return (
		<div className="left-0 w-full bg-[#a2aadb] flex items-center gap-4 px-16 py-1 justify-start">
			{buttons.map(({ Icon, label }) => (
				<button
					key={label}
					title={label}
					className="p-1 hover:bg-white/20 rounded transition duration-200"
				>
					<Icon className="text-black" fontSize="medium" />
				</button>
			))}
			<span className="px-4 py-1 text-sm font-medium text-black">Code</span>
		</div>
	);
}
