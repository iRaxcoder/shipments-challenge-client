import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import { useFetch } from "../../hooks/useFetch";
import { ShipmentItem } from "../../components/Shipments/ShipmentItem";

export const Main = () => {
  const [pendingPackages, setPendingPackages] = useState();
  const { data, errors, isLoading, reload } = useFetch("/packages/get-pending");

  useEffect(() => {
    setPendingPackages(data);
    return () => {};
  }, [data]);

  return (
    <div>
      {isLoading || data.length === 0 ? (
        <Typography sx={{ mb: 1 }} variant="h4">
          {isLoading && "Loading shipments"}
          {data.length === 0 && "Waiting for added packages"}
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ mt: "1rem", mb: "1rem", textAlign: "center" }}
            variant="h4"
          >
            Stops for each package
          </Typography>

          {pendingPackages.map((package_, index) => (
            <ShipmentItem key={index} index={index + 1} package_={package_} />
          ))}
        </>
      )}
    </div>
  );
};
