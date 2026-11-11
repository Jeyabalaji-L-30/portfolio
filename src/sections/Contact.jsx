import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { keyframes } from '@mui/material/styles';
import Section from '../components/Section';
import SectionHeader from '../components/SectionHeader';
import ContactCard from '../components/ContactCard';
import Reveal from '../components/Reveal';

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, .45); }
  50% { box-shadow: 0 0 32px 4px rgba(34, 211, 238, .25); }
`;

export default function Contact({ contacts }) {
  const email = contacts.find((c) => c.label === 'Email');

  return (
    <Section id="contact" variant="alt" glow="right">
      <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }}>
          <Reveal from="left">
            <SectionHeader eyebrow="Get In Touch" title="Let’s grow your brand" highlight="together" align="left" />
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, mt: { xs: -2, md: -3 } }}>
              Looking for someone to boost your search rankings, run results-driven ads or manage your social media? I’d love to
              hear from you.
            </Typography>
            {email && (
              <Button
                variant="contained"
                size="large"
                href={email.href}
                endIcon={<SendRoundedIcon />}
                sx={{ mt: 4, px: 4.5, py: 1.6, animation: `${glowPulse} 2.8s ease-in-out infinite` }}
              >
                Send me an email
              </Button>
            )}
          </Reveal>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
            {contacts.map((contact, i) => (
              <Reveal key={contact.label} from="zoom" delay={i * 100} sx={{ height: '100%' }}>
                <ContactCard {...contact} />
              </Reveal>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
