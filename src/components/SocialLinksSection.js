import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

function SocialLinksSection({ data, onChange }) {
  const { t } = useTranslation();

  const socialLinks = [
    { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
    { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon },
    { key: 'twitter', label: 'Twitter', Icon: TwitterIcon },
    { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('profile.basicInfo.socialMedia')}
        </Typography>
      </Grid>

      {socialLinks.map(({ key, label, Icon }) => (
        <Grid item xs={12} md={6} key={key}>
          <TextField
            label={label}
            name={key}
            value={data[key] || ''}
            onChange={onChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      ))}
    </>
  );
}

export default SocialLinksSection;
