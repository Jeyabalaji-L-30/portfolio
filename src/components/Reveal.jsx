import Box from '@mui/material/Box';
import useInView from '../hooks/useInView';
import { EASE } from '../theme';

const hidden = {
  up: 'translateY(36px)',
  left: 'translateX(-48px)',
  right: 'translateX(48px)',
  zoom: 'scale(.92)',
};

/**
 * Animates its children into view the first time they scroll on screen.
 * from: 'up' | 'left' | 'right' | 'zoom'
 */
export default function Reveal({ children, delay = 0, from = 'up', sx, ...rest }) {
  const [ref, visible] = useInView();
  const timing = `.9s ${EASE} ${delay}ms`;

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hidden[from],
        filter: visible ? 'none' : 'blur(6px)',
        transition: `opacity ${timing}, transform ${timing}, filter ${timing}`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', filter: 'none', transition: 'none' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
