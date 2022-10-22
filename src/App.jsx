import "./App.css";
import { Box, Divider, Typography, Tabs, Tab } from "@mui/material";
import { TabPanel } from "./components";
import { useState } from "react";
import { Main as MainPackage } from "./pages/Package";
import { Main as MainShipments } from "./pages/Shipments";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
      className="App"
    >
      <Typography sx={{ padding: "1rem" }} variant="h3">
        Shipments Management
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <Box sx={{ mt: 3, width: { md: "55%", xs: "90%" } }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              sx={{ width: "100%" }}
              value={value}
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Inventory of packages" />
              <Tab label="Shipments" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <MainPackage />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography
              sx={{ mt: "1rem", mb: "1rem", textAlign: "center" }}
              variant="h4"
            >
              <MainShipments />
            </Typography>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
