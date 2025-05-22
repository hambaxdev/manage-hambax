import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DataAccessRequestPage = () => {
  const { t } = useTranslation('gdpr');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    requestType: 'access',
    details: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('dataAccessRequest.form.errors.firstName', 'First name is required');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('dataAccessRequest.form.errors.lastName', 'Last name is required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('dataAccessRequest.form.errors.emailRequired', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('dataAccessRequest.form.errors.emailInvalid', 'Email is invalid');
    }

    if (formData.requestType === 'other' && !formData.details.trim()) {
      newErrors.details = t('dataAccessRequest.form.errors.detailsRequired', 'Please provide details about your request');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, this would send the data to a server
      console.log('Form submitted:', formData);

      // Show success message
      setSubmitted(true);
      setSnackbarOpen(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        requestType: 'access',
        details: ''
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('dataAccessRequest.title')}
      </Typography>

      <Box mt={4} mb={4}>
        <Typography variant="body1" paragraph>
          {t('dataAccessRequest.description')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Paper elevation={3} sx={{ p: 4 }}>
        {submitted ? (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('dataAccessRequest.form.success')}
            </Alert>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setSubmitted(false)}
            >
              {t('dataAccessRequest.form.submitAnother', 'Submit Another Request')}
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                {t('dataAccessRequest.form.personalInfo', 'Personal Information')}
              </Typography>
              <TextField
                fullWidth
                label={t('dataAccessRequest.form.name', 'Full Name')}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
              <TextField
                fullWidth
                label={t('dataAccessRequest.form.lastName', 'Last Name')}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
              <TextField
                fullWidth
                label={t('dataAccessRequest.form.email', 'Email Address')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                {t('dataAccessRequest.form.requestType', 'Request Type')}
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('dataAccessRequest.form.requestTypeQuestion', 'What would you like to do?')}</FormLabel>
                <RadioGroup
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                >
                  <FormControlLabel 
                    value="access" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.access')} 
                  />
                  <FormControlLabel 
                    value="correction" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.correction')} 
                  />
                  <FormControlLabel 
                    value="deletion" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.deletion')} 
                  />
                  <FormControlLabel 
                    value="restrict" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.restrict', 'Restrict processing of my data')} 
                  />
                  <FormControlLabel 
                    value="object" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.object', 'Object to processing of my data')} 
                  />
                  <FormControlLabel 
                    value="portability" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.portability', 'Data portability (transfer my data to another controller)')} 
                  />
                  <FormControlLabel 
                    value="other" 
                    control={<Radio />} 
                    label={t('dataAccessRequest.form.requestTypes.other', 'Other (please specify)')} 
                  />
                </RadioGroup>
              </FormControl>

              {formData.requestType === 'other' && (
                <TextField
                  fullWidth
                  label={t('dataAccessRequest.form.message', 'Additional Information')}
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  error={!!errors.details}
                  helperText={errors.details}
                  required
                />
              )}
            </Box>

            <Box mt={4}>
              <Typography variant="body2" color="textSecondary" paragraph>
                {t('dataAccessRequest.form.processingInfo', 'We will process your request within 30 days of receipt. In some cases, we may need additional information to verify your identity before proceeding with your request.')}
              </Typography>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
              >
                {t('dataAccessRequest.form.submit')}
              </Button>
            </Box>
          </form>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={t('dataAccessRequest.form.submittedMessage', 'Your request has been submitted')}
      />
    </Container>
  );
};

export default DataAccessRequestPage;
