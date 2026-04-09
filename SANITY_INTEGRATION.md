# Sanity CMS Integration Guide

This project is now integrated with Sanity CMS for headless content management. This allows you to manage products, categories, deals, and reviews without editing code.

## 1. Prerequisites
- A Sanity account (sign up at [sanity.io](https://www.sanity.io))
- Sanity CLI installed: `npm install -g sanity`

## 2. Configuration
1. Create a new Sanity project in your Sanity dashboard.
2. Get your `projectId` and `dataset` name.
3. Update `.env` in the root of your project:
   ```env
   VITE_SANITY_PROJECT_ID="your_actual_project_id"
   VITE_SANITY_DATASET="production"
   ```
4. Update `sanity.config.ts` and `sanity.cli.ts` in the root with your `projectId`.

## 3. Deployment & Studio
You can run the Sanity Studio locally or deploy it.

### Local Studio
Run the studio to start managing content locally:
```bash
npx sanity dev
```
Visit `http://localhost:3333` to see your admin panel.

### Deploy Studio
Host your admin panel on Sanity's global edge network:
```bash
npx sanity deploy
```

## 4. Schema Overview
The following content types are available:
- **Product**: Manage name, slug, price, gallery images, and detailed specs.
- **Category**: Main groupings like Men, Women, etc.
- **Sub Category**: Nested groupings child of a main category.
- **Deal**: Manage homepage promotional banners.
- **Testimonial**: Manage customer reviews and ratings.

## 5. Development Details
- **Fetch Logic**: All data is fetched via the `useSanityData` hook in `src/hooks/useSanityData.ts`.
- **Queries**: GROQ queries are centralized in `src/lib/sanity.ts`.
- **Fallbacks**: Components still use static data from `src/constants.ts` if Sanity is not connected or returns no data, ensuring the app never breaks.

## 6. Next Steps
Once you've added some content in Sanity, the app will automatically prioritize that content over the static files. Make sure to publish your changes in the Sanity Studio for them to appear live.
