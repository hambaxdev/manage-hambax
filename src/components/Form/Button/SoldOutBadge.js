import React from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const SoldOutBadge = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: "8px 16px",
        border: "1px solid #e28743",
        borderRadius: "4px",
        color: "#e28743",
        backgroundColor: "rgba(226, 135, 67, 0.1)",
        textAlign: "center",
      }}
    >
      {t("soldOut")}
    </Box>
  );
};

export default SoldOutBadge;
