import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { ACCENT, GRADIENT, JET_BLACK, EASE } from '../theme';

/** Rounded square holding an MUI icon. `filled` uses the gradient background with a black icon. */
export default function IconBadge({ icon: Icon, size = 52, filled = false }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 3,
        display: 'grid',
        placeItems: 'center',
        background: filled ? GRADIENT : alpha(ACCENT, 0.1),
        border: `1px solid ${alpha(ACCENT, filled ? 0 : 0.2)}`,
        color: filled ? JET_BLACK : ACCENT,
        boxShadow: filled ? `0 10px 24px ${alpha(ACCENT, 0.25)}` : 'none',
        transition: `all .4s ${EASE}`,
      }}
    >
      <Icon sx={{ fontSize: size * 0.5 }} />
    </Box>
  );
}
