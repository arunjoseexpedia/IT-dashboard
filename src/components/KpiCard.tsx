import { Card, CardContent, Typography, Box } from '@mui/material';

interface KpiCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, color = '#02355a' }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.75rem',
            }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                fontSize: '1.8rem',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#02355a',
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3rem' },
            marginTop: '8px',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
