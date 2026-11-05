import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, keyframes } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { JET_BLACK_DEEP, BORDER, ACCENT, ACCENT_2 } from '../theme';

const drift = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -30px) scale(1.12); }
  100% { transform: translate(-20px, 25px) scale(.95); }
`;

const glows = {
  right: { right: -180, top: -120, color: ACCENT },
  left: { left: -200, bottom: -140, color: ACCENT_2 },
};

/**
 * Page section shell: anchor id, background, drifting glow, container and header.
 * variant: 'default' | 'alt' (slightly deeper black) · glow: 'right' | 'left' | 'none'
 */
export default function Section({ id, eyebrow, title, highlight, subtitle, align = 'center', variant = 'default', glow = 'right', children }) {
  const orb = glows[glow];

  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 14 },
        scrollMarginTop: 64,
        bgcolor: variant === 'alt' ? JET_BLACK_DEEP : 'background.default',
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      {orb && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: '50%',
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${alpha(orb.color, 0.13)} 0%, transparent 65%)`,
            filter: 'blur(30px)',
            animation: `${drift} 16s ease-in-out infinite alternate`,
            pointerEvents: 'none',
          }}
        />
      )}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {title && (
          <Reveal>
            <SectionHeader eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} align={align} />
          </Reveal>
        )}
        {children}
      </Container>
    </Box>
  );
}
