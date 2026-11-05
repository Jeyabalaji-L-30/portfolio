import Grid from '@mui/material/Grid2';
import Section from '../components/Section';
import HoverCard from '../components/HoverCard';
import Reveal from '../components/Reveal';

export default function Education({ items }) {
  return (
    <Section id="education" variant="alt" glow="right" eyebrow="Education & Certifications" title="Learning that" highlight="shaped me">
      <Grid container spacing={3}>
        {items.map((item, i) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Reveal from="up" delay={i * 150} sx={{ height: '100%' }}>
              <HoverCard
                icon={item.icon}
                tag={item.tag}
                number={String(i + 1).padStart(2, '0')}
                title={item.title}
                subtitle={item.subtitle}
              />
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
