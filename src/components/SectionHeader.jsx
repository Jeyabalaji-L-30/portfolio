import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GRADIENT, gradientText } from '../theme';

const line = { content: '""', width: 28, height: 2, borderRadius: 2, background: GRADIENT };

/** Eyebrow + title (last words in gradient) + optional subtitle, used at the top of every section. */
export default function SectionHeader({ eyebrow, title, highlight, subtitle, align = 'center' }) {
  const centered = align === 'center';

  return (
    <Box sx={{ textAlign: align, mb: { xs: 5, md: 7 }, maxWidth: centered ? 680 : 'none', mx: centered ? 'auto' : 0 }}>
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            color: 'primary.main',
            '&::before': line,
            ...(centered && { '&::after': line }),
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '2.8rem' }, lineHeight: 1.2, mt: 1 }}>
        {title}
        {highlight && (
          <>
            {' '}
            <Box component="span" sx={gradientText}>
              {highlight}
            </Box>
          </>
        )}
      </Typography>
      {subtitle && <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>{subtitle}</Typography>}
    </Box>
  );
}
