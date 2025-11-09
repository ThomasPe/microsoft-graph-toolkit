/**
 * Person component - Display a person using Fluent UI Persona
 */

import React from 'react';
import {
    Persona,
    PersonaSize,
    PresenceBadgeStatus,
} from '@fluentui/react-components';
import { usePersonData } from '../../hooks/usePersonData';
import { getInitials } from '../../utils/graph';
import { PersonProps } from './Person.types';

/**
 * Map person size to Fluent UI Persona size
 */
const mapSize = (size?: string): PersonaSize => {
    switch (size) {
        case 'small':
            return 'small';
        case 'large':
            return 'large';
        case 'extra-large':
            return 'extra-large';
        case 'medium':
        default:
            return 'medium';
    }
};

/**
 * Map Graph presence to Fluent UI presence status
 */
const mapPresence = (availability?: string): PresenceBadgeStatus => {
    switch (availability?.toLowerCase()) {
        case 'available':
        case 'availableidle':
            return 'available';
        case 'away':
        case 'berightback':
            return 'away';
        case 'busy':
        case 'busyidle':
        case 'donotdisturb':
            return 'busy';
        case 'offline':
        case 'presenceunknown':
        default:
            return 'offline';
    }
};

export const Person: React.FC<PersonProps> = ({
    userId,
    userPrincipalName,
    email,
    personDetails,
    view = 'oneline',
    showPresence = false,
    avatarSize = 'medium',
    fetchImage = true,
    onClick,
    className,
}) => {
    // Fetch data if not provided directly
    const { user, presence, photoUrl, loading } = usePersonData({
        userId: personDetails ? undefined : userId || userPrincipalName || email,
        fetchPresence: showPresence,
        fetchPhoto: fetchImage,
    });

    // Use provided details or fetched user
    const person = personDetails || user;

    if (loading) {
        return (
            <Persona
                size={mapSize(avatarSize)}
                name="Loading..."
                className={className}
            />
        );
    }

    if (!person) {
        return null;
    }

    const displayName = person.displayName || 'Unknown User';
    const initials = getInitials(displayName);

    // Build persona props based on view
    const personaProps: any = {
        size: mapSize(avatarSize),
        name: displayName,
        avatar: {
            image: photoUrl ? { src: photoUrl } : undefined,
            initials: photoUrl ? undefined : initials,
        },
        className,
    };

    if (showPresence && presence) {
        personaProps.presence = {
            status: mapPresence(presence.availability),
        };
    }

    if (view === 'twolines' || view === 'threelines') {
        personaProps.secondaryText = person.jobTitle;
    }

    if (view === 'threelines') {
        personaProps.tertiaryText = person.department;
    }

    if (onClick) {
        personaProps.onClick = () => onClick(person as any);
    }

    return <Persona {...personaProps} />;
};
