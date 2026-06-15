import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const BoxShadowGenerator = () => {
  const { dark } = useTheme();
  const [shadows, setShadows] = useState([
    { offsetX: 0, offsetY: 4, blur: 10, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false },
  ]);
  const [borderRadius, setBorderRadius] = useState(16);
  const [bgColor, setBgColor] = useState('#ffffff');

  const shadowCSS = shadows.map(s => 
    `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
  ).join(', ');

  const presets = [
    { name: 'Subtle', shadows: [{ offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false }] },
    { name: 'Medium', shadows: [{ offsetX: 0, offsetY: 4, blur: 10, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false }] },
    { name: 'Large', shadows: [{ offsetX: 0, offsetY: 10, blur: 30, spread: 0, color: 'rgba(0,0,0,0.15)', inset: false }] },
    { name: 'Colored', shadows: [{ offsetX: 0, offsetY: 8, blur: 24, spread: 0, color: 'rgba(66,133,244,0.3)', inset: false }] },
    { name: 'Inset', shadows: [{ offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.1)', inset: true }] },
    { name: 'Neumorphism', shadows: [
      { offsetX: 8, offsetY: 8, blur: 16, spread: 0, color: 'rgba(0,0,0,0.15)', inset: false },
      { offsetX: -8, offsetY: -8, blur: 16, spread: 0, color: 'rgba(255,255,255,0.7)', inset: false },
    ]},
    { name: 'Double', shadows: [
      { offsetX: 0, offsetY: 4, blur: 8, spread: -2, color: 'rgba(0,0,0,0.1)', inset: false },
      { offsetX: 0, offsetY: 12, blur: 24, spread: 4, color: 'rgba(0,0,0,0.08)', inset: false },
    ]},
  ];

  const addShadow = () => {
    setShadows([...shadows, { offsetX: 0, offsetY: 0, blur: 0, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false }]);
  };

  const removeShadow = (index) => {
    if (shadows.length > 1) setShadows(shadows.filter((_, i) => i !== index));
  };

  const updateShadow = (index, field, value) => {
    const newShadows = [...shadows];
    newShadows[index][field] = field === 'inset' ? value : (field === 'color' ? value : parseInt(value) || 0);
    setShadows(newShadows);
  };

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">🔲</div>
        <h1>Box Shadow Generator</h1>
        <p>Create CSS box shadows with live preview — multiple shadows, presets, copy CSS</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: 'var(--gray-100)', borderRadius: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '200px',
            height: '200px',
            background: bgColor,
            borderRadius: `${borderRadius}px`,
            boxShadow: shadowCSS,
            transition: 'all 0.3s ease',
          }} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Background Color</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '40px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '14px' }} />
            </div>
          </div>
          <div className="form-group">
            <label>Border Radius: {borderRadius}px</label>
            <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value))} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
          {shadows.map((s, i) => (
            <div key={i} style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: '12px', border: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Shadow {i + 1}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                    <input type="checkbox" checked={s.inset} onChange={(e) => updateShadow(i, 'inset', e.target.checked)} /> Inset
                  </label>
                  {shadows.length > 1 && (
                    <button className="btn-secondary" onClick={() => removeShadow(i)} style={{ padding: '2px 8px', fontSize: '12px' }}>✕</button>
                  )}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '8px' }}>
                <div><label style={{ fontSize: '11px', color: 'var(--gray-500)' }}>X</label><input type="number" value={s.offsetX} onChange={(e) => updateShadow(i, 'offsetX', e.target.value)} style={{ width: '100%', textAlign: 'center' }} /></div>
                <div><label style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Y</label><input type="number" value={s.offsetY} onChange={(e) => updateShadow(i, 'offsetY', e.target.value)} style={{ width: '100%', textAlign: 'center' }} /></div>
                <div><label style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Blur</label><input type="number" value={s.blur} onChange={(e) => updateShadow(i, 'blur', e.target.value)} style={{ width: '100%', textAlign: 'center' }} /></div>
                <div><label style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Spread</label><input type="number" value={s.spread} onChange={(e) => updateShadow(i, 'spread', e.target.value)} style={{ width: '100%', textAlign: 'center' }} /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="color" value={s.color.startsWith('#') ? s.color : '#000000'} onChange={(e) => updateShadow(i, 'color', e.target.value)} style={{ width: '36px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                <input type="text" value={s.color} onChange={(e) => updateShadow(i, 'color', e.target.value)} style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '13px' }} />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn-secondary" onClick={addShadow} style={{ marginBottom: '16px' }}>+ Add Shadow</button>

        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Presets</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
            {presets.map((p, i) => (
              <button key={i} className="btn-secondary" onClick={() => setShadows(p.shadows)} style={{ padding: '12px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', margin: '0 auto 8px', boxShadow: p.shadows.map(s => `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ') }} />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div className="result-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="result-header">
          <h2>CSS Code</h2>
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(`box-shadow: ${shadowCSS};`)}>📋 Copy</button>
        </div>
        <pre className="code-block" style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: '12px', fontSize: '14px', fontFamily: 'var(--font-mono)', overflow: 'auto' }}>
          <code>box-shadow: {shadowCSS};</code>
        </pre>
      </motion.div>
    </div>
  );
};

export default BoxShadowGenerator;
