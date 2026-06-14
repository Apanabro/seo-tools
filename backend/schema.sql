-- SEO Tools Database Schema for Supabase

-- API Usage Tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);

-- Rate Limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  endpoint VARCHAR(50) NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ip_address, endpoint, window_start)
);

-- Index for rate limiting checks
CREATE INDEX idx_rate_limits_ip_endpoint ON rate_limits(ip_address, endpoint, window_start);

-- Saved Analysis Results (optional - for user history)
CREATE TABLE IF NOT EXISTS saved_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(100),
  tool_name VARCHAR(50) NOT NULL,
  input_params JSONB,
  result_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for session lookups
CREATE INDEX idx_saved_results_session ON saved_results(session_id);
CREATE INDEX idx_saved_results_tool ON saved_results(tool_name);

-- Row Level Security (RLS)
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_results ENABLE ROW LEVEL SECURITY;

-- Policies (allow service role full access)
CREATE POLICY "Service role can do everything" ON api_usage FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON rate_limits FOR ALL USING (true);
CREATE POLICY "Service role can do everything" ON saved_results FOR ALL USING (true);

-- Function to clean up old rate limit entries
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;
