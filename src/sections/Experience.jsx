import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import Section from '../components/Section';
import TimelineItem from '../components/TimelineItem';
import Reveal from '../components/Reveal';
import useInView from '../hooks/useInView';
import { JET_BLACK_DEEP, BORDER, ACCENT, GRADIENT } from '../theme';

const ripple = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, .55); }
  100% { box-shadow: 0 0 0 14px rgba(20, 184, 166, 0); }
`;

// Rail centre sits at 10px (xs) / 18px (md) from the left; items are padded 32px / 56px.
const RAIL_LEFT = { xs: 9, md: 17 };
const ITEM_PAD = { xs: 4, md: 7 };
const DOT_LEFT = { xs: -32, md: -48 };

export default function Experience({ items }) {
  const [ref, inView] = useInView(0.05);

  return (
    <Section id="experience" variant="alt" glow="right" eyebrow="Experience" title="Where I’ve made an" highlight="impact">
      <Box ref={ref} sx={{ position: 'relative', pl: ITEM_PAD, display: 'grid', gap: 5 }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: RAIL_LEFT,
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: BORDER,
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: GRADIENT,
              transformOrigin: 'top',
              transform: inView ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.8s cubic-bezier(.22, 1, .36, 1)',
            },
          }}
        />
        {items.map((job, i) => (
          <Box key={`${job.company}-${job.role}`} sx={{ position: 'relative' }}>
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: DOT_LEFT,
                top: 40,
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: JET_BLACK_DEEP,
                border: `3px solid ${ACCENT}`,
                zIndex: 1,
                animation: `${ripple} 1.8s ease-out infinite`,
              }}
            />
            <Reveal from="right" delay={i * 150}>
              <TimelineItem {...job} />
            </Reveal>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
