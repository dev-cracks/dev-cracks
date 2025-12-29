import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import SigningPage from './pages/SigningPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#f0883e',
    },
    mode: 'light',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SigningPage />} />
        <Route path="/sign" element={<SigningPage />} />
        <Route path="/sign/:token" element={<SigningPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

