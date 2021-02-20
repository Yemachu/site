
export type FontStretch = 
| "ultra-condensed" 
| "extra-condensed" 
| "condensed" 
| "semi-condensed" 
| "normal" 
| "semi-expanded" 
| "expanded" 
| "extra-expanded" 
| "ultra-expanded"
;

export type FontWeight =
| "normal" 
| "bold" 
| "lighter" 
| "bolder" 
| number
;

export type FontStyle =
| "normal" 
| "italic" 
| "oblique" 
| (string & { slant: number })
;

export type FontVariant = 
| "normal"
| "small-caps"
;

export type FontFamily = string;
export type FontSize = number;

/**
 * Generate a font string based on the provided parameters.
 */
export const font = (font: {
  family: FontFamily,
  size: FontSize,
  weight?: FontWeight,
  style?: FontStyle,
  stretch?: FontStretch,
  lineHeight?: number,
  variant?: FontVariant,
}) => {
  return `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${font.size}px${font.lineHeight ? "/" + font.lineHeight : ""} ${font.family}`;
}

