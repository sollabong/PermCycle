import React, { useState } from 'react';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
} from '@mui/material';
import '@fontsource/lekton/400.css';
import { calculateSimplifiedPermutation } from '../api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#03DAC5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => {
  const [cycleCount, setCycleCount] = useState(2);
  const [cycles, setCycles] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [countError, setCountError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const validateCycleCount = (value: string) => {
    const count = Number(value);
    if (isNaN(count) || count < 1 || count > 9) {
      setCountError('Ciklusok száma egy szám kell, hogy legyen 1 és 9 között.');
      return false;
    }
    setCountError('');
    return true;
  };

  const validateCycles = (newCycles: string[]) => {
    const newErrors = newCycles.map((cycle) => {
      if (cycle === '') return '';
      if (!/^\d+$/.test(cycle)) return 'Csak számok megengedettek.';
      return '';
    });
    setErrors(newErrors);
    return newErrors.every((err) => err === '');
  };

  const handleCyclesCounterChange = (value: string) => {
    const target = Number(value);
    if (!validateCycleCount(value)) return;
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
    validateCycles(
      cycles.map((cycle, i) => (i === index ? value : cycle))
    );
    console.log('cycles ', cycles);
  };

  const renderCycleInputs = () => {
    const inputs = [];
    for (let i = 0; i < cycleCount; i++) {
      inputs.push(
        <TextField
          key={i}
          label={`Ciklus ${i + 1}, pl 12345`}
          variant="outlined"
          color="secondary"
          fullWidth
          value={cycles[i] || ''}
          onChange={(e) => handleCycleChange(i, e.target.value)}
          sx={{ marginTop: 2 }}
          error={!!errors[i]}
          helperText={errors[i]}
        />
      );
    }
    return inputs;
  };

  const calculate = async () => {
    if (errors.some((err) => err) || countError) return;
    try {
      const data = await calculateSimplifiedPermutation(cycles);
      setResult(data.result || 'Nincs megoldás');
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
            padding: '32px',
            margin: '32px',
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              color="secondary"
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
                label="Ciklusok száma (2-től 9-ig)"
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{
                  margin: '16px 0px 0px 0px',
                }}
                error={!!countError}
                helperText={countError}
                onChange={(e) =>
                  handleCyclesCounterChange(e.target.value)
                }
              />
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{
              padding: '16px',
              margin: '16px',
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{
                  paddingBottom: '16px',
                }}
              >
                Add meg a ciklusokat
              </Typography>
              {renderCycleInputs()}
            </CardContent>
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
              color="secondary"
              onClick={calculate}
              disabled={!!countError || errors.some((err) => err)}
              sx={{
                width: '100%',
                margin: '16px',
              }}
            >
              Számolás
            </Button>
          </Box>
            <Card
              elevation={4}
              sx={{
                padding: '16px',
                margin: '16px',
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  color="secondary"
                  sx={{
                    textAlign: 'center',
                    paddingBottom: '16px',
                    fontFamily: 'lekton',
                  }}
                >
                  Eredmény
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {result}
                </Typography>
              </CardContent>
            </Card>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default App;
