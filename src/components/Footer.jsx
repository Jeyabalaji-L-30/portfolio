import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { alpha } from '@mui/material/styles';
import { JET_BLACK, JET_BLACK_DEEP, BORDER, ACCENT, ACCENT_2, GRADIENT, EASE, gradientText } from '../theme';

const heading = { fontWeight: 600, mb: 2, fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'text.secondary' };

export default function Footer({ profile, links, contacts }) {
  const socials = contacts.filter((c) => c.href);

  return (
    <Box component="footer" sx={{ bgcolor: JET_BLACK_DEEP, borderTop: `1px solid ${BORDER}`, pt: { xs: 7, md: 9 }, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.8rem', ...gradientText, display: 'inline-block' }}>
              {profile.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 360, lineHeight: 1.8 }}>
              {profile.title} helping brands grow through SEO, Meta Ads and social media.
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={heading}>Navigate</Typography>
            <Stack spacing={1.25}>
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  underline="none"
                  sx={{ color: 'text.primary', width: 'fit-content', transition: `color .3s, transform .3s ${EASE}`, '&:hover': { color: ACCENT, transform: 'translateX(4px)' } }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography sx={heading}>Connect</Typography>
            <Stack spacing={1.25}>
              {socials.map(({ label, value, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: 'text.primary', width: 'fit-content', wordBreak: 'break-all', transition: 'color .3s', '&:hover': { color: ACCENT } }}
                >
                  <Icon sx={{ fontSize: 18, color: ACCENT }} />
                  {value}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: `1px solid ${BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </Typography>
          <IconButton
            href="#home"
            aria-label="Back to top"
            sx={{
              background: GRADIENT,
              color: JET_BLACK,
              transition: `transform .35s ${EASE}, box-shadow .35s ${EASE}`,
              '&:hover': { background: GRADIENT, transform: 'translateY(-4px)', boxShadow: `0 10px 24px ${alpha(ACCENT_2, 0.4)}` },
            }}
          >
            <KeyboardArrowUpRoundedIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
