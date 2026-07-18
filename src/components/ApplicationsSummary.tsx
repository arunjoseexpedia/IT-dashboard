import { Box, Card, Typography } from '@mui/material';

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
        {icon && <Box sx={{ color: '#2563EB' }}>{icon}</Box>}
      </Box>

      {/* Total count - large display at top */}
      <Box
        sx={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '2px solid #eee',
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
          Total Applications
        </Typography>
        <Typography
          sx={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#003d99',
          }}
        >
          {totalCount.toLocaleString()}
        </Typography>
      </Box>

      {/* Template and No Template grid - two columns */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          alignItems: 'center',
        }}
      >
        {/* TEMPLATE */}
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
            With Template
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#28a745',
              marginBottom: '4px',
            }}
          >
            {templateCount.toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: '#999',
            }}
          >
            {templatePercentage}%
          </Typography>
        </Box>

        {/* NO TEMPLATE */}
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
            No Template
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#ffa500',
              marginBottom: '4px',
            }}
          >
            {noTemplateCount.toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: '#999',
            }}
          >
            {noTemplatePercentage}%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ApplicationsSummary;
