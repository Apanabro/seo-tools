import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const GradientGenerator = () => {
  const { dark } = useTheme();
  const [colors, setColors] = useState([
    { color: '#4285f4', position: 0 },
    { color: '#34a853', position: 50 },
    { color: '#fbbc04', position: 100 },
  ]);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState('linear');
  const [radialShape, setRadialShape] = useState('circle');

  const gradientCSS = type === 'linear'
    ? `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
    : `radial-gradient(${radialShape}, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`;

  const presets = [
    { name: 'Sunset', colors: [{ color: '#ff512f', position: 0 }, { color: '#f09819', position: 100 }] },
    { name: 'Ocean', colors: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
    { name: 'Purple', colors: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
    { name: 'Fire', colors: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }] },
    { name: 'Emerald', colors: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }] },
    { name: 'Midnight', colors: [{ color: '#232526', position: 0 }, { color: '#414345', position: 100 }] },
    { name: 'Peach', colors: [{ color: '#ffecd2', position: 0 }, { color: '#fcb69f', position: 100 }] },
    { name: 'Blue', colors: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
    { name: 'Rainbow', colors: [{ color: '#ff0000', position: 0 }, { color: '#ff8800', position: 17 }, { color: '#ffff00', position: 33 }, { color: '#00ff00', position: 50 }, { color: '#0088ff', position: 67 }, { color: '#8800ff', position: 83 }, { color: '#ff00ff', position: 100 }] },
  ];

  const addColor = () => {
    const newColor = { color: '#000000', position: 50 };
    setColors([...colors, newColor]);
  };

  const removeColor = (index) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = field === 'position' ? parseInt(value) || 0 : value;
    setColors(newColors);
  };

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">🌈</div>
        <h1>Gradient Generator</h1>
        <p>Create linear and radial CSS gradients — pick colors, adjust angle, copy CSS code</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ height: '200px', borderRadius: '16px', background: gradientCSS, border: '3px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', marginBottom: '16px' }} />

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="linear">Linear Gradient</option>
              <option value="radial">Radial Gradient</option>
            </select>
          </div>
          {type === 'linear' ? (
            <div className="form-group">
              <label>Angle: {angle}°</label>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} />
            </div>
          ) : (
            <div className="form-group">
              <label>Shape</label>
              <select value={radialShape} onChange={(e) => setRadialShape(e.target.value)}>
                <option value="circle">Circle</option>
                <option value="ellipse">Ellipse</option>
              </select>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
          {colors.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'var(--gray-50)', borderRadius: '10px' }}>
              <input type="color" value={c.color} onChange={(e) => updateColor(i, 'color', e.target.value)} style={{ width: '40px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" value={c.color} onChange={(e) => updateColor(i, 'color', e.target.value)} style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '14px' }} />
              <input type="number" min="0" max="100" value={c.position} onChange={(e) => updateColor(i, 'position', e.target.value)} style={{ width: '60px', textAlign: 'center' }} />
              <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>%</span>
              {colors.length > 2 && (
                <button className="btn-secondary" onClick={() => removeColor(i)} style={{ padding: '4px 8px', fontSize: '12px' }}>✕</button>
              )}
            </div>
          ))}
        </div>

        <button type="button" className="btn-secondary" onClick={addColor} style={{ marginBottom: '16px' }}>+ Add Color</button>

        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Presets</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
            {presets.map((p, i) => (
              <button key={i} className="btn-secondary" onClick={() => setColors(p.colors)} style={{ height: '48px', borderRadius: '8px', background: `linear-gradient(135deg, ${p.colors.map(c => `${c.color} ${c.position}%`).join(', ')})`, color: 'white', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div className="result-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="result-header">
          <h2>CSS Code</h2>
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(`background: ${gradientCSS};`)}>📋 Copy</button>
        </div>
        <pre className="code-block" style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: '12px', fontSize: '14px', fontFamily: 'var(--font-mono)', overflow: 'auto' }}>
          <code>background: {gradientCSS};</code>
        </pre>
      </motion.div>
    </div>
  );
};

export default GradientGenerator;
