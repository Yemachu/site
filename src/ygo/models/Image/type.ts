export default interface Image
{
	readonly url: string;
	readonly region: {
		readonly x: number;
		readonly y: number;
		readonly width: number;
		readonly height: number;
	};
}

export {
	Image,
}