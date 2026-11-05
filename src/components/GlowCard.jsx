import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { SURFACE, BORDER, ACCENT, EASE } from '../theme';

function trackPointer(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

/**
 * Dark surface with a soft teal spotlight that follows the cursor.
 * Set `lift={false}` for large cards that shouldn't move on hover.
 */
export default function GlowCard({ children, lift = true, sx, ...rest }) {
  return (
    <Box
      onMouseMove={trackPointer}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        bgcolor: SURFACE,
        border: `1px solid ${BORDER}`,
        transition: `transform .45s ${EASE}, border-color .3s ease, box-shadow .45s ${EASE}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${alpha(ACCENT, 0.1)}, transparent 45%)`,
          opacity: 0,
          transition: 'opacity .35s ease',
          pointerEvents: 'none',
        },
        '& > *': { position: 'relative', zIndex: 1 },
        '&:hover': {
          borderColor: alpha(ACCENT, 0.35),
          boxShadow: `0 24px 50px ${alpha('#000', 0.45)}`,
          ...(lift && { transform: 'translateY(-6px)' }),
          '&::before': { opacity: 1 },
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
