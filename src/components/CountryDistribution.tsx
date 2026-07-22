import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface CountryDistributionProps {
  data: Array<{ country: string; count: number; region?: string }>;
  title: string;
}

// Country code mapping for dashboard codes to GeoJSON names
const countryCodeMap: Record<string, string> = {
  ARG: 'Argentina',
  VE: 'Venezuela',
  ECU: 'Ecuador',
  PR: 'Puerto Rico',
  COL: 'Colombia',
  PER: 'Peru',
  RD: 'Dominican Republic',
  HND: 'Honduras',
  GTM: 'Guatemala',
  SLV: 'El Salvador',
  CHI: 'Chile',
  URY: 'Uruguay',
};

// GeoJSON URL for world map
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const CountryDistribution = ({ data, title }: CountryDistributionProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();

  // Create a map of country names to contract counts and region
  const countryDataMap = useMemo(() => {
    const map: Record<string, { count: number; region: string }> = {};
    data.forEach((item) => {
      const countryName = countryCodeMap[item.country];
      if (countryName) {
        map[countryName] = { count: item.count, region: item.region || 'N/A' };
      }
    });
    return map;
  }, [data]);

  // Calculate min and max for color scale
  const { minCount, maxCount } = useMemo(() => {
    const counts = Object.values(countryDataMap).map(item => item.count);
    return {
      minCount: counts.length > 0 ? Math.min(...counts) : 0,
      maxCount: counts.length > 0 ? Math.max(...counts) : 1,
    };
  }, [countryDataMap]);

  // Color scale function (lighter to darker blue based on contract count)
  const getColor = (countryName: string): string => {
    const data = countryDataMap[countryName];
    if (!data) return '#F0F4F8'; // Light gray for no data

    const ratio = (data.count - minCount) / (maxCount - minCount || 1);
    // Scale from light blue (#D1E7FF) to dark blue (#0052CC)
    const hue = 217; // Blue hue
    const lightness = 95 - ratio * 60; // From 95% light to 35% light
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  // Prepare bar chart data (sorted by count descending)
  const barChartData = useMemo(() => {
    return data
      .map((item) => ({
        countryCode: item.country,
        country: countryCodeMap[item.country] || item.country,
        region: item.region || 'N/A',
        count: item.count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

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
            marginBottom: '16px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '10px',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          {title}
        </Typography>

        {/* Tabs */}
        <Box sx={{ marginBottom: '16px', flexShrink: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, value) => setTabValue(value)}
            variant="fullWidth"
            sx={{
              backgroundColor: 'transparent',
              borderBottom: '1px solid #E5E7EB',
              '& .MuiTabs-indicator': {
                backgroundColor: '#02355a',
                height: '3px',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                padding: '12px 16px',
                minHeight: '44px',
                border: 'none',
                outline: 'none',
                position: 'relative',
                transition: 'all 0.2s ease',
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'inset 0 0 0 2px rgba(2, 53, 90, 0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(245, 247, 250, 1)',
                  color: '#374151',
                },
                '&.Mui-selected': {
                  color: '#02355a',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                },
                '& .MuiTouchRipple-root': {
                  display: 'none',
                },
              },
            }}
          >
            <Tab label={`🗺️ ${t('mapTab')}`} />
            <Tab label={`📊 ${t('countryRegionTab')}`} />
          </Tabs>
        </Box>

        {/* Tab Content Container */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* Map Tab */}
          {tabValue === 0 && (
            <>
              {/* Legend */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  fontSize: '12px',
                  color: '#666',
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Box sx={{ width: '16px', height: '16px', backgroundColor: '#F0F4F8', border: '1px solid #ddd', borderRadius: '2px' }} />
                  <span>No Data</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Box sx={{ width: '16px', height: '16px', backgroundColor: '#85BEFF', borderRadius: '2px' }} />
                  <span>Low</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Box sx={{ width: '16px', height: '16px', backgroundColor: '#0052CC', borderRadius: '2px' }} />
                  <span>High</span>
                </Box>
              </Box>

              {/* Map Container */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 0,
                }}
              >
                <ComposableMap projection="geoMercator">
                  <Geographies geography={geoUrl}>
                    {({ geographies }: any) =>
                      geographies.map((geo: any) => {
                        const countryName = geo.properties.name;
                        const countryData = countryDataMap[countryName];
                        const isHovered = hoveredCountry === countryName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            data-tooltip-id="country-tooltip"
                            data-tooltip-content={
                              countryData
                                ? `Place:${countryName}\nRegion: ${countryData.region}\nContracts: ${countryData.count}`
                                : `${countryName}\nNo Data`
                            }
                            onMouseEnter={() => setHoveredCountry(countryName)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            style={{
                              default: {
                                fill: getColor(countryName),
                                stroke: '#D2D2D2',
                                strokeWidth: 0.75,
                                outline: 'none',
                                cursor: countryData ? 'pointer' : 'default',
                                opacity: isHovered ? 1 : 0.9,
                                transition: 'all 0.3s ease',
                              },
                              hover: {
                                fill: getColor(countryName),
                                stroke: '#02355a',
                                strokeWidth: 1.5,
                                outline: 'none',
                                cursor: countryData ? 'pointer' : 'default',
                                opacity: 1,
                                transition: 'all 0.3s ease',
                              },
                              pressed: {
                                fill: getColor(countryName),
                                stroke: '#02355a',
                                strokeWidth: 1.5,
                                outline: 'none',
                                cursor: countryData ? 'pointer' : 'default',
                                opacity: 1,
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              </Box>
            </>
          )}

          {/* Bar Chart Tab */}
          {tabValue === 1 && (
            <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
              <ResponsiveContainer width="100%" height={Math.max(300, barChartData.length * 40)}>
                <BarChart
                  data={barChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis
                    dataKey="country"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value: any) => `${value} contracts`}
                    labelFormatter={(label: any) => {
                      const item = barChartData.find(d => d.country === label);
                      return item ? `${item.country} (${item.region})` : label;
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#0052CC"
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
          )}
        </Box>
      </CardContent>

      {/* Tooltip */}
      <Tooltip
        id="country-tooltip"
        place="top"
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          lineHeight: '1.5',
          zIndex: 1000,
        }}
      />
    </Card>
  );
};

export default CountryDistribution;
