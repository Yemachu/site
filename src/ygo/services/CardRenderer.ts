import { Card } from "../models";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";



function renderName(output: CanvasRenderingContext2D, card: Card): void {
	const nameCanvas = document.createElement("canvas");
	const nameShadowCanvas = document.createElement("canvas");
	nameCanvas.width = nameShadowCanvas.width = 315;
	nameCanvas.height = nameShadowCanvas.height = 48;
	
	const ctx = nameCanvas.getContext("2d");
	if (!ctx) { return; }
	
	const innerShadow = nameShadowCanvas.getContext("2d");
	if (!innerShadow) { return; }

	ctx.font = innerShadow.font = "600 32px \"Spectral SC\", sans-serif";

	const text = card.name;
	const width = ctx.measureText(text).width;

	ctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

	ctx.save();
	ctx.scale(Math.min(nameShadowCanvas.width / Math.max(width, 1), 1), 1);
	ctx.fillText(text, 0, 32);
	ctx.restore();
	
	innerShadow.save();
	innerShadow.fillRect(0, 0, nameShadowCanvas.width, nameShadowCanvas.height);
	innerShadow.globalCompositeOperation = "xor";
	innerShadow.scale(Math.min(nameShadowCanvas.width / Math.max(width, 1), 1), 1);
	innerShadow.fillText(text, 0, 32);
	innerShadow.restore();


	const gradient = ctx.createLinearGradient(0, 0, 0, nameCanvas.height);
	//gradient.addColorStop(0, "#666");
	gradient.addColorStop(0.33, "#ddd");
	gradient.addColorStop(1, "#333");

	ctx.save();
	ctx.globalCompositeOperation = "source-atop";
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, nameCanvas.width, nameCanvas.height);
	ctx.shadowColor = "rgba(0,0,0,0.5)";
	ctx.shadowBlur = 1;
	ctx.shadowOffsetX = 0.25;
	ctx.shadowOffsetY = 1;
	ctx.drawImage(nameShadowCanvas, 0, 0);
	ctx.restore();

	output.drawImage(nameCanvas, 32, 24);
}

function renderEffect(output: CanvasRenderingContext2D, card: Card): void {
	const effectCanvas = document.createElement("canvas");
	
	const ctx = effectCanvas.getContext("2d");
	if (!ctx) { return; }

	output.drawImage(effectCanvas, 32, 400);
}

export function render(canvas: HTMLCanvasElement | null, card: Card): void
{
	if (!canvas) { return; }

	const ctx = canvas.getContext("2d");
	if (!ctx) { return; }


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#d46427";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	renderName(ctx, card);

	ctx.fillText(card.serialNumber, 0, 320);
	//ctx.fillText(card.effect, 0, 48);

	for (let level = 0; level < card.level.value; ++level) {
		ctx.beginPath()
		ctx.ellipse(level * 28 + 43, 73, 14, 12, 0, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}
