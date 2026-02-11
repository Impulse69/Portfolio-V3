# Deployment Guide for Isaac's Portfolio

## Prerequisites
- GitHub Account
- Vercel Account (connected to GitHub)

## Steps to Deploy

1. **Commit Changes**:
   Run the following commands in your terminal to commit all recent changes:
   ```bash
   git add .
   git commit -m "feat: Implement portfolio redesign with scrollytelling and SEO"
   ```

2. **Push to GitHub**:
   Ensure you have a remote repository set up.
   ```bash
   git push origin main
   ```
   (If this is a new repo, follow GitHub instructions to add remote origin)

3. **Deploy on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** -> **Project**.
   - Import your `portfolio` repository from GitHub.
   - Vercel will auto-detect Next.js.
   - **Environment Variables**: No specific env vars are needed for this static portfolio unless you add analytics or contact forms later.
   - Click **Deploy**.

## Post-Deployment
- The site will be available at `your-project.vercel.app`.
- You can configure a custom domain (e.g., `isaacasamoahjunior.com`) in the Vercel project settings -> Domains.

## Verification
- Check the `sitemap.xml` at `/sitemap.xml`.
- Check `robots.txt` at `/robots.txt`.
- Verify SEO meta tags using a tool like [Meta Tags](https://metatags.io/).
