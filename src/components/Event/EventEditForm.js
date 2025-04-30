import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useUpdateEvent from '../../hooks/useUpdateEvent';
import EventDetailsForm from './EventDetailsForm';
import AddressForm from './AddressForm';
import PricingOptions from './PricingOptions';

const EventEditForm = ({ eventDetails, fetchEventDetails }) => {
  const { t } = useTranslation();
  const { updateEvent, updating, updateError } = useUpdateEvent();

  const [formData, setFormData] = useState(() => ({
    ...eventDetails,
    eventImage: eventDetails?.eventImage || "",
    isActive: eventDetails?.isActive ?? true,
    pricing: {
      ...eventDetails?.pricing,
      ticketPools: Array.isArray(eventDetails?.pricing?.ticketPools)
        ? eventDetails.pricing.ticketPools
        : [],
    },
  }));

  const [pools, setPools] = useState(formData.pricing.ticketPools);
  const [useTicketPools, setUseTicketPools] = useState(pools.length > 0);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...eventDetails,
      eventImage: eventDetails?.eventImage || "",
      pricing: {
        ...eventDetails?.pricing,
        ticketPools: Array.isArray(eventDetails?.pricing?.ticketPools)
          ? eventDetails.pricing.ticketPools
          : [],
      },
    }));
    setPools(
      Array.isArray(eventDetails?.pricing?.ticketPools)
        ? eventDetails.pricing.ticketPools
        : []
    );
    setUseTicketPools(eventDetails?.pricing?.ticketPools?.length > 0);
  }, [eventDetails]);

  const handleChange = (field, value, nestedField = null) => {
    setFormData((prev) => {
      if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const getModifiedFields = (original, updated) => {
    const result = {};

    Object.keys(updated).forEach((key) => {
      if (
        typeof updated[key] === 'object' &&
        updated[key] !== null &&
        !(updated[key] instanceof File)
      ) {
        if (Array.isArray(updated[key])) {
          if (
            JSON.stringify(original[key] || []) !== JSON.stringify(updated[key])
          ) {
            result[key] = updated[key];
          }
        } else {
          const nestedDiff = getModifiedFields(original[key] || {}, updated[key]);
          if (Object.keys(nestedDiff).length > 0) {
            result[key] = nestedDiff;
          }
        }
      } else if (updated[key] !== original[key]) {
        result[key] = updated[key];
      }
    });

    return result;
  };

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      pricing: {
        ...formData.pricing,
        ticketPools: pools,
      },
    };

    const originalData = {
      ...eventDetails,
      pricing: {
        ...eventDetails.pricing,
        ticketPools: eventDetails.pricing?.ticketPools || [],
      },
    };

    const changes = getModifiedFields(originalData, updatedData);

    if (Object.keys(changes).length === 0) {
      console.log("No changes to update.");
      return;
    }

    changes._id = formData._id;

    console.log("Sending changes:", changes);

    const success = await updateEvent(changes);
    if (success) {
      fetchEventDetails(formData._id);
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">{t('eventEditForm.generalInfo')}</Typography>
          <EventDetailsForm
            title={formData.title}
            setTitle={(value) => handleChange('title', value)}
            description={formData.description}
            setDescription={(value) => handleChange('description', value)}
            eventDate={formData.eventDate ? formData.eventDate.split('T')[0] : ''}
            setEventDate={(value) => handleChange('eventDate', value)}
            startTime={formData.startTime}
            setStartTime={(value) => handleChange('startTime', value)}
            eventImage={formData.eventImage || ''}
            setEventImage={(value) => handleChange('eventImage', value || "")}
            ageRestriction={formData.ageRestriction}
            setAgeRestriction={(value) => handleChange('ageRestriction', value)}
            eventType={formData.eventType}
            setEventType={(value) => handleChange('eventType', value)}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">{t('eventEditForm.address')}</Typography>
          <AddressForm
            address={formData.address || {}}
            onChange={(updatedAddress) => handleChange('address', updatedAddress)}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">{t('eventEditForm.pricing')}</Typography>
          <PricingOptions
            useTicketPools={useTicketPools}
            setUseTicketPools={setUseTicketPools}
            ticketPrice={formData.pricing?.ticketPrice}
            setTicketPrice={(value) => handleChange('pricing', value, 'ticketPrice')}
            limitTickets={formData.pricing?.limitTickets}
            setLimitTickets={(value) => handleChange('pricing', value, 'limitTickets')}
            ticketLimit={formData.pricing?.ticketLimit}
            setTicketLimit={(value) => handleChange('pricing', value, 'ticketLimit')}
            pools={pools}
            setPools={setPools}
            errors={{}}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                color="primary"
              />
            }
            label={
              formData.isActive
                ? t('eventEditForm.active')
                : t('eventEditForm.inactive')
            }
          />
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={updating}
        >
          {updating ? t('eventEditForm.saving') : t('eventEditForm.saveButton')}
        </Button>
      </Box>

      {updateError && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {t('eventEditForm.error', { error: updateError })}
        </Typography>
      )}
    </Box>
  );
};

export default EventEditForm;
