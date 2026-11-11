import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import { alpha } from '@mui/material/styles';
import Section from '../components/Section';
import HoverCard from '../components/HoverCard';
import ChipGroup from '../components/ChipGroup';
import Reveal from '../components/Reveal';
import { BORDER, ACCENT, EASE } from '../theme';

export default function Projects({ items }) {
  return (
    <Section
      id="projects"
      glow="left"
      eyebrow="Projects"
      title="Brands I’ve helped"
      highlight="grow"
      subtitle="Hands-on video production, social media management, Meta Ads and SEO across diverse client brands."
    >
      <Grid container spacing={3}>
        {items.map((project, i) => (
          <Grid key={project.title} size={{ xs: 12, md: i === items.length - 1 && items.length % 2 !== 0 ? 12 : 6, lg: i < 3 ? 4 : 6 }}>
            <Reveal from="up" delay={i * 100} sx={{ height: '100%' }}>
              <HoverCard
                icon={project.icon}
                tag={project.category}
                number={project.number}
                title={project.title}
              >
                <ChipGroup items={project.services} size="small" />
                {project.instagram && (
                  <Box sx={{ mt: 'auto', pt: 3 }}>
                    <Box
                      component="a"
                      href={project.instagram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        px: 2,
                        py: 1.25,
                        borderRadius: 2.5,
                        textDecoration: 'none',
                        color: 'text.primary',
                        bgcolor: alpha('#fff', 0.03),
                        border: `1px solid ${BORDER}`,
                        transition: `all .3s ${EASE}`,
                        '&:hover': {
                          borderColor: alpha(ACCENT, 0.5),
                          bgcolor: alpha(ACCENT, 0.08),
                          color: 'primary.main',
                        },
                        '&:hover .ig-arrow': {
                          transform: 'translate(3px, -3px)',
                          color: 'primary.main',
                        },
                      }}
                    >
                      <InstagramIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Instagram → {project.instagram.handle}
                      </Typography>
                      <NorthEastRoundedIcon
                        className="ig-arrow"
                        sx={{ fontSize: 16, ml: 'auto', color: 'text.secondary', transition: `all .3s ${EASE}` }}
                      />
                    </Box>
                  </Box>
                )}
              </HoverCard>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

