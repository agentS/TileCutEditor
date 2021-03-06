import React from "react";

interface LineTypePickerProperties {
	onLineTypeSelected: (lineType: LineType) => void;
}

export enum LineType {
	GLASSED,
	DOUBLY_GLASSED,
	MITRE_CUT,
};

function LineTypePicker(properties: LineTypePickerProperties) {
	const selectLineType = (lineType: LineType) => {
		properties.onLineTypeSelected(lineType);
	}

	return (
		<div>
			<input
				type="radio" name="rbLineType" id="rbLineTypeGlassed"
				defaultChecked={true}
				onChange={() => selectLineType(LineType.GLASSED)}
			/>
			<label htmlFor="rbLineTypeGlassed">X (Kante ├╝berglasiert)</label>
			<input
				type="radio" name="rbLineType" id="rbLineTypeDoublyGlassed"
				onChange={() => selectLineType(LineType.DOUBLY_GLASSED)}
			/>
			<label htmlFor="rbLineTypeDoublyGlassed">XX (Kante ├╝berglasiert + hinten ├╝berglasiert)</label>
			<input
				type="radio" name="rbLineType" id="rbLineTypeMitreCut"
				onChange={() => selectLineType(LineType.MITRE_CUT)}
			/>
			<label htmlFor="rbLineTypeMitreCut">Z (Gehrungsschnitt)</label>
		</div>
	);
}

export default LineTypePicker;
