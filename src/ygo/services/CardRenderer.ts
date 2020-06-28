import { Card, Template, Attribute } from "../models";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";

import * as Attributes from "../images/attribute";
import * as Borders from "../images/border";
import * as Stars from "../images/star";

import image from "./ImageCache";
import scratchpad from "./Scratchpads";
import { Variant } from "../models/Level";

function renderName(output: CanvasRenderingContext2D, card: Card): void {
	const nameCanvas = document.createElement("canvas");
	const nameShadowCanvas = document.createElement("canvas");
	nameCanvas.width = nameShadowCanvas.width = 315;
	nameCanvas.height = nameShadowCanvas.height = 48;

	scratchpad({ width: 315, height: 48 });
	scratchpad({ width: 315, height: 48 });
	
	
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
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0.25;
	ctx.shadowOffsetY = 1;
	ctx.drawImage(nameShadowCanvas, 0, 0);
	ctx.restore();




	output.drawImage(nameCanvas, 32, 24);
}

function renderEffect(output: CanvasRenderingContext2D, card: Card): void 
{
	const paragraphs = card.effect.split("\n").map(paragraph => paragraph.split(/\s/g));
	let lines: string[][];
	let fontSize = 16;

	do
	{
		lines = [];
		output.font = `400 ${fontSize}px "Spectral", sans-serif`;
		const spaceMinWidth = output.measureText(" ").width;
		paragraphs.forEach(paragraph => {
			let activeLine: string[] = [];
			let lineWidth = -spaceMinWidth;
			paragraph.forEach(word => 
			{
				const wordWidth = output.measureText(word).width;
				if (lineWidth + spaceMinWidth + wordWidth < 350)
				{
					activeLine.push(word);
					lineWidth += spaceMinWidth + wordWidth;
				}
				else
				{
					lines.push(activeLine);
					activeLine = [word];
					lineWidth = wordWidth;
				}
			});
			lines.push(activeLine);
		});
		fontSize -= 0.5;
	} while (lines.length * fontSize > 75 && fontSize > 2)

	lines.forEach((line, index) => output.fillText(line.join(" "), 35, 475 + ((1 + index) * fontSize)));
}

function renderSerialNumber(output: CanvasRenderingContext2D, card: Card): void {
	
	output.fillText(card.serialNumber, 20, 580);
}

async function renderImage(output: CanvasRenderingContext2D, card: Card): Promise<void> {
	const img = await image(card.image.url);

	const regularArea = { x: 50, y: 110, width: 320, height: 320 };
	const pendulumArea = { x: 30, y: 110, width: 360, height: 360 };
	// TODO: Make the used area depend on whether the card is a pendulum card.
	const area = true ? regularArea : pendulumArea;

	const left   = card.image.region.left   || 0;
	const right  = card.image.region.right  || 0;
	const top    = card.image.region.top    || 0;
	const bottom = card.image.region.bottom || 0;

	output.drawImage(img, 
		left, 
		top, 
		(img.width - left) - right,
		(img.height - top) - bottom,
		area.x, area.y, area.width, area.height);
}

async function renderBorder(output: CanvasRenderingContext2D, card: Card): Promise<void> 
{
	let url: string;
	switch(card.template)
	{
		case Template.NORMAL:  url = Borders.Normal; break;
		case Template.EFFECT:  url = Borders.Effect; break;
		case Template.RITUAL:  url = Borders.Ritual; break;
		case Template.FUSION:  url = Borders.Fusion; break;
		case Template.SYNCHRO: url = Borders.Synchro; break;
		case Template.XYZ:     url = Borders.Xyz; break;
		case Template.LINK:    url = Borders.Link; break;
		case Template.SPELL:   url = Borders.Spell; break;
		case Template.TRAP:    url = Borders.Trap; break;
		case Template.TOKEN:   url = Borders.Token; break;
		default: return; // Prevent unneeded errors.
	}

	output.drawImage(await image(url), 0, 0);

}

async function renderAttribute(output: CanvasRenderingContext2D, card: Card): Promise<void> 
{
	let url: string;
	switch(card.attribute)
	{
		case Attribute.NONE: return; // Nothing to be rendered.

		case Attribute.DARK:   url = Attributes.Dark; break;
		case Attribute.DIVINE: url = Attributes.Divine; break;
		case Attribute.EARTH:  url = Attributes.Earth; break;
		case Attribute.FIRE:   url = Attributes.Fire; break;
		case Attribute.LIGHT:  url = Attributes.Light; break;
		case Attribute.WATER:  url = Attributes.Water; break;
		case Attribute.WIND:   url = Attributes.Wind; break;
		case Attribute.SPELL:  url = Attributes.Spell; break;
		case Attribute.TRAP:   url = Attributes.Trap; break;
	}
	output.drawImage(await image(url), 350, 28, 40, 40);
}

async function renderLevel(output: CanvasRenderingContext2D, card: Card): Promise<void> 
{
	let url: string;
	const { value: level, variant, mirrored } = card.level;
	let leftToRight: boolean;
	switch(variant)
	{
		case Variant.DEFAULT: switch(card.template)
			{
				case Template.DARK_SYNCHRO: url = Stars.Negative; leftToRight = true; break;
				case Template.XYZ:          url = Stars.Xyz;      leftToRight = true; break;
				default:                    url = Stars.Normal;   leftToRight = false; break;
			} 
			break;
		case Variant.NORMAL:       url = Stars.Normal;   leftToRight = false; break;
		case Variant.DARK_SYNCHRO: url = Stars.Negative; leftToRight = true; break;
		case Variant.XYZ:          url = Stars.Xyz;      leftToRight = true; break;
		default: return; // Cannot render anything.
	}

	leftToRight = mirrored ? !leftToRight : leftToRight;
	
	const img = await image(url)
	
	const offset = { x: 43, y: 73 };
	for(let i=0; i < level; ++i)
	{
		if (leftToRight)
		{
			output.drawImage(img, i * img.width + offset.x, offset.y);
		}
		else
		{
			output.drawImage(img, 350 - (i * img.width), offset.y);
		}
	}
}

export async function render(canvas: HTMLCanvasElement | null, card: Card): Promise<void>
{
	if (!canvas) { return; }

	const ctx = canvas.getContext("2d");
	if (!ctx) { return; }

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";

	try { await renderImage(ctx, card); } catch(e) { /* */ }
	try { await renderBorder(ctx, card); } catch(e) { /* */} 
	try { await renderAttribute(ctx, card); } catch(e) { /* */ }
	try { await renderLevel(ctx, card); } catch(e) { /* */ }
	renderName(ctx, card);
	renderEffect(ctx, card);
	renderSerialNumber(ctx, card);

}
