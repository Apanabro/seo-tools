# UptimeRobot Configuration Guide

## Free Monitoring Setup (50 monitors, 5-minute intervals)

### Step 1: Create Account
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up for free (no credit card required)

### Step 2: Add Monitor
1. Click "Add New Monitor"
2. Monitor Type: HTTP(s)
3. Friendly Name: SEO Tools API
4. URL: `https://seo-tools-api.koyeb.app/health`
5. Monitoring Interval: 5 minutes

### Step 3: Alert Contacts
1. Add your email for downtime alerts
2. Optional: Add SMS alerts (paid feature)

## How It Works

UptimeRobot pings your backend every 5 minutes, which:
- Keeps the Koyeb free instance awake (prevents scale-to-zero)
- Monitors uptime and availability
- Sends alerts if the service goes down

## Alternative: Cron-Job.org

If you prefer another option:
1. Go to [cron-job.org](https://cron-job.org)
2. Create free account
3. Create new cron job:
   - URL: `https://seo-tools-api.koyeb.app/health`
   - Schedule: Every 50 minutes
   - Method: GET

## Backend Health Endpoint

Your backend should have a `/health` endpoint that returns:
```json
{
  "status": "ok",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "uptime": 12345,
  "service": "seo-tools-api"
}
```

This endpoint is already included in the backend code.
