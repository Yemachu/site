import * as React from "react";

interface Errorable
{
	error?: Error;
}

interface Props extends React.ComponentProps<"div">
{
	fallback?(error: Error, reset: () => void): React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, Errorable>
{
	constructor(props: Props)
	{
		super(props);
		this.state = { };
	}

	reset(): void
	{
		this.setState({ error: undefined });
	}

	render(): React.ReactNode
	{
		if (this.state.error)
		{
			const fallback = this.props.fallback;
			return fallback ? fallback(this.state.error, () => this.reset()) : null;
		}
		return this.props.children;
	}

	static getDerivedStateFromError(error: Error): Errorable
	{
		return { error: error }
	}
	
}