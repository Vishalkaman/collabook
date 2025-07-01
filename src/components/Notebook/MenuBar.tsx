import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const dropdownItems = {
	View: ["Toggle Sidebar", "Show Line Numbers", "Zen Mode"],
	Edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
	Run: ["Run Cell", "Run All Cells", "Restart and Run All"],
	Kernel: ["Restart", "Interrupt", "Reconnect"],
	Settings: ["Theme", "Font Size", "Auto Save"],
	Help: ["Documentation", "Keyboard Shortcuts", "About"],
};

const MenuBar: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [activeMenu, setActiveMenu] = useState<string | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>, menu: string) => {
		if (activeMenu === menu) {
			// Toggle off if the same menu is clicked again
			setAnchorEl(null);
			setActiveMenu(null);
		} else {
			setAnchorEl(event.currentTarget);
			setActiveMenu(menu);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
		setActiveMenu(null);
	};

	return (
		<div className="left-0 w-full bg-[#a2aadb] flex gap-2 px-16 py-1">
			{Object.keys(dropdownItems).map((menu) => (
				<div key={menu}>
					<Button
						onClick={(e) => handleClick(e, menu)}
						className="normal-case min-w-[44px] p-1 transition-colors duration-200"
						sx={{
							color: "black",
							fontSize: "12px",
							backgroundColor: activeMenu === menu ? "#c0c9ee" : "transparent",
							"&:hover": {
								backgroundColor: "#c0c9ee",
							},
							fontFamily: "sourcesanspro",
						}}
					>
						{menu}
					</Button>

					<Menu
						anchorEl={anchorEl}
						open={activeMenu === menu}
						onClose={handleClose}
						anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
						transformOrigin={{ vertical: "top", horizontal: "left" }}
						slotProps={{
							list: {
								sx: {
									fontFamily: "sourcesanspro",
									fontSize: "13px",
								},
							},
						}}
					>
						{dropdownItems[menu as keyof typeof dropdownItems].map((item, idx) => (
							<MenuItem key={idx} onClick={handleClose}>
								{item}
							</MenuItem>
						))}
					</Menu>
				</div>
			))}
		</div>
	);
};

export default MenuBar;
