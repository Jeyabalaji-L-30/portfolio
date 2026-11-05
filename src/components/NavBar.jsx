import { useEffect, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { alpha, keyframes } from '@mui/material/styles';
import { JET_BLACK, JET_BLACK_DEEP, BORDER, ACCENT, ACCENT_2, GRADIENT, EASE, gradientText } from '../theme';

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: none; opacity: 1; }
`;

/** Tracks which section id is currently in the middle of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Fraction (0–1) of the page scrolled so far, updated once per frame. */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      frame = undefined;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

export default function NavBar({ brand, links }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 40 });
  const ids = useMemo(() => links.map((l) => l.id), [links]);
  const active = useActiveSection(ids);
  const progress = useScrollProgress();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? alpha(JET_BLACK, 0.8) : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? BORDER : 'transparent'}`,
          color: 'text.primary',
          transition: 'all .35s ease',
          animation: `${slideDown} .8s ${EASE}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 74 } }}>
            <Box component="a" href="#home" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1, textDecoration: 'none' }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2.5, display: 'grid', placeItems: 'center', background: GRADIENT, color: JET_BLACK }}>
                <InsightsRoundedIcon fontSize="small" />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.3rem', md: '1.5rem' }, ...gradientText }}>{brand}</Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {links.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <Button
                    key={id}
                    href={`#${id}`}
                    startIcon={Icon ? <Icon /> : undefined}
                    sx={{
                      px: { md: 1.5, lg: 2 },
                      py: 0.9,
                      fontWeight: 500,
                      color: isActive ? ACCENT_2 : 'text.primary',
                      bgcolor: isActive ? alpha(ACCENT, 0.16) : 'transparent',
                      border: `1px solid ${isActive ? alpha(ACCENT_2, 0.45) : 'transparent'}`,
                      boxShadow: isActive ? `0 0 18px ${alpha(ACCENT_2, 0.2)}` : 'none',
                      '& .MuiButton-startIcon': { display: { md: 'none', lg: 'inherit' }, mr: 0.75 },
                      '&:hover': { bgcolor: alpha(ACCENT, 0.1), color: ACCENT_2, transform: 'none' },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
              <Button
                variant="outlined"
                href="#contact"
                startIcon={<SendRoundedIcon />}
                sx={{ ml: 2, px: 2.75, py: 0.9, borderColor: alpha(ACCENT_2, 0.6), '&:hover': { transform: 'none' } }}
              >
                Hire Me
              </Button>
            </Box>

            <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' }, color: 'text.primary' }}>
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            bottom: -1,
            height: 2,
            width: '100%',
            background: GRADIENT,
            transformOrigin: 'left',
            transform: `scaleX(${progress})`,
          }}
        />
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 270, bgcolor: JET_BLACK_DEEP, borderLeft: `1px solid ${BORDER}` } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <List>
          {links.map((link, i) => {
            const isActive = active === link.id;
            return (
              <ListItemButton
                key={link.id}
                component="a"
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderLeft: '3px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateX(24px)',
                  transition: `all .5s ${EASE} ${i * 60 + 100}ms`,
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 400, color: isActive ? 'primary.main' : 'text.primary' }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Box sx={{ px: 4, mt: 2 }}>
          <Button variant="contained" fullWidth href="#contact" onClick={() => setOpen(false)}>
            Hire Me
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
