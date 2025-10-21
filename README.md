# Personal Blog — Mica Avigliano

Personal blog ⚒️ — built with React, Vite, TypeScript, Tailwind CSS and TanStack libraries. I'm a frontend developer and accessibility engineer: this site showcases my services and posts about accessible web development.

Live demo
- Repository: https://github.com/micaavigliano/personal-blog
- https://micaavigliano.com/

Why this repo
- It's my public portfolio and technical blog focused on accessible frontend development.
- You can find my services (consulting, audits, training) and posts explaining accessible patterns, techniques and tool workflows.
- The project is built with a modern frontend stack and prioritizes inclusive design and accessibility best practices.

Tech stack
- Framework: React
- Build tool: Vite
- Language: TypeScript (+ small JavaScript interop where needed)
- Styling: Tailwind CSS
- State/data & routing: TanStack libraries (Query / Router, where applicable)
- Accessibility-first: semantic HTML, ARIA where appropriate, keyboard-first interactions, and tests with accessibility tooling

Key features
- Accessible, responsive UI components and layouts
- Blog system for technical posts about accessible development
- Pages for services and contact/consulting information
- Performance-focused build with Vite + TypeScript
- Modern data handling and routing with TanStack libraries
- High-contrast and reduced-motion considerations

Accessibility statement
This project is built with accessibility as a first-class concern:
- Semantic HTML and logical document order
- Keyboard navigable components and skip links
- Focus management and visible focus styles
- Color contrast tuned for readability
- Progressive enhancement principles
- Automated and manual accessibility testing (Lighthouse, axe, screen reader checks)

If you find an accessibility issue, please open an issue or contact me directly — I prioritize fixing accessibility regressions.

Requirements (local)
- Node.js 18+ recommended (or Node 16+ in most cases)
- npm, yarn or pnpm (commands below use npm as example)

Getting started (run locally)
1. Clone the repo
   git clone https://github.com/micaavigliano/personal-blog.git
   cd personal-blog

2. Install dependencies
   npm install

3. Run the dev server
   npm run dev
   open http://localhost:5173 (or the URL shown in your terminal)

4. Build for production
   npm run build

5. Preview production build locally
   npm run preview
   # this runs a local static server to preview the built app

Common scripts (typical for Vite + TypeScript projects)
- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview the production build locally
- npm run lint — run linter (ESLint)
- npm run type-check — run TypeScript type checking
- npm run test — run tests (if present)

Notes about environment
- If the project uses environment variables, they live in .env files (e.g., .env.local). Do not commit secrets.
- Add any project-specific env variables or API keys here if needed.

Development tips & accessibility testing
- Run Lighthouse in Chrome DevTools for a quick audit
- Use axe (browser extension or jest-axe in tests) for automated accessibility checks
- Test with VoiceOver (macOS), NVDA/JAWS (Windows) and keyboard-only navigation
- Use semantic HTML and avoid role misuse; prefer native inputs and controls

Contributing
- Found a bug, accessibility issue, or have suggestions? Open an issue or a PR.
- Please include:
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser / OS / assistive technology details if relevant
- For code changes:
  - Fork the repo and create a topic branch
  - Open a PR with a clear description and testing notes

License
- Add your chosen license here (e.g., MIT). If you want me to include one, tell me which license you prefer.

Contact
- GitHub: https://github.com/micaavigliano
- Email: micaela.avigliano@gmail.com
- I offer accessibility audits, frontend consulting, and training — check the Services page on the site for details.

Acknowledgements
- Built with Vite, React, Tailwind CSS and TanStack libraries
- Accessibility tooling and community projects that make inclusive web development possible

Thanks for visiting — my goal with this blog is to share practical, usable guidance for building accessible frontends. If you want help implementing accessibility in your projects, reach out!
