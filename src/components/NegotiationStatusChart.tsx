import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface NegotiationStatusData {
  lawyer: string;
  completed: number;
  inNegotiation: number;
  total: number;
  completedPercentage: string;
  inNegotiationPercentage: string;
}

interface NegotiationStatusChartProps {
  data: NegotiationStatusData[];
  title?: string;
}

const COLORS = {
  completed: '#22C55E', // Green
  inNegotiation: '#F59E0B', // Amber
};

const NegotiationStatusChart = ({
  data,
  }: NegotiationStatusChartProps) => {
  const { t } = useTranslation();
  const displayTitle = t('negotiationStatusBreakdown');
  // Custom tooltip
  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
          }}
        >
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
            {dataPoint.lawyer}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#22C55E', marginBottom: '2px' }}>
            Completed: {dataPoint.completed} ({dataPoint.completedPercentage}%)
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#F59E0B', marginBottom: '2px' }}>
            In Negotiation: {dataPoint.inNegotiation} ({dataPoint.inNegotiationPercentage}%)
          </Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', marginTop: '4px' }}>
            Total: {dataPoint.total}
          </Typography>
        </Box>
      );
    }
    return null;
  };

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

        {/* Chart Container */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                vertical={false}
              />
              <XAxis type="number" stroke="#6B7280" tick={{ fontSize: 13 }} />
              <YAxis
                dataKey="lawyer"
                type="category"
                width={140}
                stroke="#6B7280"
                tick={{ fontSize: 13 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '16px',
                  fontSize: '13px',
                }}
              />
              <Bar
                dataKey="completed"
                name="Completed"
                stackId="a"
                fill={COLORS.completed}
                radius={[0, 6, 6, 0]}
              />
              <Bar
                dataKey="inNegotiation"
                name="In Negotiation"
                stackId="a"
                fill={COLORS.inNegotiation}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Statistics */}
        <Box
          sx={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: '16px',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              Total Completed
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              {data.reduce((sum, item) => sum + item.completed, 0).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              Total In Negotiation
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#F59E0B',
              }}
            >
              {data.reduce((sum, item) => sum + item.inNegotiation, 0).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: '13px',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              Completion Rate
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
              {data.length > 0
                ? (
                    (data.reduce((sum, item) => sum + item.completed, 0) /
                      data.reduce((sum, item) => sum + item.total, 0)) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NegotiationStatusChart;
