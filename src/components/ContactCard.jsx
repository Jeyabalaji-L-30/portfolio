import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import GlowCard from './GlowCard';
import IconBadge from './IconBadge';
import { EASE } from '../theme';

/** Contact tile; renders as a link with a nudging arrow when `href` is set. */
export default function ContactCard({ icon, label, value, href }) {
  const isExternal = href?.startsWith('http');

  return (
    <GlowCard
      component={href ? 'a' : 'div'}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        p: 2.5,
        textDecoration: 'none',
        color: 'text.primary',
        '& > .contact-arrow': { position: 'absolute', top: 14, right: 14 },
        '&:hover .contact-arrow': { transform: 'translate(3px, -3px)', color: 'primary.main' },
      }}
    >
      <IconBadge icon={icon} size={48} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '.1em' }}>
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '.95rem', overflowWrap: 'anywhere' }}>{value}</Typography>
      </Box>
      {href && (
        <NorthEastRoundedIcon
          className="contact-arrow"
          sx={{ fontSize: 18, color: 'text.secondary', transition: `all .35s ${EASE}` }}
        />
      )}
    </GlowCard>
  );
}
