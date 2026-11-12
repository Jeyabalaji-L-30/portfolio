import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { alpha } from '@mui/material/styles';
import { ACCENT, BORDER, SURFACE } from '../theme';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    bgcolor: alpha('#fff', 0.03),
    '& fieldset': { borderColor: BORDER },
    '&:hover fieldset': { borderColor: alpha(ACCENT, 0.45) },
    '&.Mui-focused fieldset': { borderColor: ACCENT },
  },
};

/** Modal contact form powered by EmailJS REST API. */
export default function EmailDialog({ open, onClose, recipientEmail, recipientHref, emailJs }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClose = () => {
    if (status === 'sending') return;
    onClose();
    if (status === 'sent') {
      setStatus('idle');
      setForm(INITIAL_FORM);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailJs?.serviceId || !emailJs?.templateId || !emailJs?.publicKey) {
      setStatus('error');
      setErrorMsg('EmailJS template ID or public key is not configured yet. Please add VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailJs.serviceId,
          template_id: emailJs.templateId,
          user_id: emailJs.publicKey,
          template_params: {
            name: form.name.trim(),
            email: form.email.trim(),
            title: form.subject.trim() || `Portfolio inquiry from ${form.name.trim()}`,
            from_name: form.name.trim(),
            from_email: form.email.trim(),
            reply_to: form.email.trim(),
            subject: form.subject.trim() || `Portfolio inquiry from ${form.name.trim()}`,
            message: form.message.trim(),
            to_email: recipientEmail,
          },
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to send message.');
      }

      setStatus('sent');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong while sending your message. Please try again.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 4,
            boxShadow: `0 24px 60px ${alpha('#000', 0.65)}`,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, pb: 1 }}>
        <Box>
          <Typography variant="h5" component="span" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, display: 'block' }}>
            Send me an email
          </Typography>
          {recipientEmail && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Directly to {recipientEmail}
            </Typography>
          )}
        </Box>
        <IconButton onClick={handleClose} aria-label="Close dialog" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {status === 'sent' ? (
          <Stack spacing={2.5} sx={{ py: 1 }}>
            <Alert severity="success" sx={{ borderRadius: 2.5 }}>
              Your message has been sent! I’ll get back to you soon.
            </Alert>
            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setStatus('idle')}>
                Send another
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Done
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              {status === 'error' && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2.5 }}
                  action={
                    recipientHref && (
                      <Button color="inherit" size="small" href={recipientHref} sx={{ px: 1.5, py: 0.5 }}>
                        Email app
                      </Button>
                    )
                  }
                >
                  {errorMsg}
                </Alert>
              )}
              <TextField
                label="Your Name"
                value={form.name}
                onChange={updateField('name')}
                required
                fullWidth
                sx={fieldSx}
              />
              <TextField
                label="Your Email"
                type="email"
                value={form.email}
                onChange={updateField('email')}
                required
                fullWidth
                sx={fieldSx}
              />
              <TextField
                label="Subject"
                value={form.subject}
                onChange={updateField('subject')}
                placeholder="Project inquiry, collaboration..."
                fullWidth
                sx={fieldSx}
              />
              <TextField
                label="Message"
                value={form.message}
                onChange={updateField('message')}
                required
                multiline
                rows={4}
                fullWidth
                sx={fieldSx}
              />
              <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ pt: 1 }}>
                <Button variant="outlined" onClick={handleClose} disabled={status === 'sending'}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={status === 'sending'}
                  endIcon={status === 'sending' ? <CircularProgress size={16} color="inherit" /> : <SendRoundedIcon />}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

