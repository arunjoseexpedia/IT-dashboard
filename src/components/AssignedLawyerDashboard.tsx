import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface LawyerData {
  lawyer: string;
  count: number;
  percentage: string;
}

interface AssignedLawyerDashboardProps {
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

const AssignedLawyerDashboard = ({
  data,
  title = 'Assigned Lawyer',
}: AssignedLawyerDashboardProps) => {
  const totalContracts = data.reduce((sum, item) => sum + item.count, 0);

  // Custom label for donut chart showing percentage
  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Custom tooltip for donut chart
  const CustomDonutTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px 12px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
          }}
        >
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
            {data.payload.lawyer}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            {data.payload.count} contracts
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            {data.payload.percentage}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px 12px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
          }}
        >
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
            {data.lawyer}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            Contracts: {data.count}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            {data.percentage}% of total
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const donutData = data.map((item) => ({
    ...item,
    value: item.count,
  }));

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
          padding: '20px',
          '&:last-child': {
            paddingBottom: '10px',
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
            height: '24px', // Fixed height for consistency
          }}
        >
          {title}
        </Typography>

        {/* Main Content Grid - Top aligned */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '45% 55%' },
            gap: '24px',
            alignItems: 'flex-start', // Top align both columns
            '@media (max-width: 1024px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          {/* Left Column - Donut Chart (45%) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px',
              
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
              }}
            >
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    innerRadius={70}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    {donutData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomDonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center text - Total Contracts */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#2563EB',
                  }}
                >
                  {totalContracts}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>
              </Box>
            </Box>


          </Box>

          {/* Right Column - Horizontal Bar Chart (55%) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              
              padding: '12px',
             
            }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 120, bottom: 10 }}
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
                  width={110}
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#2563EB"
                  radius={[0, 6, 6, 0]}
                  label={{
                    position: 'right',
                    fontSize: 13,
                    fontWeight: 600,
                    fill: '#374151',
                    offset: 8,
                  }}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Footer Statistics */}
        <Box
          sx={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
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
              {totalContracts.toLocaleString()}
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
              Max Assigned
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              {data.length > 0 ? data[0].count : 0}
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
              Avg per Lawyer
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#F59E0B',
              }}
            >
              {data.length > 0
                ? Math.round(totalContracts / data.length)
                : 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssignedLawyerDashboard;
