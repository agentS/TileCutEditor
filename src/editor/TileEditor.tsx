import React from "react";
import update from "immutability-helper";

import { Stage, Sprite } from "@inlet/react-pixi";
import { InteractionEvent } from "pixi.js";

import { Line, LineProperties, INVALID_COORDINATE_VALUE } from "../shapes/Line";
import { PreviewLine } from "../shapes/PreviewLine";

interface TileEditorProperties {
	currentLineColour: number;
};

interface TileEditorState {
	lineCoordinates: Array<LineProperties>;
	lineStarted: boolean;
	startX: number;
	startY: number;
	previewLineCoordinates: LineProperties;
};

class TileEditor extends React.Component<TileEditorProperties, TileEditorState> {
	constructor(properties: TileEditorProperties) {
		super(properties);
		this.state = {
			lineCoordinates: [],
			lineStarted: false,
			startX: INVALID_COORDINATE_VALUE,
			startY: INVALID_COORDINATE_VALUE,
			previewLineCoordinates: {
				startX: INVALID_COORDINATE_VALUE,
				startY: INVALID_COORDINATE_VALUE,
				endX: INVALID_COORDINATE_VALUE,
				endY: INVALID_COORDINATE_VALUE,
				colour: this.props.currentLineColour,
			},
		};
	}

	drawLine(clickEvent: InteractionEvent) {
		if (this.state.lineStarted === false) {
			this.setState({
				lineStarted: true,
				startX: clickEvent.data.global.x,
				startY: clickEvent.data.global.y,
				previewLineCoordinates: update(this.state.previewLineCoordinates, {
					startX: { $set: clickEvent.data.global.x },
					startY: { $set: clickEvent.data.global.y },
					endX: { $set: INVALID_COORDINATE_VALUE },
					endY: { $set: INVALID_COORDINATE_VALUE },
				})
			});
		} else {
			this.setState({
				lineStarted: false,
				lineCoordinates: update(this.state.lineCoordinates, {
					$push: [{
						startX: this.state.startX,
						startY: this.state.startY,
						endX: clickEvent.data.global.x,
						endY: clickEvent.data.global.y,
						colour: this.props.currentLineColour,
					}]
				}),
				startX: INVALID_COORDINATE_VALUE,
				startY: INVALID_COORDINATE_VALUE,
				previewLineCoordinates: update(this.state.previewLineCoordinates, {
					startX: { $set: INVALID_COORDINATE_VALUE },
					startY: { $set: INVALID_COORDINATE_VALUE },
					endX: { $set: INVALID_COORDINATE_VALUE },
					endY: { $set: INVALID_COORDINATE_VALUE },
				})
			});
		}
	}

	drawPreviewLine(event: InteractionEvent) {
		if (this.state.lineStarted === true) {
			this.setState({
				previewLineCoordinates: update(this.state.previewLineCoordinates, {
					endX: { $set: event.data.global.x },
					endY: { $set: event.data.global.y },
				})
			});
		}
	}

	render() {
		return (
			<Stage width={640} height={640}>
				<Sprite
					width={640} height={640}
					click={(clickEvent) => this.drawLine(clickEvent)}
					mousemove={(mouseMoveEvent) => this.drawPreviewLine(mouseMoveEvent)}
					interactive={true}
					image="https://a.1stdibscdn.com/archivesE/upload/10384/21_15/2336782/2336782_l.jpeg" x={0} y={0}>
				</Sprite>
				{
					this.state.lineCoordinates.map((line, index) => (
						<Line
							startX={line.startX} startY={line.startY}
							endX={line.endX} endY={line.endY}
							colour={line.colour}
							key={`line${index}`}
						/>
					))
				}
				{
					this.state.lineStarted
						&& this.state.previewLineCoordinates.endX !== INVALID_COORDINATE_VALUE
						&& this.state.previewLineCoordinates.endY !== INVALID_COORDINATE_VALUE
					? <PreviewLine
						startX={this.state.previewLineCoordinates.startX} startY={this.state.previewLineCoordinates.startY}
						endX={this.state.previewLineCoordinates.endX} endY={this.state.previewLineCoordinates.endY}
						colour={this.props.currentLineColour}
						key="previewLine"
					/>
					: <PreviewLine
						startX={0} startY={0}
						endX={0} endY={0}
						colour={this.props.currentLineColour}
						key="previewLine"
					/>
				}
			</Stage>
		);
	}
}

export default TileEditor;
