import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { alpha, keyframes } from '@mui/material/styles';
import GlowCard from './GlowCard';
import IconBadge from './IconBadge';
import ChipGroup from './ChipGroup';
import useInView from '../hooks/useInView';
import { BORDER, ACCENT, GRADIENT, EASE, gradientText } from '../theme';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .6); }
  100% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
`;

/** One job: header, highlight tags, then duties split into titled groups that stagger in. */
export default function TimelineItem({ role, company, location, period, current, highlights = [], groups }) {
  const [ref, inView] = useInView(0.15);

  return (
    <GlowCard lift={false}>
      <Box ref={ref} sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
            <IconBadge icon={WorkRoundedIcon} size={60} filled />
            <Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' } }}>
                {role}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 1.5, mt: 0.5 }}>
                <Typography sx={{ fontWeight: 600, ...gradientText }}>{company}</Typography>
                {location && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    <PlaceRoundedIcon sx={{ fontSize: 16 }} />
                    {location}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 0.9,
              borderRadius: 999,
              border: `1px solid ${BORDER}`,
              bgcolor: alpha('#fff', 0.03),
              fontSize: '.9rem',
              fontWeight: 500,
            }}
          >
            {current && (
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ADE80', animation: `${pulse} 1.6s ease-out infinite` }} />
            )}
            {period}
          </Box>
        </Box>

        {highlights.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <ChipGroup items={highlights} size="small" />
          </Box>
        )}

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2.5}>
          {groups.map((group, gi) => (
            <Grid key={group.title} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  bgcolor: alpha('#fff', 0.025),
                  border: `1px solid ${BORDER}`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(24px)',
                  transition: `opacity .7s ${EASE} ${gi * 150}ms, transform .7s ${EASE} ${gi * 150}ms, border-color .3s ease, background-color .3s ease`,
                  '&:hover': { borderColor: alpha(ACCENT, 0.35), bgcolor: alpha(ACCENT, 0.04) },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  {group.icon && <IconBadge icon={group.icon} size={40} />}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {group.title}
                  </Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.5 }}>
                  {group.points.map((point, pi) => {
                    const delay = gi * 150 + 250 + pi * 90;
                    return (
                      <Box
                        component="li"
                        key={point}
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          alignItems: 'flex-start',
                          opacity: inView ? 1 : 0,
                          transform: inView ? 'none' : 'translateX(-12px)',
                          transition: `opacity .6s ${EASE} ${delay}ms, transform .6s ${EASE} ${delay}ms`,
                        }}
                      >
                        <Box sx={{ width: 7, height: 7, mt: '8px', flexShrink: 0, borderRadius: '2px', background: GRADIENT, transform: 'rotate(45deg)' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                          {point}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </GlowCard>
  );
}
