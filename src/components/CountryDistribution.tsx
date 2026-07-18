import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CountryDistributionProps {
  data: Array<{ country: string; count: number }>;
  title: string;
}

const CountryDistribution = ({ data, title }: CountryDistributionProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(15,23,42,.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          padding: '24px',
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
            marginBottom: '20px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '10px',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          {title}
        </Typography>

        {/* Chart Container with scrolling support */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <ResponsiveContainer width="100%" height={data.length > 8 ? Math.max(250, data.length * 30) : 250}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" stroke="#666" />
              <YAxis
                dataKey="country"
                type="category"
                width={55}
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                formatter={(value: any) => [`${value} applications`, 'Count']}
                labelFormatter={(label: any) => `Country: ${label}`}
              />
              <Bar
                dataKey="count"
                fill="#2563EB"
                radius={[0, 8, 8, 0]}
                label={{
                  position: 'right',
                  fontSize: 12,
                  fontWeight: 600,
                  fill: '#02355a',
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryDistribution;
