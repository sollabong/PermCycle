import React, { useState } from "react";
import {
  CssBaseline,
  Container,

  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const App = () => {
  const [cycleCount, setCycleCount] = useState(1);
  const [cycles, setCycles] = useState<string[]>([""]);
  const [result, setResult] = useState<string>("");
  const [stepVisualization, setStepVisualization] = useState<string[]>([]);

  const handleCycleCountChange = () => {

  };

  const handleCycleChange = () => {

  };

  const calculate = async () => {

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        
      </Container>
    </ThemeProvider>
  );
};

export default App;
