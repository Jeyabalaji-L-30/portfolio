import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Section from '../components/Section';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import IconBadge from '../components/IconBadge';
import Reveal from '../components/Reveal';
import { BORDER, ACCENT, GRADIENT, EASE } from '../theme';

function FocusRow({ icon, title, text }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        borderBottom: `1px solid ${BORDER}`,
        transition: `padding-left .4s ${EASE}`,
        '&:hover': { pl: 1 },
        '&:hover .focus-title': { color: ACCENT },
      }}
    >
      <IconBadge icon={icon} size={42} />
      <Box>
        <Typography className="focus-title" sx={{ fontWeight: 600, transition: 'color .3s ease' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default function About({ profile, stats, focusAreas = [] }) {
  return (
    <Section id="about" glow="left">
      <Grid container spacing={{ xs: 6, md: 10 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Reveal from="left">
            <SectionHeader eyebrow="About Me" title="Data-driven marketer with a" highlight="builder’s mindset" align="left" />
            <Box sx={{ width: 80, height: 4, borderRadius: 2, background: GRADIENT, mt: { xs: -2, md: -3 }, mb: 3 }} />
          </Reveal>
          <Box sx={{ borderTop: `1px solid ${BORDER}` }}>
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} from="left" delay={150 + i * 100}>
                <FocusRow {...area} />
              </Reveal>
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Reveal from="right">
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                lineHeight: 1.65,
                mb: 3.5,
                pl: 3,
                borderLeft: `3px solid ${alpha(ACCENT, 0.8)}`,
              }}
            >
              {profile.about[0]}
            </Typography>
          </Reveal>
          {profile.about.slice(1).map((para, i) => (
            <Reveal key={para} from="right" delay={100 + i * 120}>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.95, mb: 2.5, fontSize: '1.03rem' }}>{para}</Typography>
            </Reveal>
          ))}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mt: 5 }}>
            {stats.map((stat, i) => (
              <Reveal key={stat.label} from="zoom" delay={200 + i * 120} sx={{ height: '100%' }}>
                <StatCard {...stat} />
              </Reveal>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
