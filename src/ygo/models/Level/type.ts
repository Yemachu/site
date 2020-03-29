type AllowedValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

enum Variant
{
	DEFAULT = "default",
	NORMAL = "normal",
	DARK_SYNCHRO = "dark_synchro",
	XYZ = "xyz"
}

export default interface Level {
	readonly value: AllowedValues;
	readonly variant: Variant;
	readonly mirrored: boolean;
}

const MAX_VALUE = 12;
const MIN_VALUE = 0;

export {
	AllowedValues,
	Level,
	Variant,

	MAX_VALUE,
	MIN_VALUE,
} 
