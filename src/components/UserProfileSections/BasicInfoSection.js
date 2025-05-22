import React from 'react';
import {
    Grid,
    Typography,
    TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/Form/Select/CountrySelect';
import SocialLinksSection from '../SocialLinksSection';

function BasicInfoSection({ data, onChange }) {
    const { t } = useTranslation('profile');

    return React.createElement(Grid, {
        container: true,
        spacing: 3
    }, [

        React.createElement(Grid, { item: true, xs: 12, key: 'org-name' },
            React.createElement(TextField, {
                label: t('profile.basicInfo.organizationName'),
                name: 'organizationName',
                value: data.organization?.name || '',
                fullWidth: true,
                InputProps: { disabled: true }
            })
        ),

        React.createElement(Grid, { item: true, xs: 12, key: 'org-desc' },
            React.createElement(TextField, {
                label: t('profile.basicInfo.organizationDescription'),
                name: 'organizationDescription',
                value: data.organization?.description || '',
                onChange: (e) => onChange('organization', 'description', e.target.value),
                fullWidth: true,
                multiline: true,
                minRows: 4,
                maxRows: 10
            })
        ),

        React.createElement(SocialLinksSection, {
            key: 'social',
            data: data.organization,
            onChange: (e) => onChange('organization', e.target.name, e.target.value)
        }),

        React.createElement(Grid, { item: true, xs: 12, key: 'title' },
            React.createElement(Typography, { variant: 'h6' }, t('profile.basicInfo.title'))
        ),

        React.createElement(Grid, { item: true, xs: 12, md: 6, key: 'firstName' },
            React.createElement(TextField, {
                label: t('profile.basicInfo.firstName'),
                name: 'firstName',
                value: data.firstName,
                onChange: (e) => onChange(null, 'firstName', e.target.value),
                fullWidth: true
            })
        ),

        React.createElement(Grid, { item: true, xs: 12, md: 6, key: 'lastName' },
            React.createElement(TextField, {
                label: t('profile.basicInfo.lastName'),
                name: 'lastName',
                value: data.lastName,
                onChange: (e) => onChange(null, 'lastName', e.target.value),
                fullWidth: true
            })
        ),

        React.createElement(Grid, { item: true, xs: 12, md: 6, key: 'email' },
            React.createElement(TextField, {
                label: t('profile.basicInfo.email'),
                name: 'email',
                value: data.email,
                onChange: (e) => onChange(null, 'email', e.target.value),
                fullWidth: true
            })
        ),

        React.createElement(Grid, { item: true, xs: 12, md: 6, key: 'citizenship' },
            React.createElement(CountrySelect, {
                name: 'citizenship',
                value: data.citizenship,
                onChange: (e) => onChange(null, e.target.name, e.target.value),
                error: false,
                helperText: ''
            })
        )

    ]);
}

export default BasicInfoSection;
