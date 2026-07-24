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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(90deg, #F8FAFC  1px, transparent 1px),
            linear-gradient(180deg, #F8FAFC  1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(135deg, transparent 0%, #F8FAFC 30%, #F8FAFC 50%, transparent 100%),
            linear-gradient(125deg, transparent 0%, #F8FAFC 40%, transparent 70%),
            linear-gradient(115deg, transparent 0%, #F8FAFC 50%, transparent 80%),
            radial-gradient(ellipse 800px 400px at 100% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Wave Accent - Bottom Right */}
     
      <CardContent
        sx={{
          padding: '20px',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          overflow: 'visible',
          gap: '8px',
        }}
      >
        {/* Icon Badge - Top Right, Floating Above Card Border */}
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: '-22px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#2563EB',
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
        <Box sx={{ marginBottom: '4px' }}>
          <Typography
            sx={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#1E3A8A',
              lineHeight: 1,
            }}
          >
            {totalCount.toLocaleString()}
          </Typography>
        </Box>

        {/* Breakdown - two columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto', paddingTop: '8px' }}>
          {/* WITH TEMPLATE */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em',
              }}
            >
              With Template
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '4px',
                lineHeight: 1.2,
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
                lineHeight: 1,
              }}
            >
              {templatePercentage}%
            </Typography>
          </Box>

          {/* NO TEMPLATE */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em',
              }}
            >
              No Template
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '4px',
                lineHeight: 1.2,
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
                lineHeight: 1,
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
