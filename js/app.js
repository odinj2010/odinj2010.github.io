/* ==========================================================================
   MULTI-VIEW SPA ROUTER & DRILLDOWN ENGINE (js/app.js)
   --------------------------------------------------------------------------
   - Zero-reload dedicated page views: Home, Projects, Tutorials, About
   - Dedicated nested category drilldown for Projects:
       #/projects -> Category Cards -> Project Cards
   - Dedicated nested drilldown for Tutorials:
       #/tutorials -> Category Cards -> Subcategories -> Guides -> Reader
   - Full breadcrumb trail & browser back/forward navigation support
   ========================================================================== */

import { projectCategories, tutorialCategories } from './tutorials-data.js';

class App {
  constructor() {
    this.currentView = 'home';
    
    // Project Drilldown State
    this.projectState = {
      categoryId: null,
      searchQuery: ''
    };

    // Tutorial Drilldown State
    this.tutorialState = {
      level: 1, // 1: Categories, 2: Subcategories, 3: Guides List, 4: Reader
      categoryId: null,
      subcategoryId: null,
      guideId: null
    };

    this.initElements();
    this.bindEvents();
    this.handleRouting();
  }

  initElements() {
    // Nav elements
    this.navMenu = document.getElementById('nav-menu');
    this.mobileNavToggle = document.getElementById('mobile-nav-toggle');
    this.navLinks = document.querySelectorAll('.nav-link');

    // Page view containers
    this.views = {
      home: document.getElementById('view-home'),
      projects: document.getElementById('view-projects'),
      tutorials: document.getElementById('view-tutorials'),
      about: document.getElementById('view-about')
    };

    // Projects elements
    this.projectBreadcrumbs = document.getElementById('project-breadcrumbs');
    this.projectViewport = document.getElementById('project-viewport');
    this.projectBackBtn = document.getElementById('project-back-btn');
    this.projectSearchInput = document.getElementById('project-search');

    // Tutorials elements
    this.tutorialBreadcrumbs = document.getElementById('tutorial-breadcrumbs');
    this.tutorialViewport = document.getElementById('tutorial-viewport');
    this.tutorialBackBtn = document.getElementById('tutorial-back-btn');
  }

  bindEvents() {
    // Mobile navigation toggle
    if (this.mobileNavToggle) {
      this.mobileNavToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('open');
      });
    }

    // Hash change routing
    window.addEventListener('hashchange', () => this.handleRouting());

    // Back buttons
    if (this.projectBackBtn) {
      this.projectBackBtn.addEventListener('click', () => {
        window.location.hash = '#/projects';
      });
    }

    if (this.tutorialBackBtn) {
      this.tutorialBackBtn.addEventListener('click', () => this.navigateTutorialBack());
    }

    // Projects Search
    if (this.projectSearchInput) {
      this.projectSearchInput.addEventListener('input', (e) => {
        this.projectState.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProjectsView();
      });
    }

    // Donation Modal Handlers
    this.initDonationModal();
  }

  initDonationModal() {
    const openBtn = document.getElementById('open-donate-modal');
    const closeBtn = document.getElementById('close-donate-modal');
    const backdrop = document.getElementById('donate-modal-backdrop');
    const amountInput = document.getElementById('donate-amount-input');
    const presetBtns = document.querySelectorAll('.donate-preset-btn');
    const submitBtn = document.getElementById('donate-submit-btn');

    if (openBtn && backdrop) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backdrop.classList.add('open');
      });
    }

    if (closeBtn && backdrop) {
      closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    }

    // Preset selection
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (amountInput) amountInput.value = btn.getAttribute('data-val');
      });
    });

    if (amountInput) {
      amountInput.addEventListener('input', () => {
        const val = amountInput.value;
        presetBtns.forEach(b => {
          if (b.getAttribute('data-val') === val) {
            b.classList.add('selected');
          } else {
            b.classList.remove('selected');
          }
        });
      });
    }

    // Submit PayPal donation redirect
    if (submitBtn && amountInput) {
      submitBtn.addEventListener('click', () => {
        const val = parseFloat(amountInput.value) || 5;
        // PayPal.me redirect link format: https://paypal.me/NfgOdin/<amount>USD
        const paypalUrl = `https://www.paypal.com/paypalme/NfgOdin/${val}`;
        window.open(paypalUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  /* ==========================================================================
     HASH ROUTING CONTROLLER
     ========================================================================== */
  handleRouting() {
    // Close mobile menu if open
    if (this.navMenu) this.navMenu.classList.remove('open');

    const hash = window.location.hash || '#/';
    const cleanHash = hash.replace(/^#\/?/, ''); // strip leading #/
    const parts = cleanHash.split('/').filter(Boolean);
    const mainSection = parts[0] || 'home';

    // Highlight active nav item
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').replace(/^#\/?/, '');
      if ((mainSection === 'home' && (href === '' || href === 'home')) || href === mainSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Switch screen views
    if (mainSection === 'projects') {
      this.switchView('projects');
      const categoryId = parts[1] || null;
      this.projectState.categoryId = categoryId;
      this.renderProjectBreadcrumbs();
      this.renderProjectsView();
    } else if (mainSection === 'tutorials') {
      this.switchView('tutorials');
      const catId = parts[1] || null;
      const subId = parts[2] || null;
      const guideId = parts[3] || null;

      if (guideId) {
        this.tutorialState = { level: 4, categoryId: catId, subcategoryId: subId, guideId };
      } else if (subId) {
        this.tutorialState = { level: 3, categoryId: catId, subcategoryId: subId, guideId: null };
      } else if (catId) {
        this.tutorialState = { level: 2, categoryId: catId, subcategoryId: null, guideId: null };
      } else {
        this.tutorialState = { level: 1, categoryId: null, subcategoryId: null, guideId: null };
      }

      this.renderTutorialBreadcrumbs();
      this.renderTutorialView();
    } else if (mainSection === 'about') {
      this.switchView('about');
    } else {
      this.switchView('home');
    }

    // Scroll to top of window on screen change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchView(viewName) {
    this.currentView = viewName;
    Object.keys(this.views).forEach(key => {
      const el = this.views[key];
      if (el) {
        if (key === viewName) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
  }

  /* ==========================================================================
     DEDICATED PROJECTS DRILLDOWN VIEW
     ========================================================================== */
  renderProjectBreadcrumbs() {
    if (!this.projectBreadcrumbs) return;
    const { categoryId } = this.projectState;
    const category = projectCategories.find(c => c.id === categoryId);

    // Toggle Back button
    if (this.projectBackBtn) {
      this.projectBackBtn.style.display = category ? 'inline-flex' : 'none';
    }

    let crumbs = [
      { label: 'Projects', hash: '#/projects', active: !category }
    ];

    if (category) {
      crumbs.push({
        label: category.title,
        hash: `#/projects/${category.id}`,
        active: true
      });
    }

    this.projectBreadcrumbs.innerHTML = crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      const sep = !isLast ? `<span class="breadcrumb-separator">/</span>` : '';
      if (crumb.active) {
        return `<span class="breadcrumb-item active">${crumb.label}</span>${sep}`;
      }
      return `<a href="${crumb.hash}" class="breadcrumb-item">${crumb.label}</a>${sep}`;
    }).join('');
  }

  renderProjectsView() {
    if (!this.projectViewport) return;
    const { categoryId, searchQuery } = this.projectState;

    // LEVEL 1: Top-Level Project Categories
    if (!categoryId) {
      this.projectViewport.innerHTML = `
        <div class="cards-grid">
          ${projectCategories.map(cat => `
            <a href="#/projects/${cat.id}" class="category-card">
              <div class="category-icon">${cat.icon}</div>
              <h3 class="category-title">${cat.title}</h3>
              <p class="category-desc">${cat.description}</p>
              <div class="category-badge-count">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                ${cat.projects.length} Projects &rarr;
              </div>
            </a>
          `).join('')}
        </div>
      `;
      return;
    }

    // LEVEL 2: Projects inside Selected Category
    const category = projectCategories.find(c => c.id === categoryId);
    if (!category) {
      this.projectViewport.innerHTML = `
        <div class="empty-state">
          <h3>Category not found</h3>
          <p>The requested project category does not exist.</p>
          <a href="#/projects" class="btn btn-secondary" style="margin-top: 1rem;">Back to Categories</a>
        </div>
      `;
      return;
    }

    let filtered = category.projects.filter(p => {
      if (!searchQuery) return true;
      return p.title.toLowerCase().includes(searchQuery) ||
             p.description.toLowerCase().includes(searchQuery) ||
             p.tech.some(t => t.toLowerCase().includes(searchQuery));
    });

    if (filtered.length === 0) {
      this.projectViewport.innerHTML = `
        <div class="empty-state">
          <h3>No matching projects found</h3>
          <p>Try searching for a different keyword.</p>
        </div>
      `;
      return;
    }

    this.projectViewport.innerHTML = `
      <div class="cards-grid">
        ${filtered.map(proj => {
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
                    GitHub Repo
                  </a>
                ` : '<span></span>'}
                ${proj.guideUrl ? `
                  <a href="${proj.guideUrl}" class="card-link">
                    View Guide &rarr;
                  </a>
                ` : ''}
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     DEDICATED TUTORIALS DRILLDOWN VIEW
     ========================================================================== */
  navigateTutorialBack() {
    const { level, categoryId, subcategoryId } = this.tutorialState;
    if (level === 4) {
      window.location.hash = `#/tutorials/${categoryId}/${subcategoryId}`;
    } else if (level === 3) {
      window.location.hash = `#/tutorials/${categoryId}`;
    } else if (level === 2) {
      window.location.hash = `#/tutorials`;
    }
  }

  renderTutorialBreadcrumbs() {
    if (!this.tutorialBreadcrumbs) return;
    const { level, categoryId, subcategoryId, guideId } = this.tutorialState;
    const category = tutorialCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    const guide = subcategory?.guides?.find(g => g.id === guideId);

    if (this.tutorialBackBtn) {
      this.tutorialBackBtn.style.display = level > 1 ? 'inline-flex' : 'none';
    }

    let crumbs = [
      { label: 'Tutorials', hash: '#/tutorials', active: level === 1 }
    ];

    if (category && level >= 2) {
      crumbs.push({
        label: category.title,
        hash: `#/tutorials/${category.id}`,
        active: level === 2
      });
    }

    if (subcategory && level >= 3) {
      crumbs.push({
        label: subcategory.title,
        hash: `#/tutorials/${category.id}/${subcategory.id}`,
        active: level === 3
      });
    }

    if (guide && level === 4) {
      crumbs.push({
        label: guide.title,
        hash: `#/tutorials/${category.id}/${subcategory.id}/${guide.id}`,
        active: true
      });
    }

    this.tutorialBreadcrumbs.innerHTML = crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      const sep = !isLast ? `<span class="breadcrumb-separator">/</span>` : '';
      if (crumb.active) {
        return `<span class="breadcrumb-item active">${crumb.label}</span>${sep}`;
      }
      return `<a href="${crumb.hash}" class="breadcrumb-item">${crumb.label}</a>${sep}`;
    }).join('');
  }

  renderTutorialView() {
    if (!this.tutorialViewport) return;
    const { level, categoryId, subcategoryId, guideId } = this.tutorialState;

    if (level === 1) {
      // Level 1: Categories
      this.tutorialViewport.innerHTML = `
        <div class="cards-grid">
          ${tutorialCategories.map(cat => `
            <a href="#/tutorials/${cat.id}" class="category-card">
              <div class="category-icon">${cat.icon}</div>
              <h3 class="category-title">${cat.title}</h3>
              <p class="category-desc">${cat.summary}</p>
              <div class="category-badge-count">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                ${cat.subcategories.length} Sub-categories & Guides &rarr;
              </div>
            </a>
          `).join('')}
        </div>
      `;
    } else if (level === 2) {
      // Level 2: Subcategories
      const category = tutorialCategories.find(c => c.id === categoryId);
      if (!category) return;
      this.tutorialViewport.innerHTML = `
        <div class="cards-grid">
          ${category.subcategories.map(sub => `
            <a href="#/tutorials/${category.id}/${sub.id}" class="category-card">
              <h3 class="category-title">${sub.title}</h3>
              <p class="category-desc">${sub.description}</p>
              <div class="category-badge-count">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                ${sub.guides.length} Technical Guides &rarr;
              </div>
            </a>
          `).join('')}
        </div>
      `;
    } else if (level === 3) {
      // Level 3: Guides List
      const category = tutorialCategories.find(c => c.id === categoryId);
      const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
      if (!subcategory) return;

      this.tutorialViewport.innerHTML = `
        <div class="guides-list">
          ${subcategory.guides.map(guide => `
            <a href="#/tutorials/${category.id}/${subcategory.id}/${guide.id}" class="guide-list-item">
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
            </a>
          `).join('')}
        </div>
      `;
    } else if (level === 4) {
      // Level 4: Full Reader
      this.renderLevel4GuideReader(categoryId, subcategoryId, guideId);
    }
  }

  renderLevel4GuideReader(categoryId, subcategoryId, guideId) {
    const category = tutorialCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    const guide = subcategory?.guides?.find(g => g.id === guideId);

    if (!guide) return;

    let stepsHtml = guide.steps.map(step => {
      let calloutHtml = '';
      if (step.callout) {
        calloutHtml = `
          <div class="callout callout-${step.callout.type}">
            <div class="callout-title">${step.callout.title}</div>
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
              <span>${step.codeBlock.filename || 'Snippet'}</span>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span class="code-language-tag">${step.codeBlock.language}</span>
                <button class="copy-code-btn" data-code="${encodeURIComponent(step.codeBlock.code)}">
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
          <div class="reader-meta-bar" style="margin-bottom: 0.75rem; color: var(--text-muted); font-size: 0.85rem;">
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
    const copyButtons = this.tutorialViewport.querySelectorAll('.copy-code-btn');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const rawCode = decodeURIComponent(btn.getAttribute('data-code'));
        try {
          await navigator.clipboard.writeText(rawCode);
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        } catch (err) {
          console.error(err);
        }
      });
    });
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

// Start application
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
