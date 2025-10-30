# Aiman Uddin - Personal Portfolio Website

A modern single-page website built with Next.js and Three.js, featuring beautiful 3D animations and interactive backgrounds.

## Features

- 🌟 **3D Animated Background** - Built with Three.js
- 🎨 **Modern Design** - Tailwind CSS and Framer Motion
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Next.js optimizations
- 🌈 **Smooth Animations** - Beautiful transitions and effects

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: React Icons

## Installation

First, install the dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   ├── ThreeBackground.tsx     # Main 3D scene with interactive planets
│   ├── HeroOverlay.tsx         # Hero text + buttons floating above 3D
│   ├── CustomCursor.tsx        # Modular custom cursor component
│   ├── CustomCursorDemo.tsx    # Interactive demo for cursor configurations
│   ├── ui/
│   │   ├── SkewedButton.tsx    # Reusable skewed button component
│   │   └── ButtonDemo.tsx      # Button component demo
│   └── sections/
│       ├── AboutSection.tsx    # About me modal section
│       ├── SkillsSection.tsx   # Skills & technologies modal
│       ├── ProjectsSection.tsx # Projects showcase modal
│       └── ContactSection.tsx  # Contact form modal
├── globals.css                 # Global styles
├── layout.tsx                 # Root layout with CustomCursor
└── page.tsx                   # Main page with state management

```

## Features

### Interactive 3D Universe
- **Planet Navigation**: Click on colored planets to explore different sections
- **Custom Cursor**: Modular cursor component with customizable colors, sizes, and effects
- **Smooth Camera Movement**: Dynamic camera animations when selecting planets
- **Hover Effects**: Planets scale and respond to mouse interaction
- **Background Stars**: Animated star field for immersive space experience

### Hero Overlay
- **Floating Interface**: Text and buttons hover above the 3D scene
- **Animated Entries**: Smooth entrance animations using Framer Motion
- **Navigation Hints**: Visual guides showing which planet leads to which section
- **Social Links**: Direct links to GitHub, LinkedIn, Twitter, and Email

### Modal Sections
- **About Section**: Personal journey, skills overview, and statistics
- **Skills Section**: Detailed technology breakdown with progress bars
- **Projects Section**: Portfolio showcase with live demos and GitHub links
- **Contact Section**: Interactive contact form with validation

### Interactive Features
- **Planet Selection**: Blue → About, Green → Skills, Orange → Projects, Purple → Contact
- **Custom Cursor**: Fully customizable cursor with colors, sizes, glow effects, and styles
- **Enhanced Glow Effects**: Text and buttons have modern neon lighting
- **Keyboard Navigation**: ESC to close modals, smooth transitions
- **Responsive Design**: Works perfectly on all device sizes
- **Smooth Animations**: All interactions are butter-smooth with optimized performance

## Customization

### Modify 3D Universe
In `app/components/ThreeBackground.tsx`:
- **Planet Colors & Positions**: Edit the `planets` array to change colors and locations
- **Camera Behavior**: Adjust camera movement and focusing animations
- **Star Field**: Modify star count, size, and animation speed
- **Hover Effects**: Customize planet scaling and interaction responses

### Update Hero Content
In `app/components/HeroOverlay.tsx`:
- **Personal Information**: Name, title, description text
- **Social Links**: Update href URLs for GitHub, LinkedIn, Twitter, Email
- **Navigation Hints**: Modify planet-to-section mappings
- **Animation Timings**: Adjust Framer Motion delay and duration values

### Customize Sections
In `app/components/sections/`:
- **AboutSection.tsx**: Personal journey, statistics, and what you do
- **SkillsSection.tsx**: Technology categories, progress bars, skill levels
- **ProjectsSection.tsx**: Project details, links, technologies used
- **ContactSection.tsx**: Contact information, social links, form fields

### Styling & Theme
- **Global Styles**: `app/globals.css` for overall theme and animations
- **Button Styles**: `app/components/ui/SkewedButton.tsx` for button variants
- **Modal Styling**: Each section component has its own styling classes

## Deployment

### Deploy on Vercel
```bash
npm run build
```

Easy deployment using the Vercel Platform.

### Other Platforms
After building, deploy the `out` folder or `.next` folder.

## Support

If you encounter any issues, please create an issue or contact me.

---

Made with ❤️ by Aiman Uddin
# threejs-portfolio
