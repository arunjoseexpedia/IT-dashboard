import { Box, Card, Typography } from '@mui/material';

interface SignatureStatusSummaryProps {
  title: string;
  firmadoCount: number;
  noFirmadoCount: number;
  firmadoValue?: number;
  noFirmadoValue?: number;
  icon?: React.ReactNode;
}

const SignatureStatusSummary = ({ title, firmadoCount, noFirmadoCount, firmadoValue = 0, noFirmadoValue = 0, icon }: SignatureStatusSummaryProps) => {
  const total = firmadoCount + noFirmadoCount;
  const firmadoPercentage = total > 0 ? ((firmadoCount / total) * 100).toFixed(1) : '0.0';
  const noFirmadoPercentage = total > 0 ? ((noFirmadoCount / total) * 100).toFixed(1) : '0.0';

  const formattedFirmadoValue = firmadoValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedNoFirmadoValue = noFirmadoValue.toLocaleString('en-US', {
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
          marginBottom: '20px',
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
        {icon && <Box sx={{ color: '#16A34A' }}>{icon}</Box>}
      </Box>

      {/* Status grid - two columns */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          alignItems: 'center',
        }}
      >
        {/* FIRMADO */}
        <Box
          sx={{
            paddingRight: '16px',
            borderRight: '1px solid #ddd',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#999',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Signed
          </Typography>
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#28a745',
              marginBottom: '4px',
            }}
          >
            {firmadoCount.toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: '#999',
              marginBottom: '12px',
              display: 'block',
            }}
          >
            {firmadoPercentage}%
          </Typography>
          {firmadoValue > 0 && (
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#28a745',
                wordBreak: 'break-word',
              }}
            >
              {formattedFirmadoValue}
            </Typography>
          )}
        </Box>

        {/* NO FIRMADO */}
        <Box
          sx={{
            paddingLeft: '16px',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#999',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Unsigned
          </Typography>
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#ffa500',
              marginBottom: '4px',
            }}
          >
            {noFirmadoCount.toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: '#999',
              marginBottom: '12px',
              display: 'block',
            }}
          >
            {noFirmadoPercentage}%
          </Typography>
          {noFirmadoValue > 0 && (
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffa500',
                wordBreak: 'break-word',
              }}
            >
              {formattedNoFirmadoValue}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Total footer */}
      <Box
        sx={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #eee',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#666',
          }}
        >
          Total: {total.toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
};

export default SignatureStatusSummary;
