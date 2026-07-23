import { Box, Card, CardContent, Typography } from '@mui/material';

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
        {/* Icon Badge - Top Right, Floating Above Card Border */}
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: '-16px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
              zIndex: 10,
            }}
          >
            {icon}
          </Box>
        )}

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

        {/* Breakdown - two columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto' }}>
          {/* SIGNED */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em',
              }}
            >
              Signed
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {firmadoCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {firmadoPercentage}%
            </Typography>
            {firmadoValue > 0 && (
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#16A34A',
                  wordBreak: 'break-word',
                  marginTop: '6px',
                }}
              >
                {formattedFirmadoValue}
              </Typography>
            )}
          </Box>

          {/* UNSIGNED */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em',
              }}
            >
              Unsigned
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {noFirmadoCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {noFirmadoPercentage}%
            </Typography>
            {noFirmadoValue > 0 && (
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#60A5FA',
                  wordBreak: 'break-word',
                  marginTop: '6px',
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
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #E5E7EB',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#374151',
            }}
          >
            Total: {total.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignatureStatusSummary;
