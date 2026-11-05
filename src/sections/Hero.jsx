import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { alpha, keyframes } from '@mui/material/styles';
import Reveal from '../components/Reveal';
import { JET_BLACK, SURFACE, ACCENT, ACCENT_2, GRADIENT, EASE, gradientText } from '../theme';

const POPPINS = '"Poppins", sans-serif';
// Pointy-top hexagon with rounded corners, in a 100 × 112 box.
const HEXAGON =
  'M43 5.9 Q50 2 57 5.9 L89 24.1 Q96 28 96 36 L96 76 Q96 84 89 87.9 L57 106.1 Q50 110 43 106.1 L11 87.9 Q4 84 4 76 L4 36 Q4 28 11 24.1 Z';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const drift = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, -40px) scale(1.15); }
  100% { transform: translate(-30px, 30px) scale(.9); }
`;

const draw = keyframes`
  from { stroke-dashoffset: 400; }
  to { stroke-dashoffset: 0; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

const glowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 16px rgba(34, 211, 238, .45)); }
  50% { filter: drop-shadow(0 0 30px rgba(34, 211, 238, .75)); }
`;

const shimmer = keyframes`
  0%, 100% { opacity: .55; }
  50% { opacity: 1; }
`;

const waveShift = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-30px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .6); }
  100% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
`;

function Orb({ color, size, sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(color, 0.2)} 0%, transparent 65%)`,
        filter: 'blur(30px)',
        animation: `${drift} 18s ease-in-out infinite alternate`,
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

/** Hand-drawn underline that draws itself in. */
function Swoosh({ sx, delay = '.6s' }) {
  return (
    <Box component="svg" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden sx={{ position: 'absolute', overflow: 'visible', ...sx }}>
      <path
        d="M4 14 C 80 4, 200 2, 296 10"
        fill="none"
        stroke={ACCENT_2}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="400"
        style={{ animation: `${draw} 1.2s ${EASE} ${delay} both` }}
      />
    </Box>
  );
}

/** Small block of dots used as a decorative accent. */
function DotField({ sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        width: 140,
        height: 130,
        backgroundImage: `radial-gradient(${alpha(ACCENT_2, 0.5)} 1.6px, transparent 1.8px)`,
        backgroundSize: '22px 22px',
        maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

/** A pair of glowing diagonal light bars. */
function Streaks({ sx }) {
  const bar = (width, length, offset) => ({
    position: 'absolute',
    left: offset,
    top: 0,
    width,
    height: length,
    borderRadius: 999,
    background: `linear-gradient(to top, transparent, ${ACCENT_2} 45%, ${alpha(ACCENT_2, 0.9)} 60%, transparent)`,
    boxShadow: `0 0 18px ${alpha(ACCENT_2, 0.6)}`,
  });
  return (
    <Box aria-hidden sx={{ position: 'absolute', width: 60, height: 180, transform: 'rotate(42deg)', animation: `${shimmer} 3.5s ease-in-out infinite`, ...sx }}>
      <Box sx={bar(12, 180, 0)} />
      <Box sx={bar(7, 150, 26)} />
    </Box>
  );
}

/** Hexagon-framed photo with a glowing ring, light streaks and a role label. */
function Portrait({ profile, label }) {
  return (
    <Box sx={{ position: 'relative', width: { xs: 230, sm: 260, md: 290 }, mx: 'auto' }}>
      <Streaks sx={{ right: { xs: -36, md: -60 }, top: { xs: -40, md: -50 } }} />
      <Streaks sx={{ left: { xs: -36, md: -60 }, bottom: { xs: -20, md: -30 } }} />

      <Box
        component="svg"
        viewBox="0 0 100 112"
        role="img"
        aria-label={profile.name}
        sx={{ position: 'relative', display: 'block', width: '100%', overflow: 'visible', animation: `${glowPulse} 4s ease-in-out infinite` }}
      >
        <defs>
          <clipPath id="hero-hex">
            <path d={HEXAGON} />
          </clipPath>
          <linearGradient id="hero-hex-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={ACCENT_2} />
            <stop offset="1" stopColor={ACCENT} />
          </linearGradient>
        </defs>
        {/* Thick soft ring, then the bright edge on top */}
        <path d={HEXAGON} fill={SURFACE} stroke={alpha(ACCENT, 0.35)} strokeWidth="9" strokeLinejoin="round" />
        {profile.photo && (
          <image href={profile.photo} x="4" y="2" width="92" height="108" preserveAspectRatio="xMidYMin slice" clipPath="url(#hero-hex)" />
        )}
        <path d={HEXAGON} fill="none" stroke="url(#hero-hex-ring)" strokeWidth="2.6" strokeLinejoin="round" />
      </Box>

      {/* Role label */}
      <Box sx={{ position: 'absolute', zIndex: 2, right: { xs: -34, md: -90 }, bottom: { xs: '4%', md: '8%' } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 2,
            py: 1.25,
            borderRadius: 3,
            bgcolor: alpha(SURFACE, 0.95),
            border: `1px solid ${alpha(ACCENT_2, 0.35)}`,
            boxShadow: `0 16px 36px ${alpha('#000', 0.5)}`,
            animation: `${float} 5s ease-in-out infinite`,
          }}
        >
          <InsightsRoundedIcon sx={{ color: ACCENT_2, fontSize: 26 }} />
          <Typography sx={{ fontWeight: 500, fontSize: '.92rem', whiteSpace: 'nowrap' }}>{label}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

/** Glowing teal waves rising from both bottom corners. */
function Waves() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: { xs: 130, md: 240 },
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 'calc(100% + 60px)',
          height: '100%',
          filter: `drop-shadow(0 0 14px ${alpha(ACCENT_2, 0.45)})`,
          animation: `${waveShift} 14s ease-in-out infinite`,
        }}
      >
        <defs>
          <linearGradient id="wave-left" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={ACCENT} stopOpacity="0.75" />
            <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-right" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor={ACCENT_2} stopOpacity="0" />
            <stop offset="1" stopColor={ACCENT_2} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M0 150 C 160 120, 330 150, 520 240 L 0 240 Z" fill="url(#wave-left)" />
        <path d="M0 150 C 160 120, 330 150, 520 240" fill="none" stroke={ACCENT_2} strokeOpacity="0.8" strokeWidth="2" />
        <path d="M820 240 C 1060 220, 1240 170, 1440 40 L 1440 240 Z" fill="url(#wave-right)" />
        <path d="M820 240 C 1060 220, 1240 170, 1440 40" fill="none" stroke={ACCENT_2} strokeWidth="2.5" />
      </Box>
    </Box>
  );
}

const highlight = { color: ACCENT_2, fontWeight: 600 };
const scrollLine = { width: { xs: 50, md: 150 }, height: '1px', background: `linear-gradient(90deg, transparent, ${alpha(ACCENT_2, 0.7)})` };

export default function Hero({ profile, contacts, company }) {
  const socials = contacts.filter((c) => c.href);
  const [firstName] = profile.name.split(' ');
  const titleWords = profile.title.split(' ');
  const titleEnd = titleWords.pop();

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 13, md: 12 },
        pb: { xs: 20, md: 22 },
        overflow: 'hidden',
        background: `radial-gradient(ellipse 60% 55% at 80% 45%, ${alpha(ACCENT, 0.14)} 0%, transparent 70%), ${JET_BLACK}`,
      }}
    >
      <Orb color={ACCENT} size={600} sx={{ top: -220, right: -180 }} />
      <Orb color={ACCENT_2} size={480} sx={{ top: '10%', left: -260, animationDelay: '-6s' }} />
      <DotField sx={{ left: 0, top: 110, opacity: 0.6 }} />
      <Waves />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 10, md: 4 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            {company && (
              <Reveal>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2.25,
                    py: 1,
                    borderRadius: 999,
                    border: `1px solid ${alpha(ACCENT_2, 0.5)}`,
                    bgcolor: alpha(ACCENT, 0.06),
                    fontSize: '.95rem',
                    fontWeight: 500,
                  }}
                >
                  <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#4ADE80', animation: `${pulse} 1.6s ease-out infinite` }} />
                  Currently at {company}
                </Box>
              </Reveal>
            )}

            <Reveal delay={100}>
              <Typography
                variant="h1"
                sx={{ fontFamily: POPPINS, fontWeight: 800, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, lineHeight: 1.1, mt: 3, letterSpacing: '-0.01em' }}
              >
                Hi, I’m{' '}
                <Box component="span" sx={{ position: 'relative', display: 'inline-block', ...gradientText }}>
                  {firstName}
                  <Swoosh sx={{ left: '-30%', bottom: -14, width: '135%', height: 16 }} />
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={200}>
              <Typography component="p" sx={{ fontFamily: POPPINS, fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' }, lineHeight: 1.25, mt: 2.5 }}>
                {titleWords.join(' ')}{' '}
                <Box component="span" sx={{ position: 'relative', display: 'inline-block', color: ACCENT_2 }}>
                  {titleEnd}
                  <Swoosh delay="1s" sx={{ left: '10%', bottom: -10, width: '95%', height: 12 }} />
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={300}>
              <Typography sx={{ mt: 3.5, maxWidth: 580, color: 'text.secondary', fontSize: { xs: '1.02rem', md: '1.15rem' }, lineHeight: 1.75 }}>
                I help brands grow online with <Box component="span" sx={highlight}>SEO</Box>,{' '}
                <Box component="span" sx={highlight}>Meta Ads</Box> and <Box component="span" sx={highlight}>social media marketing</Box> —
                turning traffic into real leads.
              </Typography>
            </Reveal>

            <Reveal delay={400}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 4.5 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="#contact"
                  startIcon={<RocketLaunchRoundedIcon />}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontSize: '1.02rem',
                    boxShadow: `0 10px 36px ${alpha(ACCENT_2, 0.35)}`,
                    '& .MuiButton-endIcon': { transition: `transform .3s ${EASE}` },
                    '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
                  }}
                >
                  Let’s Work Together
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="#experience"
                  startIcon={<WorkOutlineRoundedIcon />}
                  sx={{ px: 4, py: 1.6, fontSize: '1.02rem', borderColor: alpha(ACCENT_2, 0.6) }}
                >
                  View My Work
                </Button>
              </Stack>
            </Reveal>

            <Reveal delay={500}>
              <Stack direction="row" spacing={2} sx={{ mt: 4.5 }}>
                {socials.map(({ label, href, icon: Icon }) => (
                  <Tooltip key={label} title={label}>
                    <IconButton
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        width: 52,
                        height: 52,
                        border: `1px solid ${alpha('#fff', 0.2)}`,
                        color: 'text.primary',
                        transition: `all .35s ${EASE}`,
                        '&:hover': { borderColor: ACCENT_2, color: JET_BLACK, background: GRADIENT, transform: 'translateY(-4px)' },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={250} from="zoom" sx={{ position: 'relative', py: { xs: 2, md: 0 } }}>
              <DotField sx={{ left: { xs: -10, md: -10 }, top: -10 }} />
              <DotField sx={{ right: { xs: -10, md: -40 }, top: '30%', opacity: 0.7 }} />
              <Portrait profile={profile} label="Digital Marketer" />
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll hint */}
      <Box
        component="a"
        href="#about"
        aria-label="Scroll to About"
        sx={{
          position: 'absolute',
          zIndex: 2,
          bottom: { xs: 20, md: 30 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.25,
          color: 'text.primary',
          textDecoration: 'none',
          '&:hover .scroll-pill': { bgcolor: alpha(ACCENT, 0.18) },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={scrollLine} />
          <Typography sx={{ fontSize: '.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}>Scroll Down</Typography>
          <Box sx={{ ...scrollLine, transform: 'scaleX(-1)' }} />
        </Box>
        <Box
          className="scroll-pill"
          sx={{
            width: 36,
            height: 54,
            borderRadius: 999,
            display: 'grid',
            placeItems: 'center',
            border: `1.5px solid ${alpha(ACCENT_2, 0.75)}`,
            color: ACCENT_2,
            bgcolor: alpha(JET_BLACK, 0.6),
            transition: 'background-color .3s',
          }}
        >
          <ArrowDownwardRoundedIcon sx={{ fontSize: 18, animation: `${bounce} 1.6s ease-in-out infinite` }} />
        </Box>
      </Box>
    </Box>
  );
}
