import { HomeButton } from 'applications';
import React from 'react';

interface IApplicationHomeButtonProps {
    showTaskManager: boolean;
}

const ApplicationHomeButton = ({
    showTaskManager,
}: IApplicationHomeButtonProps) => {
    return showTaskManager ? (
        <HomeButton />
    ) : null;
};

export default ApplicationHomeButton;
