import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

var steps = ["Ready to deliver", "On the road", "Delivered"];

export default function HorizontalLabelPositionBelowStepper({ steps }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export const ShipmentItem = ({ package_, index }) => {
  const [steps, setSteps] = useState([
    "Ready to deliver (current progress)",
    "On the road (" + package_.DISTANCE + "KM)",
    "Successfully delivered in " + package_.LOCATION_NAME,
  ]);

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Typography sx={{ padding: "1rem" }} variant="h5">
        Stop #{index} for package #{package_.PACKAGE_ID} | {package_.NAME} |{" "}
        Location: {package_.LOCATION_NAME} |{" "}
        <LocalShippingIcon fontSize="20px" /> {package_.DISTANCE}KM away
      </Typography>
      <HorizontalLabelPositionBelowStepper steps={steps} />
    </Box>
  );
};
