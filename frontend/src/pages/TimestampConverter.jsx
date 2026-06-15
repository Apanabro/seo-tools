import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ToolPage.css';

const TimestampConverter = () => {
  const { dark } = useTheme();
  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [results, setResults] = useState(null);
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = (ts) => {
    let date;
    const num = parseInt(ts);
    if (isNaN(num)) return null;
    if (num > 1e12) date = new Date(num);
    else if (num > 1e9) date = new Date(num * 1000);
    else return null;
    if (isNaN(date.getTime())) return null;

    return {
      full: date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      short: date.toLocaleDateString('en-US'),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      relative: getRelativeTime(date),
      timeOnly: date.toLocaleTimeString('en-US'),
      dateOnly: date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      timestamp10: Math.floor(date.getTime() / 1000),
      timestamp13: date.getTime(),
      components: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
      }
    };
  };

  const getRelativeTime = (date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const abs = Math.abs(diff);
    const future = diff < 0;

    if (abs < 60000) return future ? 'In a few seconds' : 'A few seconds ago';
    if (abs < 3600000) return future ? `In ${Math.floor(abs/60000)} min` : `${Math.floor(abs/60000)} min ago`;
    if (abs < 86400000) return future ? `In ${Math.floor(abs/3600000)} hours` : `${Math.floor(abs/3600000)} hours ago`;
    if (abs < 2592000000) return future ? `In ${Math.floor(abs/86400000)} days` : `${Math.floor(abs/86400000)} days ago`;
    return future ? `In ${Math.floor(abs/2592000000)} months` : `${Math.floor(abs/2592000000)} months ago`;
  };

  const handleTimestampConvert = () => {
    setResults(convertTimestamp(timestamp));
  };

  const handleDateConvert = () => {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      setResults(convertTimestamp(Math.floor(date.getTime() / 1000)));
    }
  };

  const handleNow = () => {
    setTimestamp(String(now));
    setResults(convertTimestamp(String(now)));
  };

  return (
    <div className="tool-page">
      <motion.div className="tool-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="tool-icon">🕐</div>
        <h1>Timestamp Converter</h1>
        <p>Convert Unix timestamps to dates and vice versa — live clock, relative time, all formats</p>
      </motion.div>

      <div className="tool-form">
        <div style={{ background: 'var(--gray-50)', borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-500)', marginBottom: '4px' }}>CURRENT UNIX TIMESTAMP</div>
          <div style={{ fontSize: '32px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--google-blue)', letterSpacing: '2px' }}>{now}</div>
          <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '4px' }}>{new Date().toLocaleString()}</div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Unix Timestamp</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="1700000000" style={{ fontFamily: 'var(--font-mono)' }} />
              <button type="button" className="btn-secondary" onClick={handleNow}>Now</button>
            </div>
            <button type="button" className="btn-primary" onClick={handleTimestampConvert} style={{ marginTop: '8px', width: '100%' }}>→ Convert to Date</button>
          </div>
          <div className="form-group">
            <label>Date String</label>
            <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
            <button type="button" className="btn-primary" onClick={handleDateConvert} style={{ marginTop: '8px', width: '100%' }}>→ Convert to Timestamp</button>
          </div>
        </div>
      </div>

      {results && (
        <motion.div className="result-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="result-header">
            <h2>Conversion Results</h2>
            <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(results.iso)}>📋 Copy ISO</button>
          </div>

          <div className="info-grid" style={{ marginBottom: '16px' }}>
            <div className="metric-card blue">
              <div className="metric-value" style={{ fontSize: '16px' }}>{results.timestamp10}</div>
              <div className="metric-label">Unix (10 digits)</div>
            </div>
            <div className="metric-card green">
              <div className="metric-value" style={{ fontSize: '16px' }}>{results.timestamp13}</div>
              <div className="metric-label">Unix (13 digits)</div>
            </div>
            <div className="metric-card yellow">
              <div className="metric-value" style={{ fontSize: '14px' }}>{results.relative}</div>
              <div className="metric-label">Relative Time</div>
            </div>
            <div className="metric-card red">
              <div className="metric-value" style={{ fontSize: '14px' }}>{results.components.dayOfWeek}</div>
              <div className="metric-label">Day of Week</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              { label: 'Full Date', value: results.full },
              { label: 'ISO 8601', value: results.iso },
              { label: 'UTC', value: results.utc },
              { label: 'Short Date', value: results.short },
              { label: 'Time Only', value: results.timeOnly },
              { label: 'Date Only', value: results.dateOnly },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--gray-50)', borderRadius: '10px', border: '1px solid var(--gray-200)' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase' }}>{r.label}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', marginTop: '2px' }}>{r.value}</div>
                </div>
                <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => navigator.clipboard.writeText(r.value)}>Copy</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Components</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {Object.entries(results.components).map(([key, val]) => (
                <div key={key} style={{ textAlign: 'center', padding: '10px', background: 'var(--gray-50)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>{val}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TimestampConverter;
