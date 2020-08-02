export type CancelationToken = Promise<never>; // A cancelation token should never resolve;

export class CancelationException extends Error
{

}

/**
 * Creates a token used to indicate a promise should be canceled, and a function to cancel it.
 * 
 * When used in combination with React, this function would be used in the `useEffect` hook, where
 * `cancel` is returned (or invoked by the clean-up function that is returned in its stead). 
 * 
 * # Usage example.
 * ```ts
 * import { useCancel } from "useCancel";
 * // ...
 * 
 * useEffect(() => {
 *   const [token, cancel] = useCancel();
 *   foo(cancel);
 *   return cancel;
 * })
 * ```
 */
export function useCancel(): [CancelationToken, () => void]
{
	let cancel: boolean | ((reason?: CancelationException) => void) = false;

	return [new Promise((_, reject) => {
		// The operation might get canceled before it has had the chance to be initialized.
		// If that is the case, reject immediately.
		if (cancel)
		{
			reject(new CancelationException());
		}
		else
		{
			cancel = reject;	
		}
	}), ()=> {
		// When the promise gets initialized, it exposes the function to reject it. Once it gets 
		// canceled, that function gets overwritten to prevent the pomise from resolving multiple times.
		if (typeof cancel === "function")
		{
			cancel(new CancelationException());
		}
		cancel = true;
	}];
}

/**
 * Simulates cancelable promises by returing the result of the promise if cancel has not already
 * been invoked. Otherwise it returns a rejected promise.
 * 
 * In case the provided promise resolved and the operation has been canceled before this function
 * got invoked, it considers the operation as being canceled.
 * 
 * This method is equivalent to calling `Promise.race([cancel, promise]);`. Note that the order of
 * parameters is the oter way around in that case.
 * 
 * # usage example
 * ```ts
 * async function foo(cancel: CancelationToken)
 * {
 *   let result;
 *   try {
 *     result = await go(fetch(), cancel);
 *   } 
 *   catch(error) {
 *     if (error instanceof CancelationException) {} // Promise got canceled.
 *   } 
 * }
 * ```
 * 
 * # Parameters
 * - **promise**
 * - **cancel**
 */
export function go<T>(promise: Promise<T>, cancel: CancelationToken): Promise<T>
{
	return Promise.race([cancel, promise]);
}