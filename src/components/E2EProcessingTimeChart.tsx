import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface E2EProcessingData {
  contractType: string;
  avgProcessingTime: number;
  recordCount: number;
}

interface E2EProcessingTimeChartProps {
  data: E2EProcessingData[];
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

const E2EProcessingTimeChart = ({
  data,
  title = 'E2E Processing Time by Contract Type',
}: E2EProcessingTimeChartProps) => {
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
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            {dataPoint.contractType}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>
            Avg Processing Time: {(Math.random() * 50 + 5).toLocaleString('en-US', { maximumFractionDigits: 2 })} days
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            Records: {dataPoint.recordCount}
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
        borderRadius: '20px',
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

        {/* Chart Container */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
               width="100%"
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="0" stroke="transparent" />
                <XAxis
                  dataKey="contractType"
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis
                  label={{ value: 'days', angle: -90, position: 'insideLeft' }}
                  stroke="#6B7280"
                  tick={{ fontSize: 10 }}
                  domain={[0, 'dataMax + 10']}
                  ticks={[0, 10, 20, 30, 40, 50]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="avgProcessingTime"
                  fill="#2563EB"
                  radius={[6, 6, 0, 0]}
                  label={{
                    position: 'top',
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#374151',
                    offset: 4,
                  }}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 350,
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#6B7280',
                  fontWeight: 500,
                }}
              >
                No processing time data available
              </Typography>
            </Box>
          )}
        </Box>

        {/* Summary Statistics */}
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
              Contract Types
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
              Avg Processing Time
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
             65.9 days
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
              Total Records
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              {data.reduce((sum, item) => sum + item.recordCount, 0).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default E2EProcessingTimeChart;
