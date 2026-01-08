'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#07379a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0b7231'
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff'
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a'
    }
  },
  shape: {
    borderRadius: 14
  },
  typography: {
    fontFamily: '"Space Grotesk", "Segoe UI", "Arial", sans-serif',
    h1: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    },
    h2: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    },
    h3: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    },
    h4: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    },
    h5: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    },
    h6: {
      fontFamily: '"Fraunces", "Space Grotesk", serif'
    }
  }
});

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add('is-loaded');
    document.body.classList.remove('is-loading');
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
