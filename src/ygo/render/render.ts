import { useState, useEffect, useRef } from "react";

const useImage = (src: string) => {
  const [img, setImg] = useState<HTMLImageElement | undefined>(undefined);
  useEffect(()=> {
    const image = document.createElement("img");
    const removeListeners = () =>
    {
      image.removeEventListener("load", loaded);
    }
    const loaded = () => {
      removeListeners();
      setImg(image);
    }
    image.addEventListener("load", loaded);
    
    image.src = src;
    
    return () => {
      removeListeners();
    };
  }, [src]);

  return img;
}

const useBorder = () => {
  return {
    dark: useImage(""),
    divine: useImage(""),


  }
}

const useFoil = () => {
  return {

  }
}