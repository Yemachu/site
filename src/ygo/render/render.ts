import { TextRenderer } from "./text";

const paragraphSpacing = 0;
const maxHeight = 200;

const font = (font: {
  family: string,
  size: number,
  weight?: "normal" | "bold" | "lighter" | "bolder" | number,
  style?: "normal" | "italic" | "oblique" | (string & { slant: number }),
  stretch?: "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "normal" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded",
  lineHeight?: number,
  variant?: "normal" | "small-caps",
}) => {
  return `${font.style||""} ${font.variant||""} ${font.weight||""} ${font.size}px${font.lineHeight?"/"+font.lineHeight:""} ${font.family}`;
}

export const render = (ctx: CanvasRenderingContext2D, text: string) =>
{
  const renderer = new TextRenderer(ctx, 200);
  let paragraphs: string[][][];
  
  let fontSize = 14.125;
  let lineHeight = 1;
  let calculatedHeight: number;
  do
  {
    fontSize -= 0.125;
    const family = "buenard";
    ctx.font = font({ family: family, size: fontSize, lineHeight });
    paragraphs = renderer.calculateLayout(text);
    const totalNumberOfLines = paragraphs.reduce((count, lines) => count + lines.length, 0);
    calculatedHeight = (lineHeight * fontSize * totalNumberOfLines) + ((paragraphs.length - 1) * paragraphSpacing);
  } while(maxHeight < calculatedHeight && 0 < fontSize);

  ctx.save();
  try
  {
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
  }
  finally
  {
    ctx.restore();
  }
}