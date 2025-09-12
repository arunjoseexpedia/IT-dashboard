import React from "react";

const roadmapData = [
  { portal: "Portal", year: 2027, action: "Re-platform", project: "WM" },
  { portal: "Portal", year: 2027, action: "Re-platform", project: "SolMan" },
  { portal: "Portal", year: 2027, action: "Re-platform", project: "SAP gateway/Fiori" },
  { portal: "Portal", year: 2027, action: "Re-platform", project: "Live Compare" },
  { portal: "Portal", year: 2026, action: "Upgrade", project: "Data Masking" },
  { portal: "Portal", year: 2026, action: "Upgrade", project: "Data Masking" }, // you had “upgrade” twice for Data Masking, so I included once; you can remove duplicates.
];

export const ProductRoadMap = () => {
  return (
    <div style={{ maxWidth: 700, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h6 style={{ textAlign: "center" }}>Product EOL/Roadmap</h6>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "white" }}>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>Portal</th>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>WM</th>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>SolMan</th>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>SAP Gateway/Fiori</th>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>Live Compare</th>
            <th style={{ fontSize:'12px',padding: "9px 12px",backgroundColor:'#234F1E',color:'white', borderBottom: "1px solid white" }}>Data Masking</th>
          </tr>
        </thead>
        <tbody>
        <tr style={{ backgroundColor: "white" }}>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px",backgroundColor:'#00A3B5'}}>2027<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Re-platform</i></sub></td>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px",backgroundColor:'#00A3B5'}}>2027<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Re-platform</i></sub></td>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px", backgroundColor:'#00A3B5'}}>2027<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Re-platform</i></sub></td>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px",backgroundColor:'#00A3B5'}}>2027<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Re-platform</i></sub></td>
            <td style={{ fontSize:'12px',padding: "9px 12px"}}></td>
            <td style={{ fontSize:'12px',padding: "9px 12px" }}></td>
          </tr>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <td style={{ fontSize:'12px',padding: "9px 12px" }}></td>
            <td style={{ fontSize:'12px',padding: "9px 12px" }}></td>
            <td style={{ fontSize:'12px',padding: "9px 12px" }}></td>
            <td style={{ fontSize:'12px',padding: "9px 12px" }}></td>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px",backgroundColor:'#FFA700' }}>2026<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Upgrade</i></sub></td>
            <td style={{ fontSize:'12px',color:'white',padding: "9px 12px",backgroundColor:'#FFA700'}}>2026<sub style={{fontSize:'8px',color:'#99EDC3'}}><i>Upgrade</i></sub></td>
          </tr>
        </tbody>
        
      </table>
    </div>
  );
};

