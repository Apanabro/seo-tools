import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const UUIDGenerator = () => {
  const { dark } = useTheme();
  const [uuids, setUuids] = useState([]);
  const [version, setVersion] = useState('v4');
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generateUUIDv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDv1 = () => {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, '0');
    return `${timeHex.slice(4, 12)}-${timeHex.slice(0, 4)}-1${timeHex.slice(0, 3)}-${((Math.random() * 16 | 0) & 0x3 | 0x8).toString(16)}${(Math.random() * 16 | 0).toString(16)}-${(Array.from({length: 12}, () => (Math.random() * 16 | 0).toString(16)).join(''))}`;
  };

  const generateNIL = () => '00000000-0000-0000-0000-000000000000';

  const generate = () => {
    const gen = version === 'v4' ? generateUUIDv4 : version === 'v1' ? generateUUIDv1 : generateNIL;
    const newUuids = Array.from({ length: count }, () => {
      let uuid = gen();
      if (uppercase) uuid = uuid.toUpperCase();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      return uuid;
    });
    setUuids(newUuids);
  };

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">🔑</div>
        <h1>UUID Generator</h1>
        <p>Generate UUIDs (v1, v4, NIL) — customize format, uppercase, no dashes, bulk generate</p>
      </motion.div>

      <div className="tool-form">
        <div className="form-row">
          <div className="form-group">
            <label>UUID Version</label>
            <select value={version} onChange={(e) => setVersion(e.target.value)}>
              <option value="v4">v4 (Random)</option>
              <option value="v1">v1 (Timestamp)</option>
              <option value="nil">NIL UUID</option>
            </select>
          </div>
          <div className="form-group">
            <label>Count ({count})</label>
            <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} /> Uppercase
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} /> No dashes
          </label>
        </div>
        <button type="button" className="btn-primary" onClick={generate}>🔑 Generate UUIDs</button>
      </div>

      {uuids.length > 0 && (
        <motion.div className="result-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="result-header">
            <h2>Generated UUIDs ({uuids.length})</h2>
            <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}>📋 Copy All</button>
          </div>
          <div className="code-list">
            {uuids.map((uuid, i) => (
              <div className="code-item" key={i}>
                <code>{uuid}</code>
                <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => navigator.clipboard.writeText(uuid)}>Copy</button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UUIDGenerator;
