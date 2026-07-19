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

interface ContractData {
  workAreaId: string;
  contractType: string;
  contractCount: number;
}

interface ContractsByWorkAreaProps {
  data: ContractData[];
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

const ContractsByWorkArea = ({
  data,
  title = 'Contracts by Work Area',
}: ContractsByWorkAreaProps) => {
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
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              marginBottom: '2px',
            }}
          >
            Work Area: {dataPoint.workAreaId}
          </Typography>
          {dataPoint.contractType && (
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '4px',
              }}
            >
              Type: {dataPoint.contractType}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            Contracts: {dataPoint.contractCount}
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="0" stroke="transparent" />
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  tick={{ fontSize: 13 }}
                />
                <YAxis
                  dataKey="workAreaId"
                  type="category"
                  width={90}
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="contractCount"
                  fill="#2563EB"
                  radius={[0, 6, 6, 0]}
                  label={{
                    position: 'right',
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#374151',
                    offset: 8,
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
                height: 400,
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
                No contract data available
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
              Total Work Areas
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
              {data.reduce((sum, item) => sum + item.contractCount, 0).toLocaleString()}
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
              Avg Contracts per Area
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              {data.length > 0
                ? (data.reduce((sum, item) => sum + item.contractCount, 0) / data.length).toLocaleString('en-US', { maximumFractionDigits: 1 })
                : 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContractsByWorkArea;
