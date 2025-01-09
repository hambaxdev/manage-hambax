import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const steps = [
    'generalInformation',
    'eventAddress',
    'tickets'
];

const EventStepper = ({ activeStep = 0 }) => {
    const { t } = useTranslation();

    return (
        <Box mb={4}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((stepKey) => (
                    <Step key={stepKey}>
                        <StepLabel>{t(`eventStepper.${stepKey}`)}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default EventStepper;
