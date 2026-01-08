'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d96c33'
    },
    secondary: {
      main: '#177a78'
    },
    background: {
      default: '#f9f6f1',
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
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
