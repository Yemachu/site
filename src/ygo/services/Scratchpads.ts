const scratchpads: { [key: string]: HTMLCanvasElement } = {};

export default function Scratchpad({width, height}: { width: number; height: number }): CanvasRenderingContext2D | null
{
	width = width | 0;
	height = height | 0;

	const id = `${width}×${height}`;
	let scratchpad = scratchpads[id];
	if (!scratchpad)
	{
		scratchpad = scratchpads[id] = document.createElement("canvas");
		scratchpad.width = width;
		scratchpad.height = height;
	}
	const ctx = scratchpad.getContext("2d");
	if (!ctx) { return null; }
	ctx.clearRect(0, 0, width, height);
	return ctx;
}