import React, { createContext, useContext } from "react";

export type ErrorBoundaryFallbackProps = {
	readonly error: Error;
	reset(): void;
};

export type ErrorBoundaryProps = {
	readonly children: React.ReactNode;
	readonly fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
	readonly error?: Error;
}

const fallbackContext = createContext<ErrorBoundaryFallbackProps>({
	error: new Error("[useFallbackContext()] should only be used from the fallback provided to an <ErrorBoundary />"),
	reset: () => {/* NOOP */}
});

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
{
	constructor(props: ErrorBoundaryProps)
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
		const {
			children,
			fallback
		} = this.props;
		const error = this.state.error;

		if (error)
		{
			return fallback
			? <fallbackContext.Provider value={{
				error,
				reset: () => this.reset()
			}}>{fallback}</fallbackContext.Provider>
			: null;
		}
		return children || null;
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>
	{
		return { error };
	}
	
}

export const useFallbackContext = () =>
{
	return useContext(fallbackContext);
}