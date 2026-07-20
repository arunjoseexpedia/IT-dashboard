import { Card, CardContent, Typography, Box } from '@mui/material';

interface LawyerData {
  lawyer: string;
  count: number;
  percentage: string;
  usdAmount?: number;
}

interface LawyerListCardProps {
  data: LawyerData[];
  title?: string;
}

const COLORS = [
  '#2563EB',
  '#06B6D4',
  '#22C55E',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#EF4444',
  '#6B7280',
];

const LawyerListCard = ({
  data,
  title = 'Lawyer Distribution',
}: LawyerListCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
        padding: '0',
        marginBottom: '24px',
      }}
    >
      <CardContent
        sx={{
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </Typography>

        {/* Lawyer List */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '100%',
          }}
        >
          {data.map((item, index) => (
            <Box
              key={`lawyer-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                  transition: 'background-color 0.2s ease',
                },
              }}
            >
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: COLORS[index % COLORS.length],
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#374151',
                  fontWeight: 500,
                  minWidth: '140px',
                }}
              >
                {item.lawyer}
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600,
                  minWidth: '100px',
                }}
              >
                {item.count} contracts
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#2563EB',
                  fontWeight: 600,
                  minWidth: '120px',
                }}
              >
                ${(item.usdAmount || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  fontWeight: 500,
                }}
              >
                ({item.percentage}%)
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Summary Footer */}
        <Box
          sx={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: '12px',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '11px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '2px',
              }}
            >
              Total Lawyers
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
              {data.length}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '11px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '2px',
              }}
            >
              Total Contracts
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
              {data.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '11px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '2px',
              }}
            >
              Total Amount (USD)
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              ${data.reduce((sum, item) => sum + (item.usdAmount || 0), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LawyerListCard;
