import * as React from "react";

interface IErrored
{
	error?: Error;
}

export default class ErrorBoundary extends React.Component<React.ComponentProps<"div">, IErrored>
{


	constructor(props: React.ComponentProps<"div">)
	{
		super(props);
		this.state = {  };
	}

	render()
	{
		if (this.state.error)
		{
			return null;
		}
		return this.props.children;
	}

	static getDerivedStateFromError(error: Error): IErrored
	{
		return { error: error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo)
	{

	}



}