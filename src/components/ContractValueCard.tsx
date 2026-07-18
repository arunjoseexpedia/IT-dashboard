import { Card, Typography, Box } from '@mui/material';

interface ContractValueCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
}

const ContractValueCard = ({ title, value, icon }: ContractValueCardProps) => {
  const formattedValue = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: "1px solid #E5E7EB",
        padding: '24px',
        boxShadow: '0 6px 20px rgba(15,23,42,.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Header with title and icon */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </Typography>
        {icon && <Box sx={{ color: '#0066cc' }}>{icon}</Box>}
      </Box>

      {/* Value display */}
      <Typography
        sx={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#003d99',
          lineHeight: 1,
          wordBreak: 'break-word',
        }}
      >
        {formattedValue}
      </Typography>
    </Card>
  );
};

export default ContractValueCard;
