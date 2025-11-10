/**
 * Hook to fetch person data from Microsoft Graph
 */

import { useState, useEffect } from 'react';
import { User, Presence } from '@microsoft/microsoft-graph-types';
import { useGraphClient } from './useGraphClient';
import { useProvider, useProviderState } from '../providers/ProviderContext';
import { MockProvider } from '../providers/MockProvider';

export interface PersonData {
    user: User | null;
    presence: Presence | null;
    photoUrl: string | null;
    loading: boolean;
    error: Error | null;
}

export interface UsePersonDataOptions {
    userId?: string;
    userPrincipalName?: string;
    fetchPresence?: boolean;
    fetchPhoto?: boolean;
}

/**
 * Fetch person data from Microsoft Graph
 */
export const usePersonData = (options: UsePersonDataOptions): PersonData => {
    const graphClient = useGraphClient();
    const provider = useProvider();
    const providerState = useProviderState();
    const [data, setData] = useState<PersonData>({
        user: null,
        presence: null,
        photoUrl: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (provider instanceof MockProvider) {
            // Return static mock data without calling Graph
            const mockUser: User = {
                id: '00000000-0000-0000-0000-000000000000',
                displayName: 'Adele Vance',
                userPrincipalName: 'adelev@contoso.com',
                jobTitle: 'Product Manager',
                department: 'Marketing',
                officeLocation: '19/3106',
                mail: 'adelev@contoso.com',
            } as User;
            const mockPresence: Presence = {
                availability: 'Available',
                activity: 'Available',
                id: mockUser.id!,
                odataType: '#microsoft.graph.presence',
            } as unknown as Presence;
            // Sample avatar image from GitHub (Microsoft Graph Toolkit's Graff mascot)
            const sampleAvatarUrl = 'https://github.com/microsoftgraph/microsoft-graph-toolkit/raw/main/assets/graff.png';

            setData({
                user: mockUser,
                presence: options.fetchPresence ? mockPresence : null,
                photoUrl: options.fetchPhoto ? sampleAvatarUrl : null,
                loading: false,
                error: null,
            });
            return;
        }

        if (providerState !== 'SignedIn') {
            setData({
                user: null,
                presence: null,
                photoUrl: null,
                loading: false,
                error: providerState === 'SignedOut' ? null : new Error('Provider not signed in'),
            });
            return;
        }

        if (!graphClient) {
            // Graph client not yet available even though state is SignedIn (transient)
            setData(prev => ({ ...prev, loading: true }));
            return;
        }

        const { userId, userPrincipalName, fetchPresence, fetchPhoto } = options;
        const identifier = userId || userPrincipalName;

        if (!identifier) {
            setData({
                user: null,
                presence: null,
                photoUrl: null,
                loading: false,
                error: null,
            });
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, loading: true, error: null }));

                // Fetch user
                const user = await graphClient
                    .api(`/users/${identifier}`)
                    .select('id,displayName,jobTitle,mail,department,officeLocation,userPrincipalName')
                    .get();

                if (cancelled) return;

                let presence: Presence | null = null;
                let photoUrl: string | null = null;

                // Fetch presence if requested
                if (fetchPresence && user.id) {
                    try {
                        presence = await graphClient
                            .api(`/users/${user.id}/presence`)
                            .get();
                    } catch (err) {
                        console.warn('Failed to fetch presence:', err);
                    }
                }

                // Fetch photo if requested
                if (fetchPhoto && user.id) {
                    try {
                        const photoBlob = await graphClient
                            .api(`/users/${user.id}/photo/$value`)
                            .get();
                        photoUrl = URL.createObjectURL(photoBlob);
                    } catch (err) {
                        console.warn('Failed to fetch photo:', err);
                    }
                }

                if (!cancelled) {
                    setData({
                        user,
                        presence,
                        photoUrl,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                if (!cancelled) {
                    setData({
                        user: null,
                        presence: null,
                        photoUrl: null,
                        loading: false,
                        error: error as Error,
                    });
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [graphClient, options.userId, options.userPrincipalName, options.fetchPresence, options.fetchPhoto]);

    return data;
};
