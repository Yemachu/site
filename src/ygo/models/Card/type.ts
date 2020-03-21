import { Type as Attribute } from "../Attribute";
import { Type as Name } from "../Name";
import { Type as Level } from "../Level";
import { Type as Pendulum } from "../Pendulum";
import { Type as SerialNumber } from "../SerialNumber";
import { Type as Link } from "../Link"; 

export default interface Card
{
	readonly attribute: Attribute;
	readonly name: Name;
	readonly level: Level;
	readonly pendulum: Pendulum;
	readonly serialNumber: SerialNumber;
	readonly link: Link;
}