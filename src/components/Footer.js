import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {currentYear} Hambax GmbH
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover">
              {t('footer.privacyPolicy')}
            </Link>
            
            <Link component={RouterLink} to="/data-access-request" color="inherit" underline="hover">
              {t('footer.dataRequest')}
            </Link>
            
            <Link href="mailto:privacy@hambax.com" color="inherit" underline="hover">
              {t('footer.contact')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;