import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const ContrastChecker = () => {
  const { dark } = useTheme();
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);

  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const relativeLuminance = (hex) => {
    const { r, g, b } = hexToRGB(hex);
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const contrastRatio = useMemo(() => {
    const l1 = relativeLuminance(fg);
    const l2 = relativeLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05));
  }, [fg, bg]);

  const wcagResults = useMemo(() => {
    const ratio = contrastRatio;
    return {
      aa_normal: ratio >= 4.5,
      aa_large: ratio >= 3,
      aaa_normal: ratio >= 7,
      aaa_large: ratio >= 4.5,
    };
  }, [contrastRatio]);

  const swapColors = () => { setFg(bg); setBg(fg); };

  const presets = [
    { name: 'Black on White', fg: '#000000', bg: '#ffffff' },
    { name: 'White on Black', fg: '#ffffff', bg: '#000000' },
    { name: 'Dark Blue on White', fg: '#1a237e', bg: '#ffffff' },
    { name: 'Gray on White', fg: '#757575', bg: '#ffffff' },
    { name: 'Yellow on Black', fg: '#ffd600', bg: '#000000' },
    { name: 'Red on White', fg: '#d32f2f', bg: '#ffffff' },
  ];

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">👁️</div>
        <h1>Color Contrast Checker</h1>
        <p>Check WCAG accessibility contrast ratios — test text readability and compliance levels</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div className="form-group">
            <label>Foreground (Text)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: '48px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '14px' }} />
            </div>
          </div>
          <button className="btn-secondary" onClick={swapColors} style={{ padding: '10px', borderRadius: '50%' }}>⇄</button>
          <div className="form-group">
            <label>Background</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: '48px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '14px' }} />
            </div>
          </div>
        </div>

        <div style={{ padding: '32px', borderRadius: '16px', background: bg, border: '2px solid var(--gray-200)', textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ color: fg, fontSize: `${fontSize}px`, fontWeight, margin: 0, lineHeight: 1.5 }}>
            The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ color: fg, fontSize: `${Math.max(14, fontSize * 1.5)}px`, fontWeight: Math.max(700, fontWeight), marginTop: '12px' }}>
            Large Text Sample (18px+ bold)
          </p>
        </div>

        <div className="form-row" style={{ marginBottom: '16px' }}>
          <div className="form-group">
            <label>Font Size: {fontSize}px</label>
            <input type="range" min="10" max="48" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Font Weight: {fontWeight}</label>
            <input type="range" min="100" max="900" step="100" value={fontWeight} onChange={(e) => setFontWeight(parseInt(e.target.value))} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '48px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: contrastRatio >= 7 ? 'var(--google-green)' : contrastRatio >= 4.5 ? 'var(--google-yellow)' : 'var(--google-red)' }}>
            {contrastRatio.toFixed(2)}:1
          </div>
          <div style={{ fontSize: '14px', color: 'var(--gray-500)' }}>Contrast Ratio</div>
        </div>

        <div className="info-grid" style={{ marginBottom: '16px' }}>
          <div className="metric-card" style={{ background: wcagResults.aa_normal ? 'var(--google-green-light)' : 'var(--google-red-light)' }}>
            <div className="metric-value" style={{ fontSize: '20px' }}>{wcagResults.aa_normal ? '✅' : '❌'}</div>
            <div className="metric-label">AA Normal</div>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>≥ 4.5:1</div>
          </div>
          <div className="metric-card" style={{ background: wcagResults.aa_large ? 'var(--google-green-light)' : 'var(--google-red-light)' }}>
            <div className="metric-value" style={{ fontSize: '20px' }}>{wcagResults.aa_large ? '✅' : '❌'}</div>
            <div className="metric-label">AA Large</div>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>≥ 3:1</div>
          </div>
          <div className="metric-card" style={{ background: wcagResults.aaa_normal ? 'var(--google-green-light)' : 'var(--google-red-light)' }}>
            <div className="metric-value" style={{ fontSize: '20px' }}>{wcagResults.aaa_normal ? '✅' : '❌'}</div>
            <div className="metric-label">AAA Normal</div>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>≥ 7:1</div>
          </div>
          <div className="metric-card" style={{ background: wcagResults.aaa_large ? 'var(--google-green-light)' : 'var(--google-red-light)' }}>
            <div className="metric-value" style={{ fontSize: '20px' }}>{wcagResults.aaa_large ? '✅' : '❌'}</div>
            <div className="metric-label">AAA Large</div>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>≥ 4.5:1</div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Presets</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
            {presets.map((p, i) => (
              <button key={i} className="btn-secondary" onClick={() => { setFg(p.fg); setBg(p.bg); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: p.bg, border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: p.fg }}>Aa</div>
                <span style={{ fontSize: '12px' }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
