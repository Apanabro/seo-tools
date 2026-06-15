import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const CSSGridGenerator = () => {
  const { dark } = useTheme();
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [colGap, setColGap] = useState(10);
  const [rowGap, setRowGap] = useState(10);
  const [colTemplate, setColTemplate] = useState('1fr 1fr 1fr');
  const [rowTemplate, setRowTemplate] = useState('auto auto auto');
  const [items, setItems] = useState([
    { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
    { colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 2 },
    { colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2 },
    { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
    { colStart: 2, colEnd: 4, rowStart: 2, rowEnd: 3 },
    { colStart: 1, colEnd: 4, rowStart: 3, rowEnd: 4 },
  ]);

  const gridCSS = `display: grid;
grid-template-columns: ${colTemplate};
grid-template-rows: ${rowTemplate};
gap: ${rowGap}px ${colGap}px;`;

  const presets = [
    { name: '12 Col', columns: 12, colTemplate: 'repeat(12, 1fr)', rowTemplate: 'auto' },
    { name: 'Holy Grail', columns: 3, colTemplate: '200px 1fr 200px', rowTemplate: 'auto 1fr auto' },
    { name: 'Sidebar', columns: 2, colTemplate: '250px 1fr', rowTemplate: '1fr' },
    { name: 'Cards', columns: 3, colTemplate: 'repeat(3, 1fr)', rowTemplate: 'auto' },
    { name: 'Gallery', columns: 4, colTemplate: 'repeat(4, 1fr)', rowTemplate: 'repeat(3, 150px)' },
  ];

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: colTemplate,
    gridTemplateRows: rowTemplate,
    gap: `${rowGap}px ${colGap}px`,
    minHeight: '300px',
    padding: '12px',
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '8px',
    border: '2px dashed var(--gray-300)',
  };

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">🔲</div>
        <h1>CSS Grid Generator</h1>
        <p>Create CSS Grid layouts with live preview — adjust columns, rows, gaps, and item placement</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Grid Properties</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>grid-template-columns</label>
                <input type="text" value={colTemplate} onChange={(e) => setColTemplate(e.target.value)} style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>grid-template-rows</label>
                <input type="text" value={rowTemplate} onChange={(e) => setRowTemplate(e.target.value)} style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>column-gap: {colGap}px</label>
                <input type="range" min="0" max="40" value={colGap} onChange={(e) => setColGap(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>row-gap: {rowGap}px</label>
                <input type="range" min="0" max="40" value={rowGap} onChange={(e) => setRowGap(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>Presets</h3>
            <div style={{ display: 'grid', gap: '6px' }}>
              {presets.map((p, i) => (
                <button key={i} className="btn-secondary" onClick={() => { setColTemplate(p.colTemplate); setRowTemplate(p.rowTemplate); }} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '12px' }}>
                  <strong>{p.name}</strong> <code style={{ fontSize: '10px', color: 'var(--gray-500)' }}>{p.colTemplate}</code>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: 'var(--gray-100)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <div style={gridStyles}>
                {items.map((item, i) => (
                  <div key={i} style={{
                    gridColumn: `${item.colStart} / ${item.colEnd}`,
                    gridRow: `${item.rowStart} / ${item.rowEnd}`,
                    background: `hsl(${i * 50}, 70%, 60%)`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '16px',
                    minHeight: '60px',
                  }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="result-box">
              <div className="result-header">
                <h2>CSS Code</h2>
                <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(gridCSS)}>📋 Copy</button>
              </div>
              <pre className="code-block" style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: '12px', fontSize: '13px', fontFamily: 'var(--font-mono)', overflow: 'auto' }}>
                <code>{gridCSS}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSGridGenerator;
