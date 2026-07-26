import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LawyerData {
  lawyer: string;
  count: number;
  percentage: string;
  usdAmount?: number;
  brCompliance?: number;
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
  }: LawyerListCardProps) => {
  const { t } = useTranslation();
  const displayTitle = t('lawyerDistribution');
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
          {displayTitle}
        </Typography>

        {/* Column Headers */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            marginBottom: '8px',
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            borderBottom: '2px solid #E5E7EB',
          }}
        >
          <Box sx={{ width: '12px', flexShrink: 0 }} />
          <Typography
            sx={{
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 700,
              minWidth: '140px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Lawyer
          </Typography>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 700,
              minWidth: '100px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Contract
          </Typography>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 700,
              minWidth: '120px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Amount (USD)
          </Typography>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 700,
              minWidth: '110px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            BR Compliance
          </Typography>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#6B7280',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Percentage (%)
          </Typography>
        </Box>

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
                {item.count}
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#2563EB',
                  fontWeight: 600,
                  minWidth: '120px',
                }}
              >
                ${(item.usdAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#374151',
                  fontWeight: 600,
                  minWidth: '110px',
                }}
              >
                {item.brCompliance || 0}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '50px',
                    height: '28px',
                    backgroundColor: COLORS[index % COLORS.length] + '15',
                    borderRadius: '6px',
                    border: `1.5px solid ${COLORS[index % COLORS.length]}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: COLORS[index % COLORS.length],
                      fontWeight: 700,
                    }}
                  >
                    {item.percentage}%
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, maxWidth: '150px' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Summary Footer */}
       
      </CardContent>
    </Card>
  );
};

export default LawyerListCard;
