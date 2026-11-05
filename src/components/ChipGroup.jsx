import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { BORDER, ACCENT } from '../theme';

/** Wrapping list of pill-shaped tags. */
export default function ChipGroup({ items, size = 'medium' }) {
  return (
    <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          size={size}
          sx={{
            bgcolor: alpha('#fff', 0.04),
            color: 'text.primary',
            border: `1px solid ${BORDER}`,
            transition: 'all .25s ease',
            '&:hover': { borderColor: alpha(ACCENT, 0.5), color: 'primary.main', bgcolor: alpha(ACCENT, 0.08) },
          }}
        />
      ))}
    </Stack>
  );
}
