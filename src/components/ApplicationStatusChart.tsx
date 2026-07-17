import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ApplicationStatusChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  title: string;
  height?: number;
}

const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = ({ data, title, height = 350 }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '100%',
      }}
    >
      <CardContent sx={{ padding: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#02355a',
            textTransform: 'uppercase',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '15px',
          }}
        >
          {title}
        </Typography>

        <Box sx={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
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
