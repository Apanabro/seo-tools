# SEO Toolkit - Professional SEO Tools

A full-stack SEO tools platform with Google-level UI/UX, deployed on GitHub Pages (frontend) and Koyeb (backend).

## Live Demo

- **Frontend**: [https://yourusername.github.io/seo-tools](https://yourusername.github.io/seo-tools)
- **Backend API**: [https://seo-tools-api.koyeb.app](https://seo-tools-api.koyeb.app)

## Features

### SEO Tools
- **Keyword Rank Tracker** - Track Google search rankings
- **On-Page SEO Audit** - Comprehensive page analysis
- **Broken Link Checker** - Find broken links
- **Meta Tags Generator** - Create optimized meta tags
- **Robots.txt Generator** - Control search engine crawling
- **Sitemap Generator** - Create XML sitemaps

### Tech Stack
- **Frontend**: React 19, Framer Motion, Vite
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Hosting**: GitHub Pages + Koyeb
- **Monetization**: PropellerAds

## Deployment

### Frontend (GitHub Pages)
1. Fork this repository
2. Go to Settings > Pages
3. Select "GitHub Actions" as source
4. The frontend will deploy automatically

### Backend (Koyeb)
1. Create a Koyeb account at [koyeb.com](https://koyeb.com)
2. Connect your GitHub repository
3. Select the `backend` directory
4. Deploy with the following settings:
   - Instance Type: Free
   - Port: 3001
   - Start Command: `node server.js`

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=3001
CORS_ORIGIN=https://yourusername.github.io
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Project Structure

```
seo-tools-fullstack/
├── .github/workflows/    # GitHub Actions
├── backend/              # Express API
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/             # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## License

MIT
