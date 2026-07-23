import { Card, CardContent, Typography, Box } from '@mui/material';

interface ContractStatusWithValueSummaryProps {
  title: string;
  totalValue: number;
  borradorCount: number;
  publicadoCount: number;
  cerradoCount: number;
  canceladoCount?: number;
  icon?: React.ReactNode;
}

const ContractStatusWithValueSummary: React.FC<ContractStatusWithValueSummaryProps> = ({
  title,
  totalValue,
  borradorCount,
  publicadoCount,
  cerradoCount,
  canceladoCount = 0,
  icon,
}) => {
  const formattedValue = totalValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: "1px solid #E5E7EB",
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
        },
        height: '100%',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '12px',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Icon Badge - Top Right */}
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: '-16px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #BA7517 0%, #854F0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
            }}
          >
            {icon}
          </Box>
        )}

        {/* Total Value Section */}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              fontSize: '11px',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Total Contract Value
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#2563EB',
              fontSize: '32px',
              lineHeight: 1,
              wordBreak: 'break-word',
            }}
          >
            {formattedValue}
          </Typography>
        </Box>

        {/* Contract Status Grid - 4 columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginTop: 'auto' }}>
          {/* Borrador */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Borrador
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {borradorCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Publicado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Publicado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {publicadoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cerrado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Cerrado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {cerradoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cancelado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Cancelado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#374151',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {canceladoCount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContractStatusWithValueSummary;
