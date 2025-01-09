import React, { useState } from "react";
import { Container, Typography, Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import PersonalInfoStep from "../components/Registration/PersonalInfoStage";
import AddressStep from "../components/Registration/AddressStage";
import ContactInfoStep from "../components/Registration/ContactInfoStage";
import useCompleteRegistration from "../hooks/useCompleteRegistration";
import { useNavigate } from "react-router-dom";
import {
  validatePersonalInfoStep,
  validateAddressStep,
  validateContactInfoStep,
} from "../utils/validation";

const CompleteRegistrationPage = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    citizenship: "",
    language: "",
    dateOfBirth: "",
    gender: "",
    taxIdentificationNumber: "",
    country: "",
    city: "",
    zipCode: "",
    streetName: "",
    houseNumber: "",
    phone: "",
    website: "",
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Импортируем хук
  const {
    isLoading,
    errorMessage,
    successMessage,
    completeRegistration,
  } = useCompleteRegistration();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateStep = () => {
    let validationErrors = {};
    switch (activeStep) {
      case 0:
        validationErrors = validatePersonalInfoStep(formData);
        break;
      case 1:
        validationErrors = validateAddressStep(formData);
        break;
      case 2:
        validationErrors = validateContactInfoStep(formData);
        break;
      default:
        break;
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 2) {
        // Вызов хука для отправки данных, если это последний шаг
        completeRegistration(formData);
        navigate("/admin");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          {t("registration.title")}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step><StepLabel>{t("registration.progress.step1")}</StepLabel></Step>
          <Step><StepLabel>{t("registration.progress.step2")}</StepLabel></Step>
          <Step><StepLabel>{t("registration.progress.step3")}</StepLabel></Step>
        </Stepper>

        <Box mt={3}>
          {activeStep === 0 && (
            <PersonalInfoStep formData={formData} handleChange={handleChange} errors={errors} />
          )}
          {activeStep === 1 && (
            <AddressStep formData={formData} handleChange={handleChange} errors={errors} />
          )}
          {activeStep === 2 && (
            <ContactInfoStep formData={formData} handleChange={handleChange} errors={errors} />
          )}
        </Box>

        {errorMessage && (
          <Typography color="error" variant="body2" align="center" mt={2}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="body2" align="center" mt={2}>
            {successMessage}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button onClick={handleBack} disabled={activeStep === 0 || isLoading}>
            {t("registration.back")}
          </Button>
          <Button
            onClick={handleNext}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {activeStep === 2 ? t("registration.submit") : t("registration.next")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CompleteRegistrationPage;
