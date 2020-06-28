import { Card, Template, Attribute } from "../models";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";

import Xyz from "./Xyz.png";
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

function renderEffect(output: CanvasRenderingContext2D, card: Card): void {
	const effectCanvas = document.createElement("canvas");
	
	const ctx = effectCanvas.getContext("2d");
	if (!ctx) { return; }

	output.drawImage(effectCanvas, 32, 400);
}

function renderSerialNumber(output: CanvasRenderingContext2D, card: Card): void {
	
	output.fillText(card.serialNumber, 0, 320);
}

async function renderImage(output: CanvasRenderingContext2D, card: Card): Promise<void> {
	const img = await image(card.image.url);


	output.drawImage(img, 
		card.image.region.x || 0, 
		card.image.region.y || 0, 
		img.width - (card.image.region.width || 0),
		img.height - (card.image.region.height || 0),
		48, 128, 320, 320);
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
	output.drawImage(await image(url), 0, 0);
}

async function renderLevel(output: CanvasRenderingContext2D, card: Card): Promise<void> 
{
	let url: string;
	const { value: level, variant, mirrored } = card.level;
	switch(variant)
	{
		case Variant.DEFAULT: switch(card.template)
			{
				case Template.DARK_SYNCHRO: url = Stars.Negative; break;
				case Template.XYZ:          url = Stars.Xyz; break;
				default:                    url = Stars.Normal; break;
			} 
			break;
		case Variant.NORMAL:       url = Stars.Normal; break;
		case Variant.DARK_SYNCHRO: url = Stars.Negative; break;
		case Variant.XYZ:          url = Stars.Xyz; break;
		default: return; // Cannot render anything.
	}
	
	const img = await image(url)
	for(let i=0; i < level; ++i)
	{
		output.drawImage(img, i * 28 + 43, 73);
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
