import React from 'react';
import { Container, Typography, Box, Divider, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation('gdpr');
  const currentYear = new Date().getFullYear();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Last Updated: May 15, {currentYear}
      </Typography>

      <Box mt={4}>
        <Typography variant="body1" paragraph>
          At Hambax GmbH ("we", "us", "our"), we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
        </Typography>
        <Typography variant="body1" paragraph>
          Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Section title="1. Information We Collect">
        <Typography variant="body1" paragraph>
          We collect several types of information from and about users of our services, including:
        </Typography>
        <SubSection title="1.1 Personal Data">
          <Typography variant="body1" paragraph>
            Personal data refers to any information that identifies you as an individual. We may collect the following personal data:
          </Typography>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Account information (username, password)</li>
            <li>Profile information (organization name, address, tax identification number)</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Identity verification information</li>
          </ul>
        </SubSection>
        <SubSection title="1.2 Usage Data">
          <Typography variant="body1" paragraph>
            We automatically collect certain information about how you interact with our services, including:
          </Typography>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring websites</li>
            <li>Click patterns</li>
          </ul>
        </SubSection>
        <SubSection title="1.3 Cookies and Similar Technologies">
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to track activity on our services and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
          </Typography>
          <Typography variant="body1" paragraph>
            For more information about our cookie usage, please see our <Link component={RouterLink} to="/cookie-policy">Cookie Policy</Link>.
          </Typography>
        </SubSection>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="2. How We Use Your Information">
        <Typography variant="body1" paragraph>
          We use the information we collect for various purposes, including:
        </Typography>
        <ul>
          <li>To provide and maintain our services</li>
          <li>To process transactions and manage your account</li>
          <li>To improve and personalize your experience</li>
          <li>To communicate with you about updates, support, and promotional offers</li>
          <li>To monitor usage patterns and analyze trends</li>
          <li>To detect, prevent, and address technical issues and security breaches</li>
          <li>To comply with legal obligations</li>
        </ul>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="3. Legal Basis for Processing">
        <Typography variant="body1" paragraph>
          We process your personal data based on one or more of the following legal grounds:
        </Typography>
        <ul>
          <li><strong>Performance of a Contract:</strong> Processing necessary for the performance of a contract with you</li>
          <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, provided those interests are not overridden by your rights</li>
          <li><strong>Legal Obligation:</strong> Processing necessary to comply with a legal obligation</li>
          <li><strong>Consent:</strong> Processing based on your specific consent</li>
        </ul>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="4. Data Sharing and Disclosure">
        <Typography variant="body1" paragraph>
          We may share your information with:
        </Typography>
        <ul>
          <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (payment processing, data analysis, email delivery, hosting services)</li>
          <li><strong>Business Partners:</strong> Partners with whom we jointly offer products or services</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
        <Typography variant="body1" paragraph>
          We do not sell your personal data to third parties.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="5. Data Retention">
        <Typography variant="body1" paragraph>
          We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </Typography>
        <Typography variant="body1" paragraph>
          To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process the data, and applicable legal requirements.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="6. Your Data Protection Rights">
        <Typography variant="body1" paragraph>
          Under the General Data Protection Regulation (GDPR), you have the following rights:
        </Typography>
        <ul>
          <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
          <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <Typography variant="body1" paragraph>
          To exercise any of these rights, please contact us at <Link href="mailto:privacy@hambax.com">privacy@hambax.com</Link> or visit our <Link component={RouterLink} to="/data-access-request">Data Access Request</Link> page.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="7. Data Security">
        <Typography variant="body1" paragraph>
          We have implemented appropriate technical and organizational measures to secure your personal data from accidental loss, unauthorized access, use, alteration, or disclosure. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="8. International Data Transfers">
        <Typography variant="body1" paragraph>
          Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
        </Typography>
        <Typography variant="body1" paragraph>
          If you are located outside Germany and choose to provide information to us, please note that we transfer the data to Germany and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="9. Children's Privacy">
        <Typography variant="body1" paragraph>
          Our services are not intended for use by children under the age of 16. We do not knowingly collect personal data from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="10. Changes to This Privacy Policy">
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </Typography>
        <Typography variant="body1" paragraph>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </Typography>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="11. Contact Us">
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us:
        </Typography>
        <Typography variant="body1" paragraph>
          By email: <Link href="mailto:privacy@hambax.com">privacy@hambax.com</Link>
        </Typography>
        <Typography variant="body1" paragraph>
          By mail: Hambax GmbH, Musterstraße 123, 10115 Berlin, Germany
        </Typography>
        <Typography variant="body1" paragraph>
          By using our <Link component={RouterLink} to="/data-access-request">Data Access Request</Link> form
        </Typography>
      </Section>
    </Container>
  );
};

// Helper components for sections and subsections
const Section = ({ title, children }) => (
  <Box mb={3}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

const SubSection = ({ title, children }) => (
  <Box mb={2} ml={2}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

export default PrivacyPolicyPage;
