import React from "react";

import Header from "./Header";
import MenuBar from "./MenuBar";
import ToolBar from "./ToolBar";

const TestView: React.FC = () => {
	return (
		<div>
			<Header />
			<MenuBar />
			<ToolBar />
		</div>
	);
};

export default TestView;
