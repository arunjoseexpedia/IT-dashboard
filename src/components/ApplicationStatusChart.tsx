import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ApplicationStatusChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  title: string;
  height?: number;
}

const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = ({ data, title }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(15,23,42,.08)',
        height: '100%',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#02355a',
            textTransform: 'uppercase',
            marginBottom: '12px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '8px',
            textAlign: 'center',
            flexShrink: 0,
            fontSize: '13px',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '12px' }} />
              <Bar dataKey="FIRMADO" stackId="a" fill="#003d99" radius={[4, 4, 0, 0]} />
              <Bar dataKey="NO FIRMADO" stackId="a" fill="#1976d2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusChart;
