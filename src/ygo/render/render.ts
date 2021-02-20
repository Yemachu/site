import { TextRenderer } from "./text";
import { Card } from "../card";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";

const paragraphSpacing = 0;
const maxHeight = 200;

import { font } from "../../utils";

type RenderCardComponent = (ctx: CanvasRenderingContext2D, card: Card) => void;

export const render = (ctx: CanvasRenderingContext2D, card: Card) =>
{
  renderImage(ctx, card);
  renderBorder(ctx, card);
  renderAttribute(ctx, card);
  renderName(ctx, card);
  renderLevel(ctx, card);
  renderEffect(ctx, card);
  
}

const protectContext = (ctx: CanvasRenderingContext2D, callback: (ctx: CanvasRenderingContext2D) => void) =>
{
  ctx.save();
  try
  {
    callback(ctx);
  }
  finally
  {
    ctx.restore();
  }
}
const renderImage: RenderCardComponent = (ctx, { attribute }) => {

}

const renderBorder: RenderCardComponent = (ctx, { attribute }) => {

}
const renderLevel: RenderCardComponent = (ctx, { level }) => {
  switch (level.value)
  {
    // Level/Rank 12 and 13 are aligned slightly different, as they 
    // would not fit otherwise.
    case 12: break;
    case 13: break;

  }
}

const renderAttribute: RenderCardComponent = (ctx, { attribute }) =>
{

}

const renderName: RenderCardComponent = (ctx, { name }) =>
{
  protectContext(ctx, ctx => {
    ctx.font = font({
      family: "Spectral SC",
      size: 32
    });
    const { width } = ctx.measureText(name);
    const maxWidth = 320;
    const squishFactor = maxWidth / Math.max(width, 1);
  
    ctx.translate(32, 32);
    ctx.scale(Math.min(1, squishFactor), 1);
    ctx.fillText(name, 0, 0);
  });
}

const renderEffect: RenderCardComponent = (ctx, card) =>
{
  const text = card.effect.replace(/{([^}]*)}/gm, (_, what) => {
    switch(what)
    {
      case "name": return card.name;
      case "level": 
      case "rank":
        return `${card.level.value}`;
      case "*": return "•";
      case "{": return "{";
      case "}": return "}";
    }
    return "";
  })
  const renderer = new TextRenderer(ctx, 200);
  let paragraphs: string[][][];
  
  let fontSize = 14.125;
  let lineHeight = 1;
  let calculatedHeight: number;

  protectContext(ctx, ctx => {
    do
    {
      fontSize -= 0.125;
      const family = "buenard";
      ctx.font = font({ family, size: fontSize, lineHeight });
      paragraphs = renderer.calculateLayout(text);
      const totalNumberOfLines = paragraphs.reduce((count, lines) => count + lines.length, 0);
      calculatedHeight = (lineHeight * fontSize * totalNumberOfLines) + ((paragraphs.length - 1) * paragraphSpacing);
    } while(maxHeight < calculatedHeight && 0 < fontSize);
  
    paragraphs.forEach(lines => 
    {
      lines.forEach((line, index) => 
      {
        ctx.translate(0, fontSize * lineHeight);
        if (index < lines.length -1) {
          renderer.justified(line);
        } else {
          renderer.left(line);
        }
      });
      ctx.translate(0, paragraphSpacing);
    });
  });
}