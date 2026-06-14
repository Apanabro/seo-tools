# PropellerAds Integration Guide

## Quick Start (No Minimum Traffic)

### Step 1: Create Account
1. Go to [propellerads.com](https://www.propellerads.com)
2. Sign up as Publisher
3. Add your website

### Step 2: Get Ad Code
1. Go to "Sites" > "Add Site"
2. Enter your GitHub Pages URL
3. Choose ad formats:
   - **Push Notifications** (recommended)
   - **Native Ads**
   - **Pop-under**

### Step 3: Add to React App

#### Option A: Add to index.html (All pages)
```html
<!-- In your index.html <head> section -->
<script src="https://propellerads.com/po.js" async></script>
<script>
  (window.po = window.po || []).push({
    site_id: YOUR_SITE_ID
  });
</script>
```

#### Option B: Add to specific components
```jsx
// In your App.jsx or layout component
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://propellerads.com/po.js';
  script.async = true;
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
}, []);
```

### Step 4: Verify
1. Wait 24-48 hours for approval
2. Check dashboard for impressions/clicks
3. Minimum payout: $5 (PayPal, Wire)

## Alternative Ad Networks

### Adsterra (No Minimum Traffic)
```html
<!-- Popunder ad -->
<script src="https://adsterra.com/p.js"></script>
```

### Ezoic (1K+ visits/month)
```html
<!-- AI-optimized ads -->
<script src="https://cdn.ezojs.com/ezoic/saas/eza.js"></script>
```

## Best Practices
1. Don't place too many ads (max 3 per page)
2. Keep ads above the fold
3. Don't interrupt user experience
4. Test different ad formats
5. Monitor performance in dashboard
