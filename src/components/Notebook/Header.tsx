import React from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store";

const Header: React.FC = () => {
	// const { filename, lastCheckpoint } = useSelector((state: RootState) => state.notebooks);
	const [filename, setFilename] = React.useState("Untitled.ipynb");
	const [lastCheckpoint, setLastCheckpoint] = React.useState("2023-01-01");

	return (
		<div className="w-full flex items-center justify-start gap-10 px-16 py-2 bg-[#c0c9ee] shadow-sm">
			{/* Logo and Name */}
			<div className="relative flex items-center w-[117px] h-[40px] shrink-0">
				{/* Icon */}
				<div className="w-[40px] h-[40px] bg-[#a2aadb]"></div>

				{/* Name */}
				<div className="absolute left-[56px] top-[11.5px] text-sm font-normal text-black font-[sourcesanspro]">
					Collabook
				</div>
			</div>

			{/* Filename */}
			<div className="text-xs font-normal text-black text-center">{filename}</div>

			{/* Last Checkpoint */}
			<div className="text-xs font-normal text-black">Last CheckPoint: {lastCheckpoint}</div>
		</div>
	);
};

export default Header;
