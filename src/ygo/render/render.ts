import { TextRenderer } from "./text";
import { Card } from "../card";
import { Template } from "../card/template";

import "typeface-buenard";
import "typeface-spectral";
import "typeface-spectral-sc";

const paragraphSpacing = 0;
const maxHeight = 200;

import { font } from "../../utils";
import { createResources } from "./resources";
import { Rarity } from "../card/rarity";
import { BorderAll } from "@material-ui/icons";

import * as borders from "../images/border";

const useResourcesImpl = createResources({
  border: "",
  attribute: "",
  star: "",
  foil: "",
  image: "",
});

const templateUrl = ({template}: Card): string | undefined =>
{
  let fill = "";
  switch (template) {
    case Template.NORMAL: return borders.Normal;
    case Template.EFFECT: return borders.Effect;
    case Template.RITUAL: return borders.Ritual;
    case Template.FUSION: return borders.Fusion;
    case Template.SYNCHRO: return borders.Synchro;
    case Template.DARK_SYNCHRO: return borders.DarkSynchro;
    case Template.XYZ: return borders.Xyz;
    case Template.LINK: return borders.Link;
    case Template.SPELL: return borders.Spell;
    case Template.TRAP: return borders.Trap;
    case Template.TOKEN: return borders.Token;
    case Template.SKILL: return borders.Skill;
    default: return ""; // Prevent unneeded errors.
  }
}

const foilUrl = ({rarity}: Card): string | undefined =>
{
  switch(rarity)
  {
    case Rarity.COMMON: break;
    case Rarity.RARE: break;
    case Rarity.ULTRA_RARE: break;
    case Rarity.SECRET_RARE: break;
    default: return "";
  }
}

export const useResources = (card: Card) =>
{
  return useResourcesImpl({
    border: templateUrl(card),
    foil: foilUrl(card),
  });
}

type Resources = ReturnType<typeof useResources>;
type RenderCardComponent = (ctx: CanvasRenderingContext2D, card: Card, resources: Resources) => void;

export const render = (ctx: CanvasRenderingContext2D, card: Card, resources: Resources) =>
{
  renderImage(ctx, card, resources);
  renderBorder(ctx, card, resources);
  renderAttribute(ctx, card, resources);
  renderName(ctx, card, resources);
  renderLevel(ctx, card, resources);
  renderEffect(ctx, card, resources);
  
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
const renderImage: RenderCardComponent = (ctx, _, { image }) => {
  if (!image) return;
  ctx.drawImage(image, 0, 0, 320, 320);
}

const renderBorder: RenderCardComponent = (ctx, { template }, { border }) => {

  if (!border) return;
  ctx.drawImage(border, 0, 0, 420, 610);
}

const renderLevel: RenderCardComponent = (ctx, { level }) => {
  const { value, mirror } = level;

  let startOffset = 0;
  let spacing = 0;

  switch (value)
  {
    // Level/Rank 12 and 13 are aligned slightly different, as they 
    // would not fit otherwise.
    case 12: break;
    case 13: break;
  }

  protectContext(ctx, ctx => {
    ctx.beginPath();
    for (let i=0; i < value; ++i)
    {
      ctx.ellipse((i-1) * (24 + spacing) + startOffset + 24, 48, 12, 12, 0, 0, Math.PI*2);
    }
    ctx.closePath();
    ctx.fill();
  });
}

const renderAttribute: RenderCardComponent = (ctx, { attribute }) =>
{
  protectContext(ctx, ctx => {
    //ctx.fillStyle = 
    ctx.beginPath();
    ctx.ellipse(370, 16, 24, 24, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  });
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
  
    // It is important to move to the correct place
    // before applying the scale. Not doing so would
    // cause the text to move to the left as it grows.
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
      // Level and rank are basically the same thing;
      // it is just named differently in the context
      // of Xyz cards.
      case "level": 
      case "rank":
        return `${card.level.value}`;
      case "*": return "•";
      case "{": return "{";
      case "}": return "}";
    }
    return "";
  })
  const renderer = new TextRenderer(ctx, 320);
  let paragraphs: string[][][];
  
  let fontSize = 14.125;
  let lineHeight = 1;
  let calculatedHeight: number;

  const maxHeight = 80;

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
  
    ctx.translate(32, 360);
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