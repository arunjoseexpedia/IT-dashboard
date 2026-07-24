import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  complianceData?: {
    compliant: number;
    nonCompliant: number;
  };
  completionRate?: number;
}

const COLORS = [
  '#2a78d6', // Blue - No (Admin)
  '#eb6834', // Orange - Jorge Henríquez
  '#1baf7a', // Teal - Ángel Díaz
  '#eda100', // Yellow - Iván Quintana
  '#e87ba4', // Magenta - Verónica García
  '#008300', // Green - Jhomar López
  '#4a3aa7', // Violet - José Toledo
  '#e34948', // Red - Miguel Sierra
  '#9b9b9b', // Gray - Gabriel Ugas
  '#cccccc', // Light Gray - Santiago Rangel
];

const AssignedLawyerDashboard = ({
  data,
  complianceData = { compliant: 241, nonCompliant: 18 },
  completionRate = 98.1
 }: AssignedLawyerDashboardProps) => {
  const { t } = useTranslation();
  const displayTitle = t('assignedLawyer');
  const totalContracts = data.reduce((sum, item) => sum + item.count, 0);

  // Custom label for donut chart showing percentage
  const renderCustomLabel = (entry: any) => {
    return `${entry}%`;
  };

  // Custom tooltip for donut chart
  const CustomDonutTooltip = (props: any) => {
    console.log(props);
    const { active, payload } = props;
    console.log(payload);
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
            fontSize: '15px',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            height: '21px', // Fixed height for consistency
          }}
        >
          {displayTitle}
        </Typography>

        {/* Main Content Grid - Top aligned */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'auto auto 1fr' },
            gap: '24px',
            alignItems: 'flex-start',
            '@media (max-width: 1024px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          {/* Left Column - Donut Chart (Fixed 220×220px to accommodate labels) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px',
              width: '220px',
              height: '220px',
              flexShrink: 0,
              overflow: 'visible',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={{ 
                      formatter: renderCustomLabel,
                      position: 'outside',
                      offset: 8,
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                    innerRadius={45}
                    outerRadius={72}
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
                  <Tooltip content={<CustomDonutTooltip props={data}/>} />
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
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#2563EB',
                  }}
                >
                  {totalContracts}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '10px',
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

          {/* Middle Column - Metric Cards (Updated to 2x2 grid) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              width: '290px',
              flexShrink: 0,
            }}
          >
            {/* Total Contracts */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '4px',
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

            {/* BR Compliance */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                BR Compliant
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#22C55E',
                }}
              >
                {complianceData.compliant.toLocaleString()}
              </Typography>
            </Box>

            {/* Max Assigned */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '4px',
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

            {/* BR Non-Compliance */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                BR Non-Compliant
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#EF4444',
                }}
              >
                {complianceData.nonCompliant.toLocaleString()}
              </Typography>
            </Box>

            {/* Completion Rate */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
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
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#6366F1',
                }}
              >
                {completionRate.toFixed(1)}%
              </Typography>
            </Box>

            {/* Avg per Lawyer */}
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
                
              }}
            >
              <Typography
                sx={{
                  fontSize: '9px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '4px',
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
                {data.length > 0 ? Math.round(totalContracts / data.length) : 0}
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Horizontal Bar Chart (Full Width, 260px height) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              padding: '12px',
              flex: 1,
            }}
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 8, bottom: 10 }}
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

        
      </CardContent>
    </Card>
  );
};

export default AssignedLawyerDashboard;
