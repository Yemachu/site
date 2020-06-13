import { Type as Attribute } from "../Attribute";
import { Type as Effect } from "../Effect";
import { Type as Image } from "../Image";
import { Type as Link } from "../Link";
import { Type as Level } from "../Level";
import { Type as MonsterType } from "../MonsterType";
import { Type as Name } from "../Name";
import { Type as Pendulum } from "../Pendulum";
import { Type as Rarity } from "../Rarity";
import { Type as SerialNumber } from "../SerialNumber";

export default interface Card
{
	readonly attribute: Attribute;
	readonly effect: Effect;
	readonly image: Image;
	readonly level: Level;
	readonly link: Link;
	readonly monsterType: MonsterType;
	readonly name: Name;
	readonly pendulum: Pendulum;
	readonly rarity: Rarity;
	readonly serialNumber: SerialNumber;
}
