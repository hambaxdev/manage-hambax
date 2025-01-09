import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import useForgotPassword from '../hooks/useForgotPassword';
import EmailInputComponent from '../components/EmailInputComponent';
import CodeInputComponent from '../components/CodeInputComponent';
import PasswordResetComponent from '../components/PasswordResetComponent';

const ForgotPasswordScreen = () => {
  const {
    isLoading,
    apiMessage,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
  } = useForgotPassword();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onSendCode = async () => {
    const success = await handleSendCode(email);
    if (success) setIsCodeSent(true);
  };

  const onCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (newCode.join('').length === 4) handleVerifyCode(email, newCode.join(''));
  };

  const onResetPassword = async () => {
    await handleResetPassword(email, newPassword, confirmPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Забыли пароль?
        </Typography>
        {apiMessage && <Alert severity="info">{apiMessage}</Alert>}

        {!isCodeSent && (
          <EmailInputComponent
            email={email}
            onEmailChange={(e) => setEmail(e.target.value)}
            onSendCode={onSendCode}
            isLoading={isLoading}
          />
        )}

        {isCodeSent && !isCodeValid && (
          <CodeInputComponent code={code} onCodeChange={onCodeChange} />
        )}

        {isCodeValid && (
          <PasswordResetComponent
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={(e) => setNewPassword(e.target.value)}
            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            onResetPassword={onResetPassword}
            isLoading={isLoading}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        )}
      </Box>
    </Container>
  );
};

export default ForgotPasswordScreen;
