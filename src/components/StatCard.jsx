import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GlowCard from './GlowCard';
import useInView from '../hooks/useInView';
import { gradientText } from '../theme';

/** Counts from 0 to `target` with an ease-out once `active` turns true. */
function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

/** Large animated number (e.g. "10+") with a short label beneath it. */
export default function StatCard({ value, label }) {
  const [ref, inView] = useInView(0.4);
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/^\d+/, '');
  const count = useCountUp(target, inView);

  return (
    <Box ref={ref} sx={{ height: '100%' }}>
      <GlowCard sx={{ height: '100%' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h3" sx={{ fontSize: '2.4rem', lineHeight: 1, ...gradientText }}>
            {count}
            {suffix}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            {label}
          </Typography>
        </Box>
      </GlowCard>
    </Box>
  );
}
