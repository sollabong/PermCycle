import React, { useState } from 'react';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
} from '@mui/material';
import '@fontsource/lekton/400.css';
import { calculateSimplifiedPermutation } from '../api';

const darkTheme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => {
  const [cycleCount, setCycleCount] = useState(0);
  const [cycles, setCycles] = useState<string[]>([]);
  const [arrayToRenderCycles, setArrayToRenderCycles] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const [stepVisualization, setStepVisualization] = useState<string[]>([]);

  const handleCyclesCounterChange = (e: CustomEvent) => {
    // const numberOfCycles = e.value;
    // setCycleCount(numberOfCycles)
  };

  const handleCycleCounter = (target: number) => {
    const count = Math.max(1, Math.min(9, target || 1));
    setCycles((prev) => Array.from({ length: count }, (_, i) => prev[i] || ''));
    setCycleCount(count);
  };

  const handleCycleChange = (index: number, value: string) => {
    setCycles((prev) => {
      const newCycles = [...prev];
      newCycles[index] = value;
      return newCycles;
    });
    console.log('cycles ', cycles);
  };

  const calculate = async () => {
    console.log("klikk")
    try {
      const data = await calculateSimplifiedPermutation(cycles);
      console.log("data ", data);
      if (data['minimizedExpression'] === '') {
        setResult('Nincs megoldás');
      }
      setResult(data.result || 'Hiba történt');
      setStepVisualization(data.steps || []);
    } catch (error) {
      setResult('Hiba történt a szerverrel való kommunikáció során.');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: '600px',
            backgroundColor: 'grey',
            padding: '32px',
            margin: '32px',
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                paddingBottom: '16px',
                fontFamily: 'lekton',
              }}
            >
              PermCycle Calculator
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
              }}
            >
              Permutáció megadása páronként idegen ciklusok szorzataként
            </Typography>
          </CardContent>
          <Card
            elevation={4}
            sx={{
              backgroundColor: 'darkgrey',
              padding: '16px',
              margin: '16px',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">
                Add meg a ciklusok számát!
              </Typography>
              <TextField
                id="outlined-basic"
                label="Ciklusok száma (1-től 9-ig)"
                variant="outlined"
                fullWidth
                sx={{
                  margin: '16px 0px 0px 0px',
                }}
                onChange={(e) => handleCycleCounter(Number(e.target.value))}
              />
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{
              backgroundColor: 'darkgrey',
              padding: '16px',
              margin: '16px',
            }}
          >
            {cycles.length > 0 && (
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    paddingBottom: '16px',
                  }}
                >
                  Add meg a ciklusokat
                </Typography>
                {cycles.map((_, index) => (
                  <TextField
                    id="outlined-basic"
                    label={`Ciklus ${index + 1}, pl 12345`}
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      handleCycleChange(Number(index), e.target.value)
                    }
                    sx={{
                      margin: '0px 0px 16px 0px',
                    }}
                  />
                ))}
              </CardContent>
            )}
          </Card>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={calculate}
              sx={{
                width: '100%',
                margin: '16px',
              }}
            >
              Számolás
            </Button>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default App;
