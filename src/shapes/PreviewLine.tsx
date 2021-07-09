import { Line } from "./Line";

export class PreviewLine extends Line {
	protected draw(line: any) {
		line.clear();
		super.draw(line);
	}
};
