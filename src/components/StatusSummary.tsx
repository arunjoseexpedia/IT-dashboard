import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatusSummaryProps {
  title: string;
  borradorCount: number;
  publicadoCount: number;
  cerradoCount: number;
  canceladoCount?: number;
  icon?: React.ReactNode;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({
  title,
  borradorCount,
  publicadoCount,
  cerradoCount,
  canceladoCount = 0,
  icon,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: "1px solid #E5E7EB",
        borderRadius: '20px',
        boxShadow: '0 6px 20px rgba(15,23,42,.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.75rem',
            }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0066cc',
                fontSize: '1.8rem',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Status Summary Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
          {/* Borrador */}
          <Box sx={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '0.7rem',
              }}
            >
              Borrador
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#003d99',
                fontSize: '1.8rem',
                marginTop: '4px',
                lineHeight: 1,
              }}
            >
              {borradorCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Publicado */}
          <Box sx={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '0.7rem',
              }}
            >
              Publicado
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
                fontSize: '1.8rem',
                marginTop: '4px',
                lineHeight: 1,
              }}
            >
              {publicadoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cerrado */}
          <Box sx={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '0.7rem',
              }}
            >
              Cerrado
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#0066cc',
                fontSize: '1.8rem',
                marginTop: '4px',
                lineHeight: 1,
              }}
            >
              {cerradoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cancelado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '0.7rem',
              }}
            >
              Cancelado
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#d32f2f',
                fontSize: '1.8rem',
                marginTop: '4px',
                lineHeight: 1,
              }}
            >
              {canceladoCount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusSummary;
