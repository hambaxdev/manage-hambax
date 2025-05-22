import React, { useState } from 'react';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BasicInfoSection from './UserProfileSections/BasicInfoSection';
import ContactInfoSection from './UserProfileSections/ContactInfoSection';
import AddressInfoSection from './UserProfileSections/AddressInfoSection';

const UserProfileForm = ({ profileData, onSave }) => {
    const { t } = useTranslation('profile');
    const [formData, setFormData] = useState({
        ...profileData,
        organization: {
            name: profileData?.organization?.name || '',
            description: profileData?.organization?.description || '',
            slug: profileData?.organization?.slug || '',
            instagram: profileData?.organization?.instagram || '',
            youtube: profileData?.organization?.youtube || '',
            twitter: profileData?.organization?.twitter || '',
            facebook: profileData?.organization?.facebook || '',
        },
        address: profileData?.address || {
            country: '',
            city: '',
            zipCode: '',
            streetName: '',
            houseNumber: '',
            state: '',
        },
        contact: profileData?.contact || {
            phone: '',
            alternatePhone: '',
            website: '',
            email: '',
        }
    });
    
    const handleChange = (section, key, value) => {
        if (section) {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const handleSave = () => {
        const org = {
          ...formData.organization,
          currentName: profileData?.organization?.name || '',
        };
      
        ['instagram', 'youtube', 'twitter', 'facebook'].forEach((field) => {
          if (!org[field] || !org[field].trim()) {
            delete org[field];
          } else {
            org[field] = org[field].trim();
          }
        });
      
        const payload = {
          ...formData,
          organization: org,
        };

        onSave(payload);
      };
      
    console.log(formData);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">{t('profile.title')}</Typography>
            </Grid>

            <Grid item xs={12}>
            <BasicInfoSection
                data={formData}
                onChange={(section, key, value) => handleChange(section, key, value)}
            />
            </Grid>

            <Divider sx={{ width: '100%', my: 3 }} />

            <Grid item xs={12}>
                <ContactInfoSection
                    data={formData.contact}
                    onChange={(key, value) => handleChange('contact', key, value)}
                />
            </Grid>

            <Divider sx={{ width: '100%', my: 3 }} />

            <Grid item xs={12}>
                <AddressInfoSection
                    data={formData.address}
                    onChange={(key, value) => handleChange('address', key, value)}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                >
                    {t('profile.saveButton')}
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserProfileForm;
