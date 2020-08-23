import { Card, Template, Attribute, Rarity } from "../models";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";

import * as Attributes from "../images/attribute";
import * as Borders from "../images/border";
import * as Stars from "../images/star";

import image from "./ImageCache";
import scratchpad from "./Scratchpads";

import { Variant } from "../models/Level";

import { go, CancelationToken } from "../../utils";

async function renderName(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void>
{
	await go(Promise.resolve(), cancel);

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

	ctx.font = innerShadow.font = card.template == Template.SKILL 
		? "600 32px sans-serif"
		: "600 32px \"Spectral SC\", serif";
	ctx.fillStyle = "#000";
	switch(card.rarity)
	{
		// Common cards use a different color depending on the type of card.
		case Rarity.Common: switch(card.template)
			{
				case Template.XYZ: 
				case Template.SKILL:
				case Template.SPELL:
				case Template.TRAP:
					ctx.fillStyle = "#fff";
					break;
			} 
			break;
		case Rarity.Rare: break;
		case Rarity.UltraRare: break;
		case Rarity.GhostRare: break;
		case Rarity.SecretRate: break;
	}

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

	/*ctx.save();
	ctx.globalCompositeOperation = "source-atop";
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, nameCanvas.width, nameCanvas.height);
	ctx.shadowColor = "rgba(0,0,0,0.5)";
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0.25;
	ctx.shadowOffsetY = 1;
	ctx.drawImage(nameShadowCanvas, 0, 0);
	ctx.restore();*/




	output.drawImage(nameCanvas, 32, 24);
}

async function renderEffect(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void>
{
	await go(Promise.resolve(), cancel);

	type Word = { value: string; width: number };

	const availableWidth = 350;
	const availableHeight = 75 
		+ (card.monsterType.enabled ? 0 : 16);
	const position = {
		x: 35,
		y: 475 - (card.monsterType.enabled ? 0 : 16)
	}

	const effect = card.effect.replace(/(?:\{([^}]+|\})\}|\{|\})/g, (_, name) => { switch(name){
		case "name": return card.name;
		case "level": return card.level.value.toFixed(0);
		case "{": return "{";
		case "}": return "}";
		default: return "";
	}});

	const paragraphWords: string[][] = effect.split("\n").map(paragraph => paragraph.split(/\s/g));
	let paragraphs: Word[][][];
	let lines: Word[][];
	let fontSize = 14;

	do
	{
		paragraphs = [];
		output.font = `400 ${fontSize}px "Spectral", sans-serif`;
		const spaceMinWidth = output.measureText(" ").width;
		paragraphWords.forEach(paragraph => {
			lines = [];
			let activeLine: Word[] = [];
			let lineWidth = -spaceMinWidth;
			paragraph.forEach(word => 
			{
				const wordWidth = output.measureText(word).width;
				if (lineWidth + spaceMinWidth + wordWidth <= availableWidth)
				{
					activeLine.push({value: word, width: wordWidth});
					lineWidth += spaceMinWidth + wordWidth;
				}
				else
				{
					lines.push(activeLine);
					activeLine = [{value: word, width: wordWidth}];
					lineWidth = wordWidth;
				}
			});
			lines.push(activeLine);
			paragraphs.push(lines);
		});
		fontSize -= 0.5;
	} while (paragraphs.reduce((prev, p) => prev + p.length, 0) * fontSize > availableHeight && fontSize > 2)

	let index = 0;
	paragraphs.forEach(paragraph => {
		paragraph.forEach((line, currentLine) => {

			if (currentLine != paragraph.length-1)
			{
				const spaceMinWidth = output.measureText(" ").width;
				const taken = line.reduce((total, current) => total + current.width, 0) + spaceMinWidth * line.length;
				const remaining = availableWidth - taken;
				const additionalSpaceWidth = remaining / Math.max(line.length, 1);
				let offset = 0;
				line.forEach(word => {
					output.fillText(word.value, position.x + offset, position.y + ((1 + index) * fontSize));
					offset += additionalSpaceWidth + word.width + spaceMinWidth;
				});
			}
			else
			{
				output.fillText(line.map(w=>w.value).join(" "), position.x, position.y + (1 + index) * fontSize);
			}
			index++;
		});
	});
}

async function renderMonsterType(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void>
{
	await go(Promise.resolve(), cancel);

	if (!card.monsterType.enabled) { return; }
	const fontSize = 16;
	output.font = `600 ${fontSize}px "Spectral SC", serif`;
	output.fillText("[Fariy / Effect]", 35, 475);
}

async function renderSerialNumber(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void>
{
	await go(Promise.resolve(), cancel);

	const fontSize = 16;
	output.font = `400 ${fontSize}px "Spectral", serif`;
	output.fillText(card.serialNumber, 20, 592);
}

async function renderImage(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void> 
{
	const img = await go(image(card.image.url), cancel);

	const regularArea = { x: 50, y: 110, width: 320, height: 320 };
	const pendulumArea = { x: 30, y: 110, width: 360, height: 360 };
	
	let usePendulumArea = false;
	switch(card.template)
	{
		case Template.UNITY: usePendulumArea = true; break;
		case Template.SKILL: usePendulumArea = false; break;
		default:
			usePendulumArea = card.pendulum.enabled;
	}
	const area = usePendulumArea ? pendulumArea : regularArea;

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

async function renderBorder(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void> 
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
		case Template.SKILL:   url = Borders.Skill; break;
		default: return; // Prevent unneeded errors.
	}

	output.drawImage(await go(image(url), cancel), 0, 0);

}

async function renderAttribute(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void> 
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
	output.drawImage(await go(image(url), cancel), 350, 28, 40, 40);
}

async function renderLevel(output: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void> 
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
	
	const img = await go(image(url), cancel);
	
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

async function renderCopyright(ctx: CanvasRenderingContext2D, card: Card, cancel: CancelationToken): Promise<void>
{
	await go(Promise.resolve(), cancel);

	const text = card.copyright;
	
	const textWidth = ctx.measureText(text).width;
	const availableWidth = 150;

	const scale = Math.min(availableWidth / Math.max(textWidth, 1), 1);

	ctx.save();
	ctx.translate(230 + (availableWidth - (textWidth * scale)), 592);
	ctx.scale(scale, 1);

	ctx.fillText(text, 0, 0);
	ctx.restore();

	return Promise.resolve();
}

export async function render(canvas: HTMLCanvasElement | null, card: Card, cancel: Promise<never>): Promise<void>
{
	if (!canvas) { return; }

	const ctx = canvas.getContext("2d");
	if (!ctx) { return; }

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";

	try { await renderImage(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderBorder(ctx, card, cancel); } catch(e) { /* */} 
	try { await renderAttribute(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderLevel(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderName(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderMonsterType(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderEffect(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderSerialNumber(ctx, card, cancel); } catch(e) { /* */ }
	try { await renderCopyright(ctx, card, cancel); } catch(e) { /* */ }
}
