import { Box, Card, CardContent, Typography } from '@mui/material';

interface ApplicationsSummaryProps {
  title: string;
  totalCount: number;
  templateCount: number;
  noTemplateCount: number;
  icon?: React.ReactNode;
}

const ApplicationsSummary = ({ title, totalCount, templateCount, noTemplateCount, icon }: ApplicationsSummaryProps) => {
  const templatePercentage = totalCount > 0 ? ((templateCount / totalCount) * 100).toFixed(1) : '0.0';
  const noTemplatePercentage = totalCount > 0 ? ((noTemplateCount / totalCount) * 100).toFixed(1) : '0.0';

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
          padding: '16px',
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
              top: '-20px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFE4E6 0%, #FBCFE8 50%, #F9A8D4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
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

        {/* Total count - Main prominent display */}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography
            sx={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#2563EB',
              lineHeight: 1,
            }}
          >
            {totalCount.toLocaleString()}
          </Typography>
        </Box>

        {/* Breakdown - two columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto' }}>
          {/* WITH TEMPLATE */}
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
              With Template
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {templateCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {templatePercentage}%
            </Typography>
          </Box>

          {/* NO TEMPLATE */}
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
              No Template
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {noTemplateCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {noTemplatePercentage}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationsSummary;
