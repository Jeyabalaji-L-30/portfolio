import { createTheme, alpha } from '@mui/material/styles';

// Jet black: CMYK 0,0,0,89 · RGB 29,29,29
export const JET_BLACK = '#1D1D1D';
export const JET_BLACK_DEEP = '#171717';
export const SURFACE = '#252525';
export const ACCENT = '#14B8A6';
export const ACCENT_2 = '#22D3EE';
export const GRADIENT = `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_2} 100%)`;
export const BORDER = alpha('#FFFFFF', 0.08);
export const EASE = 'cubic-bezier(.22, 1, .36, 1)';

/** Spread into `sx` to fill text with the teal → cyan gradient. */
export const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT, contrastText: JET_BLACK },
    secondary: { main: ACCENT_2, contrastText: '#fff' },
    background: { default: JET_BLACK, paper: SURFACE },
    text: { primary: '#F4F4F4', secondary: '#A6A6A6' },
    divider: BORDER,
  },
  // sx radius values multiply this: 2 → 8px, 3 → 12px, 4 → 16px
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h6: { fontWeight: 600 },
    overline: { fontWeight: 600, letterSpacing: '0.2em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: JET_BLACK },
        '::selection': { background: ACCENT, color: JET_BLACK },
        '::-webkit-scrollbar': { width: 10 },
        '::-webkit-scrollbar-track': { background: JET_BLACK_DEEP },
        '::-webkit-scrollbar-thumb': { background: '#3A3A3A', borderRadius: 10, border: `2px solid ${JET_BLACK_DEEP}` },
        '::-webkit-scrollbar-thumb:hover': { background: ACCENT },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 28,
          paddingBlock: 12,
          transition: `transform .3s ${EASE}, box-shadow .3s ${EASE}, background-color .3s, border-color .3s, color .3s`,
          '&:hover': { transform: 'translateY(-3px)' },
        },
        containedPrimary: {
          background: GRADIENT,
          color: JET_BLACK,
          '&:hover': { background: GRADIENT, boxShadow: `0 12px 32px ${alpha(ACCENT_2, 0.4)}` },
        },
        outlined: {
          borderWidth: 1.5,
          borderColor: alpha('#fff', 0.25),
          color: '#fff',
          '&:hover': { borderWidth: 1.5, borderColor: ACCENT, color: ACCENT, backgroundColor: alpha(ACCENT, 0.06) },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500, borderRadius: 999 } },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: SURFACE, border: `1px solid ${BORDER}`, fontSize: '.8rem' } },
    },
  },
});

export default theme;
