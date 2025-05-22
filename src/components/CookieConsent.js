import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Switch,
  Snackbar,
  Paper,
  Link
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

// Cookie consent options
const COOKIE_CONSENT_KEY = 'hambax_cookie_consent';

const CookieConsent = () => {
  const { t } = useTranslation('gdpr');
  const [open, setOpen] = useState(false);
  const [openCustomize, setOpenCustomize] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false
  });

  // Check if user has already set cookie preferences
  useEffect(() => {
    const storedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedPreferences) {
      setOpen(true);
    } else {
      const parsedPreferences = JSON.parse(storedPreferences);
      setPreferences(parsedPreferences);

      // Disable Google Analytics if analytics cookies are not accepted
      if (!parsedPreferences.analytics && window.gtag) {
        window['ga-disable-G-CM9C6BWEET'] = true;
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setOpen(false);
    setSnackbarOpen(true);

    // Enable Google Analytics
    if (window.gtag) {
      window['ga-disable-G-CM9C6BWEET'] = false;
    }
  };

  const handleDeclineAll = () => {
    const newPreferences = {
      necessary: true, // Always required
      analytics: false,
      marketing: false
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setOpen(false);
    setSnackbarOpen(true);

    // Disable Google Analytics
    if (window.gtag) {
      window['ga-disable-G-CM9C6BWEET'] = true;
    }
  };

  const handleCustomize = () => {
    setOpenCustomize(true);
    setOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    setOpenCustomize(false);
    setSnackbarOpen(true);

    // Enable/disable Google Analytics based on preferences
    if (window.gtag) {
      window['ga-disable-G-CM9C6BWEET'] = !preferences.analytics;
    }
  };

  const handlePreferenceChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Main Cookie Consent Banner */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          p: 2,
          display: open ? 'flex' : 'none',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          borderRadius: 0
        }}
      >
        <Box sx={{ flex: 1, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: '1rem' }}>
            {t('cookieConsent.title')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('cookieConsent.message')}
          </Typography>
          <Link component={RouterLink} to="/privacy-policy" sx={{ fontSize: '0.875rem' }}>
            {t('cookieConsent.moreInfo')}
          </Link>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          alignItems: { xs: 'stretch', sm: 'center' }
        }}>
          <Button onClick={handleDeclineAll} color="inherit" size="small" variant="outlined">
            {t('cookieConsent.decline')}
          </Button>
          <Button onClick={handleCustomize} color="primary" size="small" variant="outlined">
            {t('cookieConsent.customize')}
          </Button>
          <Button onClick={handleAcceptAll} variant="contained" color="primary" size="small">
            {t('cookieConsent.accept')}
          </Button>
        </Box>
      </Paper>

      {/* Customize Preferences Dialog */}
      <Dialog
        open={openCustomize}
        onClose={() => setOpenCustomize(false)}
        aria-labelledby="cookie-preferences-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="cookie-preferences-dialog-title">{t('cookieConsent.title')}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.necessary}
                  disabled
                  name="necessary"
                />
              }
              label={t('cookieConsent.necessary')}
            />
            <Typography variant="caption" color="textSecondary" paragraph>
              {t('cookieConsent.necessaryDescription')}
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.analytics}
                  onChange={handlePreferenceChange}
                  name="analytics"
                />
              }
              label={t('cookieConsent.analytics')}
            />
            <Typography variant="caption" color="textSecondary" paragraph>
              {t('cookieConsent.analyticsDescription')}
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.marketing}
                  onChange={handlePreferenceChange}
                  name="marketing"
                />
              }
              label={t('cookieConsent.marketing')}
            />
            <Typography variant="caption" color="textSecondary" paragraph>
              {t('cookieConsent.marketingDescription')}
            </Typography>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCustomize(false)} color="inherit">
            {t('cookieConsent.decline')}
          </Button>
          <Button onClick={handleSavePreferences} variant="contained" color="primary">
            {t('cookieConsent.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={t('cookieConsent.title')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default CookieConsent;
