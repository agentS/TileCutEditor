import React from "react";
import { Graphics } from "@inlet/react-pixi";

export const INVALID_COORDINATE_VALUE = (-1);

export interface LineProperties {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	colour: number;
}

export class Line extends React.Component<LineProperties, {}> {
	protected draw(line: any) {
		line.lineStyle(4, this.props.colour, 1);
		line.moveTo(this.props.startX, this.props.startY);
		line.lineTo(this.props.endX, this.props.endY);
	}

	render() {
		return (
			<Graphics draw={(graphics) => this.draw(graphics)} />
		);
	}
};
