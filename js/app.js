/* ==========================================================================
   PORTFOLIO & TUTORIAL ENGINE APPLICATION LOGIC (js/app.js)
   --------------------------------------------------------------------------
   - Hash-based SPA router supporting direct links to tutorials
   - Interactive Project Filtering with search integration
   - 3+ Level Hierarchical Tutorial Drill-Down Engine
   - Dynamic breadcrumb generation
   - Clipboard copy utilities for code blocks
   ========================================================================== */

import { projectsData, projectFilterTags, tutorialCategories } from './tutorials-data.js';

class App {
  constructor() {
    this.currentFilter = 'All';
    this.searchQuery = '';
    
    // Tutorial Engine State:
    // level: 1 (Main Categories) | 2 (Sub-categories) | 3 (Guides list) | 4 (Full Guide Reader)
    this.tutorialState = {
      level: 1,
      categoryId: null,
      subcategoryId: null,
      guideId: null
    };

    this.initElements();
    this.bindEvents();
    this.renderProjects();
    this.handleRouting();
  }

  initElements() {
    // Nav & Search
    this.navMenu = document.getElementById('nav-menu');
    this.mobileNavToggle = document.getElementById('mobile-nav-toggle');
    this.globalSearch = document.getElementById('global-search');
    
    // Projects Container & Filters
    this.filterContainer = document.getElementById('project-filter-tags');
    this.projectsGrid = document.getElementById('projects-grid');
    
    // Tutorial Engine Elements
    this.tutorialViewport = document.getElementById('tutorial-viewport');
    this.breadcrumbsContainer = document.getElementById('tutorial-breadcrumbs');
    this.navBackBtn = document.getElementById('tutorial-back-btn');
  }

  bindEvents() {
    // Mobile navigation toggle
    if (this.mobileNavToggle) {
      this.mobileNavToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('open');
      });
    }

    // Global Search filter across projects & tutorials
    if (this.globalSearch) {
      this.globalSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProjects();
      });
    }

    // Hash change routing
    window.addEventListener('hashchange', () => this.handleRouting());

    // Tutorial Back Button
    if (this.navBackBtn) {
      this.navBackBtn.addEventListener('click', () => this.navigateTutorialBack());
    }

    // Render Project Filter Buttons
    this.renderFilterTags();
  }

  /* ==========================================================================
     PROJECTS & ACHIEVEMENTS LOGIC
     ========================================================================== */
  renderFilterTags() {
    if (!this.filterContainer) return;
    this.filterContainer.innerHTML = projectFilterTags.map(tag => `
      <button class="filter-btn ${tag === this.currentFilter ? 'active' : ''}" data-filter="${tag}">
        ${tag}
      </button>
    `).join('');

    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.getAttribute('data-filter');
        this.filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderProjects();
      });
    });
  }

  renderProjects() {
    if (!this.projectsGrid) return;

    let filtered = projectsData.filter(proj => {
      const matchesFilter = (this.currentFilter === 'All') || (proj.category === this.currentFilter);
      const matchesSearch = !this.searchQuery || 
        proj.title.toLowerCase().includes(this.searchQuery) ||
        proj.description.toLowerCase().includes(this.searchQuery) ||
        proj.tech.some(t => t.toLowerCase().includes(this.searchQuery));
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      this.projectsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3>No matching projects found</h3>
          <p>Try searching for another keyword or clearing active filters.</p>
        </div>
      `;
      return;
    }

    this.projectsGrid.innerHTML = filtered.map(proj => {
      const statusClass = `status-${proj.status.toLowerCase().replace(/\s+/g, '-')}`;
      return `
        <article class="project-card">
          <div class="card-top">
            <h3 class="card-title">${proj.title}</h3>
            <span class="status-badge ${statusClass}">${proj.status}</span>
          </div>
          <p class="card-desc">${proj.description}</p>
          <div class="tech-tag-list">
            ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="card-footer">
            ${proj.githubUrl ? `
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                Source Repository
              </a>
            ` : '<span></span>'}
            ${proj.liveUrl ? `
              <a href="${proj.liveUrl}" class="card-link">
                View Documentation &rarr;
              </a>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     HASH ROUTING & STATE CONTROLLER
     ========================================================================== */
  handleRouting() {
    const hash = window.location.hash.slice(1); // remove '#'
    
    // Tutorial Route Pattern: tutorials/{categoryId}/{subcategoryId}/{guideId}
    if (hash.startsWith('tutorials')) {
      const parts = hash.split('/').filter(Boolean);
      // parts[0] is 'tutorials'
      const categoryId = parts[1] || null;
      const subcategoryId = parts[2] || null;
      const guideId = parts[3] || null;

      if (guideId) {
        this.setTutorialState(4, categoryId, subcategoryId, guideId);
      } else if (subcategoryId) {
        this.setTutorialState(3, categoryId, subcategoryId, null);
      } else if (categoryId) {
        this.setTutorialState(2, categoryId, null, null);
      } else {
        this.setTutorialState(1, null, null, null);
      }

      // Scroll to tutorial engine container if navigating via link
      const engineEl = document.getElementById('tutorials');
      if (engineEl && parts.length > 1) {
        engineEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Default to root Level 1 tutorial state
      this.setTutorialState(1, null, null, null);
    }
  }

  setTutorialState(level, categoryId, subcategoryId, guideId) {
    this.tutorialState = { level, categoryId, subcategoryId, guideId };
    this.renderBreadcrumbs();
    this.renderTutorialView();
  }

  navigateTutorialBack() {
    const { level, categoryId, subcategoryId } = this.tutorialState;
    if (level === 4) {
      window.location.hash = `#tutorials/${categoryId}/${subcategoryId}`;
    } else if (level === 3) {
      window.location.hash = `#tutorials/${categoryId}`;
    } else if (level === 2) {
      window.location.hash = `#tutorials`;
    }
  }

  /* ==========================================================================
     HIERARCHICAL TUTORIAL ENGINE VIEW RENDERING
     ========================================================================== */
  renderBreadcrumbs() {
    if (!this.breadcrumbsContainer) return;
    const { level, categoryId, subcategoryId, guideId } = this.tutorialState;
    const category = tutorialCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    const guide = subcategory?.guides?.find(g => g.id === guideId);

    // Toggle Back button visibility
    if (this.navBackBtn) {
      this.navBackBtn.style.display = level > 1 ? 'inline-flex' : 'none';
    }

    let crumbs = [
      { label: 'Tutorials', hash: '#tutorials', active: level === 1 }
    ];

    if (category && level >= 2) {
      crumbs.push({
        label: category.title,
        hash: `#tutorials/${category.id}`,
        active: level === 2
      });
    }

    if (subcategory && level >= 3) {
      crumbs.push({
        label: subcategory.title,
        hash: `#tutorials/${category.id}/${subcategory.id}`,
        active: level === 3
      });
    }

    if (guide && level === 4) {
      crumbs.push({
        label: guide.title,
        hash: `#tutorials/${category.id}/${subcategory.id}/${guide.id}`,
        active: true
      });
    }

    this.breadcrumbsContainer.innerHTML = crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      const separator = !isLast ? `<span class="breadcrumb-separator">/</span>` : '';
      if (crumb.active) {
        return `<span class="breadcrumb-item active">${crumb.label}</span>${separator}`;
      }
      return `<a href="${crumb.hash}" class="breadcrumb-item">${crumb.label}</a>${separator}`;
    }).join('');
  }

  renderTutorialView() {
    if (!this.tutorialViewport) return;
    const { level, categoryId, subcategoryId, guideId } = this.tutorialState;

    if (level === 1) {
      this.renderLevel1Categories();
    } else if (level === 2) {
      this.renderLevel2Subcategories(categoryId);
    } else if (level === 3) {
      this.renderLevel3GuidesList(categoryId, subcategoryId);
    } else if (level === 4) {
      this.renderLevel4GuideReader(categoryId, subcategoryId, guideId);
    }
  }

  /**
   * LEVEL 1: Main Category Cards
   */
  renderLevel1Categories() {
    this.tutorialViewport.innerHTML = `
      <div class="categories-grid">
        ${tutorialCategories.map(cat => `
          <div class="category-card" onclick="location.hash='#tutorials/${cat.id}'">
            <div class="category-icon">${cat.icon}</div>
            <h3 class="category-title">${cat.title}</h3>
            <p class="category-desc">${cat.summary}</p>
            <div class="category-badge-count">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              ${cat.subcategories.length} Sub-categories & Guides &rarr;
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * LEVEL 2: Sub-Categories within Selected Category
   */
  renderLevel2Subcategories(categoryId) {
    const category = tutorialCategories.find(c => c.id === categoryId);
    if (!category) {
      this.renderNotFound("Category not found");
      return;
    }

    this.tutorialViewport.innerHTML = `
      <div class="subcategories-grid">
        ${category.subcategories.map(sub => `
          <div class="category-card" onclick="location.hash='#tutorials/${category.id}/${sub.id}'">
            <h3 class="category-title">${sub.title}</h3>
            <p class="category-desc">${sub.description}</p>
            <div class="category-badge-count">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${sub.guides.length} Technical Guides &rarr;
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * LEVEL 3: Guides List within Sub-Category
   */
  renderLevel3GuidesList(categoryId, subcategoryId) {
    const category = tutorialCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    
    if (!subcategory) {
      this.renderNotFound("Sub-category not found");
      return;
    }

    this.tutorialViewport.innerHTML = `
      <div class="guides-list">
        ${subcategory.guides.map(guide => `
          <div class="guide-list-item" onclick="location.hash='#tutorials/${category.id}/${subcategory.id}/${guide.id}'">
            <div class="guide-info">
              <h4 class="guide-item-title">${guide.title}</h4>
              <p class="category-desc" style="margin: 0;">${guide.summary}</p>
              <div class="guide-item-meta">
                <span class="difficulty-badge">${guide.difficulty}</span>
                <span>•</span>
                <span>${guide.readingTime}</span>
              </div>
            </div>
            <span class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
              Read Guide &rarr;
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * LEVEL 4: Full Step-by-Step Tutorial Reader
   */
  renderLevel4GuideReader(categoryId, subcategoryId, guideId) {
    const category = tutorialCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    const guide = subcategory?.guides?.find(g => g.id === guideId);

    if (!guide) {
      this.renderNotFound("Tutorial guide not found");
      return;
    }

    let stepsHtml = guide.steps.map(step => {
      let calloutHtml = '';
      if (step.callout) {
        calloutHtml = `
          <div class="callout callout-${step.callout.type}">
            <div class="callout-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              ${step.callout.title}
            </div>
            <div class="callout-content">${step.callout.content}</div>
          </div>
        `;
      }

      let codeHtml = '';
      if (step.codeBlock) {
        const escapedCode = this.escapeHtml(step.codeBlock.code);
        codeHtml = `
          <div class="code-block-container">
            <div class="code-block-header">
              <span>${step.codeBlock.filename || 'Code Snippet'}</span>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span class="code-language-tag">${step.codeBlock.language}</span>
                <button class="copy-code-btn" data-code="${encodeURIComponent(step.codeBlock.code)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  Copy
                </button>
              </div>
            </div>
            <pre><code>${escapedCode}</code></pre>
          </div>
        `;
      }

      return `
        <section class="step-card">
          <h3 class="step-title">${step.title}</h3>
          <p class="step-description">${step.description}</p>
          ${codeHtml}
          ${calloutHtml}
        </section>
      `;
    }).join('');

    this.tutorialViewport.innerHTML = `
      <article class="tutorial-reader">
        <header class="reader-header">
          <div class="reader-meta-bar">
            <span class="difficulty-badge">${guide.difficulty}</span>
            <span>•</span>
            <span>${guide.readingTime}</span>
          </div>
          <h2 class="reader-title">${guide.title}</h2>
          <p class="reader-summary">${guide.summary}</p>
        </header>

        <div class="tutorial-steps-flow">
          ${stepsHtml}
        </div>
      </article>
    `;

    // Attach copy button handlers
    this.attachCopyHandlers();
  }

  attachCopyHandlers() {
    const copyButtons = this.tutorialViewport.querySelectorAll('.copy-code-btn');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const rawCode = decodeURIComponent(btn.getAttribute('data-code'));
        try {
          await navigator.clipboard.writeText(rawCode);
          const originalText = btn.innerHTML;
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Copied!
          `;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code to clipboard: ", err);
        }
      });
    });
  }

  renderNotFound(message) {
    this.tutorialViewport.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h3>${message}</h3>
        <p>The requested guide or category could not be resolved in the data registry.</p>
        <button class="btn btn-secondary" onclick="location.hash='#tutorials'" style="margin-top: 1rem;">
          Return to All Tutorials
        </button>
      </div>
    `;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
