import { useTranslation } from "react-i18next";
import useAuth from "./useAuth";

const useActionRestriction = () => {
    const { t } = useTranslation();
    const { isBasicRegistrationComplete, showRestrictionModal, profileData } = useAuth();

    const checkRestriction = (action) => {
        if (!isBasicRegistrationComplete) {
            showRestrictionModal(t("actionRestriction.completeRegistration"));
            return false;
        }

        if (!profileData?.stripeOnboardingCompleted) {
            showRestrictionModal(t("actionRestriction.completeStripeOnboarding"));
            return false;
        }

        return true;
    };

    return { checkRestriction };
};

export default useActionRestriction;
