import * as React from "react";
import { Portal } from "@material-ui/core";

type RegionProps = {
	readonly children?: JSX.Element | JSX.Element[];
};


export default function createRegion(): { (): unknown; readonly Content: (props: {readonly children?: JSX.Element | readonly JSX.Element[]}) => JSX.Element }
{
	const context = React.createContext<React.RefObject<HTMLDivElement>|null>(null);

	const output: (() => unknown) & { Content: () => unknown } = function (): void
	{

	}

	output.Content = function Content(): JSX.Element
	{
		const container = React.useContext(context);
		return <Portal container={container?.current}>

		</Portal>
	}

	return output;
}

const Sidebar = createRegion();
const Footer = createRegion();

const RegionsContext = React.createContext(null);

function Regions({children}: {readonly children: JSX.Element | readonly JSX.Element[]}): JSX.Element
{
	return <RegionsContext.Provider value={null}>
		{children}
	</RegionsContext.Provider>
}

function useRegions(): {Region: (props: {type: () => JSX.Element }) => JSX.Element, Content: (props: RegionProps) => JSX.Element}
{
	const context = React.useState([]);

	function Region({type: SlotType}): JSX.Element
	{
		return <SlotType />
	}

	function Content({children}: RegionProps): JSX.Element
	{
		return context.reduce((previous, Current)=><Current>{previous}</Current>, children);
	}

	return { Region, Content }
}


function Layout({children}: RegionProps): JSX.Element
{
	const {Region, Content} = useRegions();

	return <>
		<Region type={Sidebar}/>
		<Region type={Footer}/>
		
		<Content>{children}</Content>
	</>
}

function SlideIn(): JSX.Element
{
	return <Sidebar.Content>

	</Sidebar.Content>
}