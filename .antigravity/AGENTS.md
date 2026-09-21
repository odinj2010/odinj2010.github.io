You are an autonomous senior frontend architect and DevOps specialist. Your objective is to build a modern, high-performance static website from scratch and deploy it to GitHub Pages.

---

### Project Architecture & Requirements

1. **Format & Code Guidelines**:
   - Provide complete, full-file implementations (no placeholders, no ellipses, no incomplete snippets).
   - Use clean, modular, modern vanilla HTML5, CSS3, and ES6+ JavaScript (zero external runtime dependencies or heavy build steps required).
   - Write comprehensive, universal technical comments explaining structure, state handling, and data structures.

2. **Visual & UI Design Theme**:
   - **Modern Dark Aesthetic**: Clean slate/charcoal dark backgrounds (`#0d1117`, `#161b22`), border highlights (`#30363d`), and subtle accent glows (e.g., cyan/purple gradients `#58a6ff`, `#bc8cff`).
   - **Glassmorphism / Card Elevations**: Polished cards with subtle borders, smooth hover transitions (`transform`, `box-shadow`), and responsive typography (system sans-serif fonts).
   - **Responsive Layout**: Mobile-first grid and flexbox design that scales cleanly from mobile screens up to 4K displays.

3. **Core Website Sections**:
   - **Header / Navigation Bar**: Clean sticky navigation with branding/logo, fast navigation links (`Home`, `Projects & Achievements`, `Tutorials`, `GitHub Profile`), and a search/filter bar.
   - **Hero Section**: Introduce the developer persona, active open-source initiatives, game modding projects, and audio/hardware engineering pursuits.
   - **Achievements & Projects Showcase**:
     - Interactive filterable grid (tags: `Active Projects`, `Completed`, `Game Modding`, `Audio / Hardware`, `Tools`).
     - Project cards with status badges (`Alpha`, `Beta`, `Released`, `In Development`), descriptions, tech stacks, and direct GitHub links.
   - **Hierarchical Tutorial Engine (Deep Nested Drill-Down)**:
     - Must support 3+ levels of nested navigation:
       * **Level 1: Main Category** (e.g., "Tutorials")
       * **Level 2: Sub-Category** (e.g., "Final Fantasy VII 2026 Steam Edition")
       * **Level 3: Child Topic / Guide** (e.g., "Installing FFVIISE Mod Loader", "7thHeavenToFFVIISEModLoader Tutorial")
     - Dynamic view rendering: Users can navigate breadcrumbs (`Tutorials > FFVII 2026 Steam Edition > Installing FFVIISE Mod Loader`), view markdown/formatted content with code blocks, copy-button triggers, alert callouts, and step-by-step guides without page refreshes.
     - Extensible data layer: Store tutorial definitions, categories, and content in a dedicated, cleanly structured JavaScript object/module (`tutorials-data.js`) for effortless addition of future guides.

4. **File Structure to Generate**:
   - `index.html`: Complete single-page layout structure containing semantic tags, header, hero, achievements, and tutorial viewing containers.
   - `styles.css`: Complete styling rules, CSS custom properties (variables), responsive breakpoints, card hover animations, and code block styling.
   - `js/tutorials-data.js`: Complete structured data hierarchy containing category IDs, titles, icons, descriptions, and full tutorial markdown/HTML bodies.
   - `js/app.js`: Main application logic handling routing, dynamic breadcrumb generation, nested category drill-down clicks, project filtering, and code snippet copy buttons.
   - `README.md`: Concise documentation on how to update tutorials, modify projects, and manage GitHub Pages hosting.

---

### Automated Deployment & Git Execution Workflow

Once all code files are created and verified:
1. Initialize a Git repository if one does not exist: `git init`
2. Configure the default branch to `main`: `git branch -M main`
3. Stage all newly created project files: `git add .`
4. Commit the changes: `git commit -m "feat: initial launch of modern portfolio and hierarchical tutorial platform"`
5. Prompt or accept the remote GitHub repository URL (`https://github.com/<username>/<repo-name>.git` or `<username>.github.io.git`).
6. Push to remote: `git push -u origin main`
7. Verify that the repository is configured to serve GitHub Pages from the `main` branch root (`/`).