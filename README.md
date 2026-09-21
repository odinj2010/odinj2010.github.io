# OdinJ.dev // Flagship Ecosystem & Tutorial Hub

Modern, high-performance static website and hierarchical knowledge base built with vanilla HTML5, CSS3, and modern ES6+ JavaScript. Designed for zero-dependency hosting on GitHub Pages at [https://odinj2010.github.io](https://odinj2010.github.io).

---

## 🌟 Key Features

1. **Modern Dark Aesthetic**:
   - Palette: `#0d1117`, `#161b22`, border `#30363d`, with subtle cyan/purple ambient glows (`#58a6ff`, `#bc8cff`).
   - Glassmorphic card elevations with smooth hover transitions and clean typography.
   - Fully responsive design scaling across mobile devices up to 4K displays.

2. **Projects & Achievements Showcase**:
   - Interactive live category filtering (`Active Projects`, `Completed`, `Game Modding`, `Audio / Hardware`, `Tools`).
   - Real-time search query filtering across titles, descriptions, and tech stacks.
   - Status badges (`Released`, `Beta`, `Alpha`, `In Development`) with direct links to repositories and tutorials.

3. **Hierarchical Tutorial Engine (Deep Nested Drill-Down)**:
   - **Level 1 (Main Category)**: Game Modding, Audio & Hardware Engineering, Developer Tools.
   - **Level 2 (Sub-Category)**: e.g. Final Fantasy VII 2026 Steam Edition, Real-Time Audio DSP, etc.
   - **Level 3 (Guides List)**: Browse guides with metadata (reading time, difficulty ratings).
   - **Level 4 (Full Guide Reader)**: Dynamic step-by-step rendering with copyable code snippets, syntax containers, and alert callouts (`[!NOTE]`, `[!TIP]`, `[!WARNING]`).
   - **Dynamic Breadcrumb Navigation**: Seamless deep linking with URL hash routes (e.g., `#tutorials/game-modding/ffvii-steam/installing-mod-loader`).

---

## 📁 Project File Structure

```text
.
├── index.html              # Core single-page semantic layout
├── styles.css              # Dark aesthetic, glassmorphism, responsive CSS
├── js/
│   ├── tutorials-data.js   # Extensible data hierarchy for projects & tutorials
│   └── app.js              # Routing, breadcrumbs, search, and copy triggers
├── README.md               # Architecture documentation
└── .antigravity/
    └── AGENTS.md           # Engineering specifications
```

---

## 🚀 Adding New Projects or Tutorials

All project and tutorial data is centralized in `js/tutorials-data.js`.

### Adding a Project:
Add an entry to `projectsData`:
```javascript
{
  id: "my-new-project",
  title: "Project Name",
  category: "Game Modding", // Must match one of projectFilterTags
  status: "Released",        // Alpha | Beta | Released | In Development
  description: "Brief overview of what this project does.",
  tech: ["C++20", "DirectX"],
  githubUrl: "https://github.com/odinj2010/my-new-project"
}
```

### Adding a Tutorial:
In `tutorialCategories`, locate or create a main category and subcategory, then append to `guides`:
```javascript
{
  id: "my-custom-guide",
  title: "Guide Title",
  readingTime: "5 min read",
  difficulty: "Intermediate",
  summary: "Summary of the tutorial.",
  steps: [
    {
      title: "1. Getting Started",
      description: "Step details with <code>inline code</code>.",
      codeBlock: {
        language: "bash",
        filename: "script.sh",
        code: "echo 'Hello World'"
      },
      callout: {
        type: "tip", // note | tip | warning
        title: "Helpful Hint",
        content: "Callout explanation."
      }
    }
  ]
}
```

---

## 🌐 Deploying to GitHub Pages

1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: updates to website content"
   git push origin main
   ```
2. In GitHub, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Save. GitHub Pages will build and serve your site at `https://odinj2010.github.io`.
