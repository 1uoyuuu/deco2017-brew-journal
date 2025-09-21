# Vercel Deployment Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue 1: Data Not Showing (Database Connection)
**Problem**: Data exists in database but not displayed in production
**Causes**:
- Missing environment variables in Vercel
- Database connection failing silently
- CORS issues

**Solutions**:

1. **Set Environment Variables in Vercel**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     VITE_SUPABASE_URL = https://pcvsoorcldhtykxmejkn.supabase.co
     VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnNvb3JjbGRodHlreG1lamtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzA4NDEsImV4cCI6MjA3Mzk0Njg0MX0.OmSWtXNS3Y5L_K9WW8zPVKFgT8FQv0GUC5WbI5i0M9U
     ```

2. **Check Browser Console**:
   - Open browser dev tools
   - Look for error messages
   - Check if environment variables are loaded

3. **Verify Database Setup**:
   - Run `database-schema.sql` in Supabase SQL Editor
   - Run `npm run populate-sample-data` to add test data

### Issue 2: Input Styling Not Applied
**Problem**: Form inputs showing default browser styling instead of custom bottom-border style
**Causes**:
- CSS not being properly bundled
- CSS specificity issues
- Build process problems

**Solutions**:

1. **Check CSS Compilation**:
   - Verify SCSS is being compiled correctly
   - Check if `!important` rules are working

2. **Force CSS Refresh**:
   - Clear browser cache
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)

3. **Check Build Output**:
   - Verify CSS files are in the `dist` folder
   - Check if styles are being loaded

## 🔧 Quick Fixes

### Fix 1: Update Vercel Configuration
```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "https://pcvsoorcldhtykxmejkn.supabase.co",
    "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnNvb3JjbGRodHlreG1lamtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzA4NDEsImV4cCI6MjA3Mzk0Njg0MX0.OmSWtXNS3Y5L_K9WW8zPVKFgT8FQv0GUC5WbI5i0M9U"
  },
  "routes": [
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Fix 2: Test Database Connection
Add this to your browser console on the production site:
```javascript
// Test database connection
console.log('Environment:', {
  url: import.meta.env?.VITE_SUPABASE_URL,
  key: import.meta.env?.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing'
});
```

## 📋 Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Database schema created in Supabase
- [ ] Sample data populated
- [ ] Build process completed successfully
- [ ] CSS files present in dist folder
- [ ] No console errors in production

## 🆘 Still Having Issues?

1. **Check Vercel Build Logs**:
   - Go to Vercel dashboard → Deployments
   - Click on latest deployment
   - Check build logs for errors

2. **Test Locally**:
   - Run `npm run build`
   - Check if `dist` folder has all files
   - Test with `npx serve dist`

3. **Database Permissions**:
   - Check Supabase RLS policies
   - Ensure tables are accessible
   - Verify API keys are correct
