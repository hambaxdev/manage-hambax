import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubscribeButton = ({ onSubscribe }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onSubscribe}
      sx={{
        marginTop: 2,
        backgroundColor: "#e28743",
        "&:hover": {
          backgroundColor: "#c76b36",
        },
      }}
    >
      {t("organization.subscribe")}
    </Button>
  );
};

export default SubscribeButton;
