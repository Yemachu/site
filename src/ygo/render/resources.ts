import { useState, useEffect } from "react";
export const createResources = <T extends Record<string, string>>(shape: T) =>
{
  type Output = { readonly [key in keyof T]?: HTMLImageElement };
  
  const keys = Object.keys(shape);
  return (updatedShape?: Partial<T>): Output => {
    const output: Record<string, HTMLImageElement | undefined> = {};
    keys.forEach(key => {
      const current = updatedShape?.[key] || shape[key];
      const [image, setImage] = useState<HTMLImageElement>();
      useEffect(() => {
        const img = document.createElement("img");
        const loaded = () => {
          setImage(img);
        }
        const failed = () => {
          setImage(undefined);
        }
        img.addEventListener("load", loaded);
        img.addEventListener("error", failed);
        img.src = current;
        return () => {
          img.removeEventListener("load", loaded);
          img.removeEventListener("error", failed);
        }
      }, [current]);
      output[key] = image;
    });
    
    return output as Output;
  }
}