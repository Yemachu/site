const cache: {[key: string]: Promise<HTMLImageElement> | undefined} = {};

export default function(url: string): Promise<HTMLImageElement>
{
	let output = cache[url];
	
	if (output)
	{
		return output;
	}

	output = new Promise<HTMLImageElement>((resolve, reject) => {
		const img = document.createElement("img");
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", (evt) => reject(evt.error));
		img.src = url;
	});

	cache[url] = output;
	return output;
}