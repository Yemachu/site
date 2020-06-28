
interface Region {
	readonly left?: number;
	readonly right?: number;
	readonly top?: number;
	readonly bottom?: number;
}

export default interface Image
{
	readonly url: string;
	readonly region: Region;
}

export {
	Image,
	Region,
}