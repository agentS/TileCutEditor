import React from "react";

import TileEditor from "./editor/TileEditor";
import LineTypePicker, { LineType } from "./editor/LineTypePicker";

interface ApplicationProperties {};

interface ApplicationState {
	currentLineColour: number;
};

class App extends React.Component<ApplicationProperties, ApplicationState> {
	constructor(properties: ApplicationProperties) {
		super(properties);
		this.state = { currentLineColour: 0x2222DD };
	}

	onLineTypeSelected(lineType: LineType) {
		switch (lineType) {
			case LineType.GLASSED:
				this.setState({
					currentLineColour: 0x2222DD
				});
				break;
			case LineType.DOUBLY_GLASSED:
				this.setState({
					currentLineColour: 0xDD2222
				});
				break;
			case LineType.MITRE_CUT:
				this.setState({
					currentLineColour: 0x22DD22
				});
				break;
		}
	}

	render() {
		return (
			<div>
				<h1>PixiJS Demo</h1>

				<LineTypePicker onLineTypeSelected={lineType => this.onLineTypeSelected(lineType)} />
				<TileEditor currentLineColour={this.state.currentLineColour} />
			</div>
		);
	}
}

export default App;
