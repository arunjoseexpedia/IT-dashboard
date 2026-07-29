import { Card, CardContent, Typography, Box, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Paper, Chip, LinearProgress } from '@mui/material';
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
const formatAmount = (value:any) => {
  const num = Number(value);

  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }

  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }

  return `$${num.toFixed(2)}`;
};
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
       <TableContainer
  component={Paper}
  sx={{
    borderRadius: 2,
    boxShadow: 'none',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  }}
>
  <Table size="small">
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: '#F8FAFC',
          '& th': {
            fontWeight: 700,
            fontSize: 12,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '.05em',
            borderBottom: '2px solid #E5E7EB',
            py: 1.5,
          },
        }}
      >
        <TableCell>Lawyer</TableCell>
        <TableCell align="right">Contracts</TableCell>
        <TableCell align="right">Amount (USD)</TableCell>
        <TableCell align="center">BR Compliance</TableCell>
        <TableCell width={220}>Performance</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {data.map((item, index) => (
        <TableRow
          key={index}
          hover
          sx={{
            '&:nth-of-type(even)': {
              backgroundColor: '#FCFCFD',
            },
            '& td': {
              borderBottom: '1px solid #F3F4F6',
              py: 1.5,
            },
          }}
        >
          <TableCell>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <Typography fontWeight={600}>
                {item.lawyer}
              </Typography>
            </Box>
          </TableCell>

          <TableCell align="right">
            <Typography fontWeight={600}>
              {item.count}
            </Typography>
          </TableCell>

          <TableCell align="right">
            <Typography
              fontWeight={700}
              color="#b4bccfff"
            >
              {formatAmount(item.usdAmount || 0)}
            </Typography>
          </TableCell>

          <TableCell align="center">
            <Chip
              size="small"
              label={item.brCompliance}
              sx={{
                fontWeight: 600,
                background: '#ECFDF5',
                color: '#15803D',
              }}
            />
          </TableCell>

          <TableCell>
            <Box display="flex" alignItems="center" gap={1}>
              <LinearProgress
                variant="determinate"
                value={item.percentage as any}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e8f4ebff',
  '& .MuiLinearProgress-bar': {
    backgroundColor: COLORS[index % COLORS.length],
  },
                }}
              />
              <Typography
                sx={{
                  width: 45,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {item.percentage}%
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        {/* Summary Footer */}
       
      </CardContent>
    </Card>
  );
};

export default LawyerListCard;
