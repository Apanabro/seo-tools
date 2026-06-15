import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const FlexboxPlayground = () => {
  const { dark } = useTheme();
  const [containerProps, setContainerProps] = useState({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: '10px',
  });
  const [items, setItems] = useState([
    { id: 1, content: '1', flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
    { id: 2, content: '2', flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
    { id: 3, content: '3', flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  ]);

  const updateContainer = (prop, value) => setContainerProps({ ...containerProps, [prop]: value });

  const updateItem = (id, prop, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [prop]: value } : item));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems([...items, { id: newId, content: String(newId), flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter(i => i.id !== id));
  };

  const containerCSS = `display: flex;
flex-direction: ${containerProps.flexDirection};
justify-content: ${containerProps.justifyContent};
align-items: ${containerProps.alignItems};
flex-wrap: ${containerProps.flexWrap};
gap: ${containerProps.gap}px;`;

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">📦</div>
        <h1>Flexbox Playground</h1>
        <p>Interactive CSS Flexbox layout tool — adjust properties, see live results, copy code</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Container Properties</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {[
                { label: 'flex-direction', prop: 'flexDirection', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
                { label: 'justify-content', prop: 'justifyContent', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
                { label: 'align-items', prop: 'alignItems', options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] },
                { label: 'flex-wrap', prop: 'flexWrap', options: ['nowrap', 'wrap', 'wrap-reverse'] },
              ].map(field => (
                <div key={field.prop}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>{field.label}</label>
                  <select value={containerProps[field.prop]} onChange={(e) => updateContainer(field.prop, e.target.value)} style={{ width: '100%', marginTop: '2px' }}>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>gap: {containerProps.gap}px</label>
                <input type="range" min="0" max="40" value={containerProps.gap} onChange={(e) => updateContainer('gap', e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>Items ({items.length})</h3>
            {items.map(item => (
              <div key={item.id} style={{ padding: '10px', background: 'var(--gray-50)', borderRadius: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>Item {item.id}</span>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--google-red)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--gray-500)' }}>grow</label>
                    <input type="number" min="0" value={item.flexGrow} onChange={(e) => updateItem(item.id, 'flexGrow', parseInt(e.target.value) || 0)} style={{ width: '100%', padding: '4px', fontSize: '12px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--gray-500)' }}>shrink</label>
                    <input type="number" min="0" value={item.flexShrink} onChange={(e) => updateItem(item.id, 'flexShrink', parseInt(e.target.value) || 0)} style={{ width: '100%', padding: '4px', fontSize: '12px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--gray-500)' }}>basis</label>
                    <input type="text" value={item.flexBasis} onChange={(e) => updateItem(item.id, 'flexBasis', e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '12px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', color: 'var(--gray-500)' }}>align-self</label>
                    <select value={item.alignSelf} onChange={(e) => updateItem(item.id, 'alignSelf', e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '12px' }}>
                      {['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn-secondary" onClick={addItem} style={{ width: '100%', fontSize: '13px' }}>+ Add Item</button>
          </div>

          <div>
            <div style={{ background: 'var(--gray-100)', borderRadius: '12px', padding: '20px', minHeight: '300px', marginBottom: '16px' }}>
              <div style={{
                display: containerProps.display,
                flexDirection: containerProps.flexDirection,
                justifyContent: containerProps.justifyContent,
                alignItems: containerProps.alignItems,
                flexWrap: containerProps.flexWrap,
                gap: `${containerProps.gap}px`,
                minHeight: '260px',
                padding: '12px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '8px',
                border: '2px dashed var(--gray-300)',
              }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    flexGrow: item.flexGrow,
                    flexShrink: item.flexShrink,
                    flexBasis: item.flexBasis,
                    alignSelf: item.alignSelf,
                    minWidth: '60px',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `hsl(${item.id * 60}, 70%, 60%)`,
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '18px',
                    padding: '12px',
                  }}>
                    {item.content}
                  </div>
                ))}
              </div>
            </div>

            <div className="result-box">
              <div className="result-header">
                <h2>CSS Code</h2>
                <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(containerCSS)}>📋 Copy</button>
              </div>
              <pre className="code-block" style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: '12px', fontSize: '13px', fontFamily: 'var(--font-mono)', overflow: 'auto' }}>
                <code>{containerCSS}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexboxPlayground;
