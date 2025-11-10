/**
 * React Context for Graph Provider
 */

import React, { createContext, useContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IProvider, ProviderState } from './IProvider';

interface GraphProviderContextValue {
    provider: IProvider | null;
    state: ProviderState;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
    provider: null,
    state: ProviderState.Loading,
});

export interface GraphProviderProps {
    provider: IProvider;
    children: ReactNode;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({ provider, children }) => {
    const [state, setState] = useState<ProviderState>(() => provider?.getState?.() ?? ProviderState.Loading);

    useEffect(() => {
        setState(provider?.getState?.() ?? ProviderState.Loading);

        const handler = () => setState(provider.getState());
        // Subscribe if supported
        provider.onStateChanged?.(handler);

        // No guaranteed unsubscribe in the interface; rely on GC and provider impl
        return () => {
            // Best effort: if provider exposes a remove method, call it
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anyProvider = provider as any;
            if (typeof anyProvider?.removeStateChangedHandler === 'function') {
                anyProvider.removeStateChangedHandler(handler);
            }
        };
    }, [provider]);

    const value = useMemo<GraphProviderContextValue>(() => ({ provider, state }), [provider, state]);

    return <GraphProviderContext.Provider value={value}>{children}</GraphProviderContext.Provider>;
};

/**
 * Hook to access the current Graph provider
 */
export const useProvider = (): IProvider | null => {
    const { provider } = useContext(GraphProviderContext);
    return provider;
};

/**
 * Hook to access the current provider state
 */
export const useProviderState = (): ProviderState => {
    const { state } = useContext(GraphProviderContext);
    return state;
};
