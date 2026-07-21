import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

interface CountryDistributionProps {
  data: Array<{ country: string; count: number }>;
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

  // Create a map of country names to contract counts
  const countryDataMap = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((item) => {
      const countryName = countryCodeMap[item.country];
      if (countryName) {
        map[countryName] = item.count;
      }
    });
    return map;
  }, [data]);

  // Calculate min and max for color scale
  const { minCount, maxCount } = useMemo(() => {
    const counts = Object.values(countryDataMap);
    return {
      minCount: counts.length > 0 ? Math.min(...counts) : 0,
      maxCount: counts.length > 0 ? Math.max(...counts) : 1,
    };
  }, [countryDataMap]);

  // Color scale function (lighter to darker blue based on contract count)
  const getColor = (countryName: string): string => {
    const count = countryDataMap[countryName];
    if (!count) return '#F0F4F8'; // Light gray for no data

    const ratio = (count - minCount) / (maxCount - minCount || 1);
    // Scale from light blue (#D1E7FF) to dark blue (#0052CC)
    const hue = 217; // Blue hue
    const lightness = 95 - ratio * 60; // From 95% light to 35% light
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

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

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
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
            <Box sx={{ width: '16px', height: '16px', backgroundColor: '#D1E7FF', borderRadius: '2px' }} />
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
                  const count = countryDataMap[countryName];
                  const isHovered = hoveredCountry === countryName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={
                        count
                          ? `${countryName}\nContracts: ${count}`
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
                          cursor: count ? 'pointer' : 'default',
                          opacity: isHovered ? 1 : 0.9,
                          transition: 'all 0.3s ease',
                        },
                        hover: {
                          fill: getColor(countryName),
                          stroke: '#02355a',
                          strokeWidth: 1.5,
                          outline: 'none',
                          cursor: count ? 'pointer' : 'default',
                          opacity: 1,
                          transition: 'all 0.3s ease',
                        },
                        pressed: {
                          fill: getColor(countryName),
                          stroke: '#02355a',
                          strokeWidth: 1.5,
                          outline: 'none',
                          cursor: count ? 'pointer' : 'default',
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
