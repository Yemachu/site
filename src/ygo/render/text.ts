const defaultLineWidth = 300;

export class TextRenderer
{
  private readonly ctx: CanvasRenderingContext2D;
  private readonly width: number;
  
  public constructor(ctx: CanvasRenderingContext2D, width?: number)
  {
    this.ctx = ctx;
    this.width = width || defaultLineWidth;
  }

  public left(words: readonly string[]) 
  {
    this.ctx.fillText(words.join(" "), 0, 0);
  }

  public right(words: readonly string[]) {
    const line = words.join(" ");
    const { width } = this.ctx.measureText(line);
    this.ctx.fillText(line, this.width - width, 0);
  }

  public centered(words: readonly string[]) 
  {
    
    const line = words.join(" ");
    const { width } = this.ctx.measureText(line);
    this.ctx.fillText(line, (this.width - width) / 2, 0);
  }

  public justified(words: readonly string[]) 
  {
    const ctx = this.ctx;
    
    const wordsWithWidth = words.map(word => ({ word, width: ctx.measureText(word).width }));
    const minSpaceWidth = ctx.measureText(" ").width;
    const requiredWidth = wordsWithWidth.reduce((current, { width }) => current + width + minSpaceWidth, -minSpaceWidth);
    const equallySplitRemainingWidth = (this.width - requiredWidth) / Math.max(wordsWithWidth.length-1, 1);

    let currentOffset = 0;
    wordsWithWidth.forEach(({ word, width }) => {

      ctx.fillText(word, currentOffset, 0);
      currentOffset += width + minSpaceWidth + equallySplitRemainingWidth;
    });
  }

  public calculateLayout(text: string)
  {
    const ctx = this.ctx;
    const maxWidth = this.width;
    // Avoid needing to calculate the width of a space
    // each time one is encountered between words.
    const spaceWidth = ctx.measureText(" ").width;
    // Start of a new parapgraph is denoted by a line feed.
    const paragraphs = text.split("\n");
    // [paragraph][line][word]
    const linesByParagraph = paragraphs.map(paragraph => 
    {
      const words = paragraph.split(/[ ]+/);
      const lines: string[][] = [];

      let currentLine: string[] = [];
      // Negative space width for first value allows
      // for adding the value unconditionally.
      let currentWidth = -spaceWidth;

      words.forEach(word => {
        const { width } = ctx.measureText(word);

        // Calculate the minumum amount of width
        // the line takes if the current word would
        // have been added. 
        currentWidth += width + spaceWidth;
        // No care is taken to wrap words if they are too long. 
        // Should an exceedingly long word be encountered, it 
        // will get placed on its own line. 
        // NOTE: Prevent adding empty lines for long first words.
        if (currentWidth < maxWidth || currentLine.length == 0)
        {
          currentLine.push(word);
        }
        else
        {
          lines.push(currentLine);
          currentLine = [word];
          currentWidth = width;
        }
      });
      // Make sure the last line of each paragraph is 
      // included in the output of this method.
      lines.push(currentLine);
      return lines;
    });
    return linesByParagraph;
  }
}
