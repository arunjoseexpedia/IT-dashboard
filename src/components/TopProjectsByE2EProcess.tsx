import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ProjectData {
  contractNumber: string;
  projectName: string;
  workAreaId: string;
  e2eProcess: number;
}

interface TopProjectsByE2EProcessProps {
  data: ProjectData[];
  title?: string;
}

const TopProjectsByE2EProcess = ({
  data,
  title = 'Top Projects by E2E Process',
}: TopProjectsByE2EProcessProps) => {
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
            Contract: {dataPoint.contractNumber}
          </Typography>
          {dataPoint.workAreaId && (
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '4px',
              }}
            >
              Work Area: {dataPoint.workAreaId}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            {dataPoint.projectName}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            Total E2E Process: {dataPoint.e2eProcess.toLocaleString('en-US', { maximumFractionDigits: 2 })}
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
                margin={{ top: 10, right: 30, left: 90, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="0" stroke="transparent" />
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  tick={{ fontSize: 13 }}
                />
                <YAxis
                  dataKey="contractNumber"
                  type="category"
                  width={80}
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="e2eProcess"
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
                />
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
                No project data available
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
              Total E2E Process
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
              {data.reduce((sum, item) => sum + item.e2eProcess, 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}
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
              Average E2E Process
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#22C55E',
              }}
            >
              {data.length > 0
                ? (data.reduce((sum, item) => sum + item.e2eProcess, 0) / data.length).toLocaleString('en-US', { maximumFractionDigits: 2 })
                : 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopProjectsByE2EProcess;
