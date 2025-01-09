import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const BuyTicketsButton = ({ eventId }) => {
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    window.location.href = `/api/ticket/buy-ticket?eventId=${eventId}`;
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        color: "#e28743",
        borderColor: "#e28743",
        "&:hover": {
          borderColor: "#e28743",
          backgroundColor: "rgba(226, 135, 67, 0.1)",
        },
      }}
    >
      {t("buyTickets")}
    </Button>
  );
};

export default BuyTicketsButton;
