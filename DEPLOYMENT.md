# Vercel Deployment Guide

## Project Modifications Made

### 1. Fixed Asset Paths
- Changed `/public/src/images/` to `src/images/` in HTML
- Updated font paths in CSS from `/public/src/fonts/` to `src/fonts/`
- Fixed all asset references to work with Vercel's static hosting

### 2. Updated Build Configuration
- Modified `package.json` to include `vercel-build` script
- Removed problematic `main` field that was causing build issues
- Updated build command to use `--public-url ./` for proper asset resolution

### 3. Fixed External Dependencies
- Replaced local node_modules CSS imports with CDN links
- Updated Glide.js and Tagify CSS imports to use CDN versions
- This prevents build issues with external library imports

### 4. Created Vercel Configuration
- Added `vercel.json` with proper build settings
- Configured output directory as `dist`
- Set up proper routing for SPA behavior

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd /Users/yuluo/deco2017-brew-journal
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Confirm build settings
   - Deploy

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Build Settings**:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

## Build Process

The project now uses the following build process:

1. **Install dependencies**: `npm install`
2. **Build with Parcel**: `npm run vercel-build`
   - Compiles SCSS to CSS
   - Bundles JavaScript modules
   - Optimizes assets
   - Outputs to `dist/` directory

## Project Structure After Build

```
dist/
├── index.html              # Main HTML file
├── public.*.css           # Compiled stylesheets
├── public.*.js            # Bundled JavaScript
├── logo.*.png            # Optimized images
├── hero-image.*.png      # Optimized images
├── close.*.svg           # Optimized SVGs
└── *.woff2, *.woff       # Optimized fonts
```

## Features Preserved

All original features are preserved:
- ✅ Coffee tracking and management
- ✅ Gadget (grinder/dripper) management
- ✅ Brew logging with forms
- ✅ Interactive charts and visualizations
- ✅ Responsive design
- ✅ Local storage data persistence
- ✅ Custom styling and animations

## Notes

- The application is now a **static site** (no server required)
- All data is stored in **local storage** (client-side only)
- External libraries are loaded from **CDN** for better performance
- The build process **optimizes assets** for production

## Troubleshooting

If deployment fails:

1. **Check build locally**:
   ```bash
   npm run vercel-build
   ```

2. **Verify dist folder**:
   ```bash
   ls -la dist/
   ```

3. **Test locally**:
   ```bash
   cd dist && python3 -m http.server 8000
   ```

4. **Check Vercel logs** in the dashboard for specific error messages
