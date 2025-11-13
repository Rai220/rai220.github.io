# Konstantin Krestnikov - Personal Landing Page

A modern landing page built with React, TypeScript, Vite, and Tailwind CSS.

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

## Deployment

This site is hosted on **GitHub Pages** and automatically deployed when changes are pushed to the `master` branch.

### Manual Deployment Steps

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **The `dist/` folder will be generated** with all production files

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin master
   ```

4. **GitHub Pages will automatically deploy** the changes

### Automated Deployment

The repository is configured with GitHub Pages to serve from the `master` branch. Any commit pushed to `master` will trigger an automatic deployment.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking

## Tech Stack

- **React** 19 - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## License

ISC © Konstantin Krestnikov

## Development Notes

This repository has been verified for automated workflows and CI/CD integration.
