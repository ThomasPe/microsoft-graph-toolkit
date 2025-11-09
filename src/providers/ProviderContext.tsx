/**
 * React Context for Graph Provider
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { IProvider } from './IProvider';

interface GraphProviderContextValue {
    provider: IProvider | null;
}

const GraphProviderContext = createContext<GraphProviderContextValue>({
    provider: null,
});

export interface GraphProviderProps {
    provider: IProvider;
    children: ReactNode;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({ provider, children }) => {
    return (
        <GraphProviderContext.Provider value={{ provider }}>
            {children}
        </GraphProviderContext.Provider>
    );
};

/**
 * Hook to access the current Graph provider
 */
export const useProvider = (): IProvider | null => {
    const { provider } = useContext(GraphProviderContext);
    return provider;
};
