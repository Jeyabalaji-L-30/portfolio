import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import GlowCard from './GlowCard';
import IconBadge from './IconBadge';
import { ACCENT, GRADIENT, EASE } from '../theme';

/**
 * Glow card with optional icon, tag, outlined index number, title and subtitle.
 * Extra content goes in `children`.
 */
export default function HoverCard({ icon, tag, number, title, subtitle, children }) {
  return (
    <GlowCard
      sx={{
        height: '100%',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          background: GRADIENT,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform .5s ${EASE}`,
        },
        '&:hover::after': { transform: 'scaleX(1)' },
        '&:hover .hover-number': { WebkitTextStroke: `1px ${alpha(ACCENT, 0.6)}`, transform: 'translateY(-4px)' },
      }}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
        {number && (
          <Typography
            aria-hidden
            className="hover-number"
            sx={{
              position: 'absolute',
              top: 16,
              right: 24,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: '3.5rem',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `1px ${alpha(ACCENT, 0.25)}`,
              transition: `all .4s ${EASE}`,
            }}
          >
            {number}
          </Typography>
        )}
        {icon && (
          <Box sx={{ mb: 2.5 }}>
            <IconBadge icon={icon} />
          </Box>
        )}
        {tag && (
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {tag}
          </Typography>
        )}
        <Typography variant="h6" component="h3" sx={{ lineHeight: 1.35, mt: tag ? 0.75 : 0 }}>
          {title}
        </Typography>
        {subtitle && <Typography sx={{ mt: 1, color: 'text.secondary' }}>{subtitle}</Typography>}
        {children && <Box sx={{ mt: 2.5 }}>{children}</Box>}
      </Box>
    </GlowCard>
  );
}
