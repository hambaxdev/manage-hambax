import { useTranslation } from "react-i18next";
import useAuth from "./useAuth";

const useActionRestriction = () => {
    const { t } = useTranslation();
    const {
        isBasicRegistrationComplete,
        profileData,
        showRestrictionModal,
        loading,
    } = useAuth();

    const checkRestriction = (action) => {
        if (loading || profileData?.stripeOnboardingCompleted === undefined) {
            console.debug("Данные ещё загружаются. Блокируем действие:", action);
            return false;
        }

        if (!isBasicRegistrationComplete) {
            showRestrictionModal(t("actionRestriction.completeRegistration"));
            return false;
        }

        if (!profileData.stripeOnboardingCompleted) {
            showRestrictionModal(t("actionRestriction.completeStripeOnboarding"));
            return false;
        }

        return true;
    };

    return { checkRestriction };
};

export default useActionRestriction;
