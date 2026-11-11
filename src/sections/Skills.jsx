import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { alpha, keyframes } from '@mui/material/styles';
import Section from '../components/Section';
import GlowCard from '../components/GlowCard';
import IconBadge from '../components/IconBadge';
import Reveal from '../components/Reveal';
import useInView from '../hooks/useInView';
import { JET_BLACK, SURFACE, BORDER, ACCENT, GRADIENT, EASE } from '../theme';

const DOOR_MS = 650;

function Door({ side, closed }) {
  const left = side === 'left';
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        width: '50%',
        transformOrigin: `${side} center`,
        transform: closed ? 'rotateY(0deg)' : `rotateY(${left ? -105 : 105}deg)`,
        transition: `transform ${DOOR_MS}ms cubic-bezier(.65, 0, .35, 1)`,
        backfaceVisibility: 'hidden',
        background: `linear-gradient(${left ? 90 : 270}deg, #2B2B2B 0%, #222 100%)`,
        borderRight: left ? `1px solid ${alpha(ACCENT, 0.35)}` : 'none',
        borderLeft: left ? 'none' : `1px solid ${alpha(ACCENT, 0.35)}`,
        boxShadow: closed ? `inset 0 0 60px ${alpha('#000', 0.4)}` : 'none',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    >
      {/* Recessed panel */}
      <Box sx={{ position: 'absolute', inset: 24, borderRadius: 3, border: `1px solid ${BORDER}`, background: alpha('#fff', 0.015) }} />
      {/* Handle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          [left ? 'right' : 'left']: 18,
          width: 6,
          height: 64,
          mt: '-32px',
          borderRadius: 3,
          background: GRADIENT,
          boxShadow: `0 0 18px ${alpha(ACCENT, 0.6)}`,
        }}
      />
    </Box>
  );
}

/** Two hinged doors covering the panel; they swing shut and open again on every tab change. */
function Doors({ closed }) {
  return (
    <Box className="doors" aria-hidden sx={{ perspective: '1800px', pointerEvents: 'none' }}>
      <Door side="left" closed={closed} />
      <Door side="right" closed={closed} />
    </Box>
  );
}

const pop = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(.96); }
  to { opacity: 1; transform: none; }
`;

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const edgeFade = 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)';

/** Endless horizontal ticker; pauses on hover. */
function Marquee({ items, reverse = false, duration = 40 }) {
  return (
    <Box sx={{ overflow: 'hidden', py: 1, maskImage: edgeFade, WebkitMaskImage: edgeFade, '&:hover .marquee-track': { animationPlayState: 'paused' } }}>
      <Box
        className="marquee-track"
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${scroll} ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {[...items, ...items].map((item, i) => (
          <Box
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            sx={{
              mr: 1.5,
              px: 2.75,
              py: 1.25,
              borderRadius: 999,
              border: `1px solid ${BORDER}`,
              bgcolor: SURFACE,
              color: 'text.secondary',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              transition: 'all .3s ease',
              '&:hover': { color: 'primary.main', borderColor: alpha(ACCENT, 0.5) },
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function CategoryTab({ group, selected, onSelect }) {
  return (
    <Box
      component="button"
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexShrink: 0,
        width: { md: '100%' },
        p: 2,
        pr: 3,
        textAlign: 'left',
        font: 'inherit',
        color: 'text.primary',
        cursor: 'pointer',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: selected ? alpha(ACCENT, 0.08) : 'transparent',
        border: `1px solid ${selected ? alpha(ACCENT, 0.45) : BORDER}`,
        transition: `all .4s ${EASE}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: GRADIENT,
          transform: selected ? 'scaleY(1)' : 'scaleY(0)',
          transition: `transform .4s ${EASE}`,
        },
        '&:hover': { borderColor: alpha(ACCENT, 0.35), transform: { md: 'translateX(6px)' } },
        '&:focus-visible': { outline: `2px solid ${ACCENT}`, outlineOffset: 2 },
      }}
    >
      <IconBadge icon={group.icon} size={44} filled={selected} />
      <Box component="span" sx={{ display: 'block' }}>
        <Typography component="span" sx={{ display: 'block', fontWeight: 600 }}>
          {group.title}
        </Typography>
        <Typography component="span" variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
          {group.items.length} skills
        </Typography>
      </Box>
    </Box>
  );
}

export default function Skills({ groups }) {
  const [active, setActive] = useState(0); // highlighted tab
  const [shown, setShown] = useState(0); // category currently behind the doors
  const [switching, setSwitching] = useState(false);
  const [panelRef, inView] = useInView(0.35);
  const group = groups[shown];

  // Wait for the doors to shut, swap the content, then let them swing open again.
  useEffect(() => {
    if (!switching) return undefined;
    const timer = setTimeout(() => {
      setShown(active);
      setSwitching(false);
    }, DOOR_MS);
    return () => clearTimeout(timer);
  }, [switching, active]);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    setSwitching(true);
  };
  const allSkills = useMemo(() => [...new Set(groups.flatMap((g) => g.items))], [groups]);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <Section id="skills" variant="alt" glow="right" eyebrow="Skills" title="What I bring to the" highlight="table">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Reveal from="left">
            <Box
              role="tablist"
              aria-label="Skill categories"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                gap: 1.5,
                overflowX: { xs: 'auto', md: 'visible' },
                pb: { xs: 1, md: 0 },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {groups.map((g, i) => (
                <CategoryTab key={g.title} group={g} selected={i === active} onSelect={() => select(i)} />
              ))}
            </Box>
          </Reveal>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Reveal from="right" delay={120} sx={{ height: '100%' }}>
            <Box ref={panelRef} sx={{ height: '100%' }}>
            <GlowCard
              lift={false}
              role="tabpanel"
              sx={{ height: '100%', '& > .doors': { position: 'absolute', inset: 0, zIndex: 3 } }}
            >
              <Doors closed={!inView || switching} />
              {/* Keyed by category so the content re-animates as the doors open */}
              <Box key={shown} sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2, animation: `${pop} .5s ${EASE} backwards` }}>
                  <IconBadge icon={group.icon} size={60} filled />
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                      {group.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                      {group.items.length} skills
                    </Typography>
                  </Box>
                </Box>
                {group.blurb && (
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, animation: `${pop} .5s ${EASE} 80ms backwards` }}>
                    {group.blurb}
                  </Typography>
                )}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
                  {group.items.map((item, i) => (
                    <Box
                      key={item}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: alpha('#fff', 0.03),
                        border: `1px solid ${BORDER}`,
                        animation: `${pop} .5s ${EASE} ${160 + i * 60}ms backwards`,
                        transition: `transform .3s ${EASE}, border-color .3s ease, background-color .3s ease`,
                        '&:hover': { borderColor: alpha(ACCENT, 0.45), bgcolor: alpha(ACCENT, 0.06), transform: 'translateY(-3px)' },
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          flexShrink: 0,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 2,
                          background: GRADIENT,
                          color: JET_BLACK,
                          fontWeight: 700,
                          fontSize: '.78rem',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Box>
                      <Typography sx={{ fontWeight: 500 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </GlowCard>
            </Box>
          </Reveal>
        </Grid>
      </Grid>

      <Reveal delay={150}>
        <Typography variant="overline" component="p" sx={{ textAlign: 'center', color: 'text.secondary', mt: { xs: 8, md: 10 }, mb: 2 }}>
          My toolbox
        </Typography>
        <Marquee items={allSkills.slice(0, half)} />
        <Marquee items={allSkills.slice(half)} reverse duration={45} />
      </Reveal>
    </Section>
  );
}
