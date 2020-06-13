
interface Region {
	readonly x?: number;
	readonly y?: number;
	readonly width?: number;
	readonly height?: number;
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