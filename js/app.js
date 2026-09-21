/* ==========================================================================
   MULTI-VIEW SPA ROUTER & SIDEBAR EXPLORER ENGINE (js/app.js)
   --------------------------------------------------------------------------
   - Zero-reload dedicated page views: Home, Projects, Tutorials, About
   - Interactive Left Sidebar with category / subcategory tree
   - Interactive Game Filter Pills: "All Games", "Final Fantasy VII", "Final Fantasy X", "Minecraft", etc.
   - Live search within sidebar and category view
   ========================================================================== */

import { projectTree, tutorialTree } from './tutorials-data.js';

class App {
  constructor() {
    this.currentView = 'home';
    
    // Project Explorer State
    this.projectState = {
      categoryId: null,      // e.g. "modding", "software", "ai" (null = All)
      subcategoryId: null,   // e.g. "loaders", "mods", "tools" (null = All in Category)
      activeGame: 'All',     // "All" or game filter
      searchQuery: ''
    };

    // Tutorial Explorer State
    this.tutorialState = {
      categoryId: null,
      subcategoryId: null,
      guideId: null,
      activePlatform: 'All', // 'All' or platform filter
      searchQuery: ''
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
    this.projectSidebar = document.getElementById('project-sidebar');
    this.projectViewport = document.getElementById('project-viewport');
    this.projectSearchInput = document.getElementById('project-search');

    // Tutorials elements
    this.tutorialBreadcrumbs = document.getElementById('tutorial-breadcrumbs');
    this.tutorialSidebar = document.getElementById('tutorial-sidebar');
    this.tutorialViewport = document.getElementById('tutorial-viewport');
    this.tutorialSearchInput = document.getElementById('tutorial-search');
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

    // Projects Search
    if (this.projectSearchInput) {
      this.projectSearchInput.addEventListener('input', (e) => {
        this.projectState.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProjectsContent();
      });
    }

    // Tutorials Search
    if (this.tutorialSearchInput) {
      this.tutorialSearchInput.addEventListener('input', (e) => {
        this.tutorialState.searchQuery = e.target.value.toLowerCase().trim();
        this.renderTutorialContent();
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
        const paypalUrl = `https://www.paypal.com/paypalme/NFG/${val}`;
        window.open(paypalUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  /* ==========================================================================
     HASH ROUTING CONTROLLER
     ========================================================================== */
  handleRouting() {
    if (this.navMenu) this.navMenu.classList.remove('open');

    const hash = window.location.hash || '#/';
    const cleanHash = hash.replace(/^#\/?/, '');
    const parts = cleanHash.split('/').filter(Boolean);
    const mainSection = parts[0] || 'home';

    // Highlight active nav link
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').replace(/^#\/?/, '');
      if ((mainSection === 'home' && (href === '' || href === 'home')) || href === mainSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (mainSection === 'projects') {
      this.switchView('projects');
      const catId = parts[1] || null;
      const subId = parts[2] || null;
      this.projectState.categoryId = catId;
      this.projectState.subcategoryId = subId;
      this.renderProjectBreadcrumbs();
      this.renderProjectSidebar();
      this.renderProjectsContent();
    } else if (mainSection === 'tutorials') {
      this.switchView('tutorials');
      const catId = parts[1] || null;
      const subId = parts[2] || null;
      const guideId = parts[3] || null;
      this.tutorialState.categoryId = catId;
      this.tutorialState.subcategoryId = subId;
      this.tutorialState.guideId = guideId;
      this.renderTutorialBreadcrumbs();
      this.renderTutorialSidebar();
      this.renderTutorialContent();
    } else if (mainSection === 'about') {
      this.switchView('about');
    } else {
      this.switchView('home');
    }

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
     PROJECTS EXPLORER (SIDEBAR + PLATFORM FILTERS + CONTENT)
     ========================================================================== */
  renderProjectBreadcrumbs() {
    if (!this.projectBreadcrumbs) return;
    const { categoryId, subcategoryId } = this.projectState;
    const category = projectTree.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);

    let crumbs = [
      { label: 'Projects', hash: '#/projects', active: !category }
    ];

    if (category) {
      crumbs.push({
        label: category.title,
        hash: `#/projects/${category.id}`,
        active: !subcategory
      });
    }

    if (subcategory) {
      crumbs.push({
        label: subcategory.title,
        hash: `#/projects/${category.id}/${subcategory.id}`,
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

  // Helper to gather all projects under the currently active category/subcategory
  getCurrentScopeProjects() {
    const { categoryId, subcategoryId } = this.projectState;
    let projects = [];

    if (categoryId) {
      const category = projectTree.find(c => c.id === categoryId);
      if (category) {
        if (subcategoryId) {
          const sub = category.subcategories.find(s => s.id === subcategoryId);
          if (sub) {
            projects = sub.projects;
          }
        } else {
          category.subcategories.forEach(sub => projects.push(...sub.projects));
        }
      }
    } else {
      projectTree.forEach(cat => {
        cat.subcategories.forEach(sub => projects.push(...sub.projects));
      });
    }
    return projects;
  }

  renderProjectSidebar() {
    if (!this.projectSidebar) return;
    const { categoryId, subcategoryId, activeGame } = this.projectState;

    // Gather available platforms/games within the current category scope
    const currentProjects = this.getCurrentScopeProjects();
    const platformsSet = new Set();
    currentProjects.forEach(p => {
      const plat = p.platform || p.game;
      if (plat) platformsSet.add(plat);
    });
    const availablePlatforms = ['All', ...Array.from(platformsSet)];

    // If activeGame is set to something that isn't available in this scope, reset to 'All'
    if (activeGame !== 'All' && !platformsSet.has(activeGame)) {
      this.projectState.activeGame = 'All';
    }

    const platformPillsHtml = availablePlatforms.length > 2 ? `
      <div class="sidebar-heading" style="margin-top: 0.85rem;">Platform / Game</div>
      <div class="sidebar-platform-group">
        ${availablePlatforms.map(plat => `
          <button type="button" class="sidebar-platform-btn ${plat === this.projectState.activeGame ? 'active' : ''}" data-platform="${plat}">
            <span>${plat === 'All' ? 'All Platforms' : plat}</span>
          </button>
        `).join('')}
      </div>
    ` : '';

    this.projectSidebar.innerHTML = `
      <div class="sidebar-heading">Navigation</div>
      <div class="sidebar-nav-group">
        <a href="#/projects" class="sidebar-cat-btn ${!categoryId ? 'active' : ''}">
          <span class="sidebar-cat-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            All Projects
          </span>
        </a>
      </div>

      ${platformPillsHtml}

      <div class="sidebar-heading" style="margin-top: 0.85rem;">Categories</div>
      <div class="sidebar-nav-group">
        ${projectTree.map(cat => {
          const isCurrentCat = categoryId === cat.id;
          return `
            <div>
              <a href="#/projects/${cat.id}" class="sidebar-cat-btn ${isCurrentCat && !subcategoryId ? 'active' : ''} ${isCurrentCat ? 'expanded' : ''}">
                <span class="sidebar-cat-content">
                  ${cat.icon}
                  ${cat.title}
                </span>
                <svg class="sidebar-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <div class="sidebar-sub-list ${isCurrentCat ? 'open' : ''}">
                ${cat.subcategories.map(sub => {
                  const isCurrentSub = isCurrentCat && subcategoryId === sub.id;
                  return `
                    <a href="#/projects/${cat.id}/${sub.id}" class="sidebar-sub-link ${isCurrentSub ? 'active' : ''}">
                      <span>${sub.title}</span>
                      <span class="category-badge-count">${sub.projects.length}</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach click listeners to sidebar platform buttons
    this.projectSidebar.querySelectorAll('.sidebar-platform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.projectState.activeGame = btn.getAttribute('data-platform');
        this.renderProjectSidebar();
        this.renderProjectsContent();
      });
    });
  }

  renderProjectsContent() {
    if (!this.projectViewport) return;
    const { categoryId, subcategoryId, activeGame, searchQuery } = this.projectState;

    let targetTitle = "All Projects & Tools";
    let targetDesc = "Explore software tools, game modding frameworks, and AI experiments built by NfgOdin.";
    let allProjects = [];

    if (categoryId) {
      const category = projectTree.find(c => c.id === categoryId);
      if (category) {
        if (subcategoryId) {
          const sub = category.subcategories.find(s => s.id === subcategoryId);
          if (sub) {
            targetTitle = `${category.title} // ${sub.title}`;
            targetDesc = sub.description;
            allProjects = sub.projects;
          }
        } else {
          targetTitle = category.title;
          targetDesc = category.description;
          category.subcategories.forEach(sub => allProjects.push(...sub.projects));
        }
      }
    } else {
      projectTree.forEach(cat => {
        cat.subcategories.forEach(sub => allProjects.push(...sub.projects));
      });
    }

    // Collect Unique Game / Platform tags in this scope
    const platformsSet = new Set();
    allProjects.forEach(p => {
      const plat = p.platform || p.game;
      if (plat) platformsSet.add(plat);
    });
    const availablePlatforms = ['All', ...Array.from(platformsSet)];

    // Safety check: ensure activeGame is valid for current view
    if (activeGame !== 'All' && !platformsSet.has(activeGame)) {
      this.projectState.activeGame = 'All';
    }

    // Filter by Platform/Game
    let filtered = allProjects;
    if (this.projectState.activeGame !== 'All') {
      filtered = filtered.filter(p => (p.platform || p.game) === this.projectState.activeGame);
    }

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery))
      );
    }

    // Render Cards HTML
    let cardsHtml = '';
    if (filtered.length === 0) {
      cardsHtml = `
        <div class="empty-state">
          <h3>No matching projects found</h3>
          <p>Try selecting "All Platforms" or clearing your search term.</p>
        </div>
      `;
    } else {
      cardsHtml = `
        <div class="cards-grid">
          ${filtered.map(proj => {
            const statusClass = `status-${proj.status.toLowerCase().replace(/\s+/g, '-')}`;
            const platformTag = proj.platform || proj.game;
            return `
              <article class="project-card">
                <div class="card-top">
                  <h3 class="card-title">${proj.title}</h3>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${platformTag ? `<span class="filter-game-badge">${platformTag}</span>` : ''}
                    <span class="status-badge ${statusClass}">${proj.status}</span>
                  </div>
                </div>
                <p class="card-desc">${proj.description}</p>
                <div class="tech-tag-list">
                  ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="card-footer">
                  <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
                    ${proj.githubUrl ? `
                      <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        GitHub
                      </a>
                    ` : ''}
                    ${proj.nexusUrl ? `
                      <a href="${proj.nexusUrl}" target="_blank" rel="noopener noreferrer" class="card-link" style="color: #da8e35;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        Nexus Mods
                      </a>
                    ` : ''}
                    ${proj.curseforgeUrl ? `
                      <a href="${proj.curseforgeUrl}" target="_blank" rel="noopener noreferrer" class="card-link" style="color: #f16436;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5h20c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-2.5c-.7 0-1.35.37-1.7 1-.7 1.25-1.8 2-3.8 2h-4c-2 0-3.1-.75-3.8-2-.35-.63-1-1-1.7-1H2c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 8h8v3h-8v-3zm-3 5h14c.55 0 1 .45 1 1v2H4v-2c0-.55.45-1 1-1z"/></svg>
                        CurseForge
                      </a>
                    ` : ''}
                  </div>
                  ${proj.guideUrl ? `
                    <a href="${proj.guideUrl}" class="card-link">
                      Read Guide &rarr;
                    </a>
                  ` : ''}
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }

    this.projectViewport.innerHTML = `
      <header class="explorer-header">
        <h2 class="explorer-title">${targetTitle}</h2>
        <p class="explorer-desc">${targetDesc}</p>
      </header>
      ${cardsHtml}
    `;
  }

  /* ==========================================================================
     TUTORIALS EXPLORER (SIDEBAR + READER)
     ========================================================================== */
  renderTutorialBreadcrumbs() {
    if (!this.tutorialBreadcrumbs) return;
    const { categoryId, subcategoryId, guideId } = this.tutorialState;
    const category = tutorialTree.find(c => c.id === categoryId);
    const subcategory = category?.subcategories?.find(s => s.id === subcategoryId);
    const guide = subcategory?.guides?.find(g => g.id === guideId);

    let crumbs = [
      { label: 'Tutorials', hash: '#/tutorials', active: !category }
    ];

    if (category) {
      crumbs.push({
        label: category.title,
        hash: `#/tutorials/${category.id}`,
        active: !subcategory
      });
    }

    if (subcategory) {
      crumbs.push({
        label: subcategory.title,
        hash: `#/tutorials/${category.id}/${subcategory.id}`,
        active: !guide
      });
    }

    if (guide) {
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

  // Helper to gather all guides under the currently active tutorial category/subcategory
  getCurrentScopeGuides() {
    const { categoryId, subcategoryId } = this.tutorialState;
    let guides = [];

    if (categoryId) {
      const category = tutorialTree.find(c => c.id === categoryId);
      if (category) {
        if (subcategoryId) {
          const sub = category.subcategories.find(s => s.id === subcategoryId);
          if (sub) {
            guides = sub.guides.map(g => ({ ...g, catId: category.id, subId: sub.id }));
          }
        } else {
          category.subcategories.forEach(sub => {
            guides.push(...sub.guides.map(g => ({ ...g, catId: category.id, subId: sub.id })));
          });
        }
      }
    } else {
      tutorialTree.forEach(cat => {
        cat.subcategories.forEach(sub => {
          guides.push(...sub.guides.map(g => ({ ...g, catId: cat.id, subId: sub.id })));
        });
      });
    }
    return guides;
  }

  renderTutorialSidebar() {
    if (!this.tutorialSidebar) return;
    const { categoryId, subcategoryId, guideId, activePlatform } = this.tutorialState;

    // Gather available platforms within current tutorial scope
    const currentGuides = this.getCurrentScopeGuides();
    const platformsSet = new Set();
    currentGuides.forEach(g => {
      const plat = g.platform || g.game;
      if (plat) platformsSet.add(plat);
    });
    const availablePlatforms = ['All', ...Array.from(platformsSet)];

    // Reset if active platform is not available in new category scope
    if (activePlatform !== 'All' && !platformsSet.has(activePlatform)) {
      this.tutorialState.activePlatform = 'All';
    }

    const platformPillsHtml = availablePlatforms.length > 2 ? `
      <div class="sidebar-heading" style="margin-top: 0.85rem;">Platform / Game</div>
      <div class="sidebar-platform-group">
        ${availablePlatforms.map(plat => `
          <button type="button" class="sidebar-platform-btn ${plat === this.tutorialState.activePlatform ? 'active' : ''}" data-platform="${plat}">
            <span>${plat === 'All' ? 'All Platforms' : plat}</span>
          </button>
        `).join('')}
      </div>
    ` : '';

    this.tutorialSidebar.innerHTML = `
      <div class="sidebar-heading">Navigation</div>
      <div class="sidebar-nav-group">
        <a href="#/tutorials" class="sidebar-cat-btn ${!categoryId ? 'active' : ''}">
          <span class="sidebar-cat-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            All Guides
          </span>
        </a>
      </div>

      ${platformPillsHtml}

      <div class="sidebar-heading" style="margin-top: 0.85rem;">Categories</div>
      <div class="sidebar-nav-group">
        ${tutorialTree.map(cat => {
          const isCurrentCat = categoryId === cat.id;
          return `
            <div>
              <a href="#/tutorials/${cat.id}" class="sidebar-cat-btn ${isCurrentCat && !subcategoryId ? 'active' : ''} ${isCurrentCat ? 'expanded' : ''}">
                <span class="sidebar-cat-content">
                  ${cat.icon}
                  ${cat.title}
                </span>
                <svg class="sidebar-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <div class="sidebar-sub-list ${isCurrentCat ? 'open' : ''}">
                ${cat.subcategories.map(sub => {
                  const isCurrentSub = isCurrentCat && subcategoryId === sub.id;
                  return `
                    <a href="#/tutorials/${cat.id}/${sub.id}" class="sidebar-sub-link ${isCurrentSub && !guideId ? 'active' : ''}">
                      <span>${sub.title}</span>
                      <span class="category-badge-count">${sub.guides.length}</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach click listeners to sidebar platform buttons
    this.tutorialSidebar.querySelectorAll('.sidebar-platform-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.tutorialState.activePlatform = btn.getAttribute('data-platform');
        this.renderTutorialSidebar();
        this.renderTutorialContent();
      });
    });
  }

  renderTutorialContent() {
    if (!this.tutorialViewport) return;
    const { categoryId, subcategoryId, guideId, activePlatform, searchQuery } = this.tutorialState;

    // Full Guide Reader
    if (guideId && categoryId && subcategoryId) {
      const category = tutorialTree.find(c => c.id === categoryId);
      const sub = category?.subcategories?.find(s => s.id === subcategoryId);
      const guide = sub?.guides?.find(g => g.id === guideId);
      if (guide) {
        this.renderFullGuide(guide);
        return;
      }
    }

    // Guides Overview List
    let targetTitle = "Technical Guides & Tutorials";
    let targetDesc = "Step-by-step documentation for installing mod loaders, converting legacy IRO files, and tuning subwoofer enclosures.";
    let allGuides = [];

    if (categoryId) {
      const category = tutorialTree.find(c => c.id === categoryId);
      if (category) {
        if (subcategoryId) {
          const sub = category.subcategories.find(s => s.id === subcategoryId);
          if (sub) {
            targetTitle = `${category.title} // ${sub.title}`;
            targetDesc = `All walkthroughs under ${sub.title}.`;
            allGuides = sub.guides.map(g => ({ ...g, catId: category.id, subId: sub.id }));
          }
        } else {
          targetTitle = category.title;
          category.subcategories.forEach(sub => {
            allGuides.push(...sub.guides.map(g => ({ ...g, catId: category.id, subId: sub.id })));
          });
        }
      }
    } else {
      tutorialTree.forEach(cat => {
        cat.subcategories.forEach(sub => {
          allGuides.push(...sub.guides.map(g => ({ ...g, catId: cat.id, subId: sub.id })));
        });
      });
    }

    // Filter by Platform
    if (activePlatform && activePlatform !== 'All') {
      allGuides = allGuides.filter(g => (g.platform || g.game) === activePlatform);
    }

    // Filter by Search Query
    if (searchQuery) {
      allGuides = allGuides.filter(g => 
        g.title.toLowerCase().includes(searchQuery) ||
        g.summary.toLowerCase().includes(searchQuery)
      );
    }

    let guidesListHtml = '';
    if (allGuides.length === 0) {
      guidesListHtml = `
        <div class="empty-state">
          <h3>No matching tutorials found</h3>
          <p>Try selecting "All Platforms" or clearing your search term.</p>
        </div>
      `;
    } else {
      guidesListHtml = `
        <div class="guides-list">
          ${allGuides.map(guide => {
            const platformTag = guide.platform || guide.game;
            return `
              <a href="#/tutorials/${guide.catId}/${guide.subId}/${guide.id}" class="guide-list-item">
                <div class="guide-info">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <h4 class="guide-item-title">${guide.title}</h4>
                    ${platformTag ? `<span class="filter-game-badge">${platformTag}</span>` : ''}
                  </div>
                  <p class="category-desc" style="margin: 0.25rem 0 0;">${guide.summary}</p>
                  <div class="guide-item-meta">
                    <span class="difficulty-badge">${guide.difficulty}</span>
                    <span>•</span>
                    <span>${guide.readingTime}</span>
                  </div>
                </div>
                <span class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
                  Read &rarr;
                </span>
              </a>
            `;
          }).join('')}
        </div>
      `;
    }

    this.tutorialViewport.innerHTML = `
      <header class="explorer-header">
        <h2 class="explorer-title">${targetTitle}</h2>
        <p class="explorer-desc">${targetDesc}</p>
      </header>
      ${guidesListHtml}
    `;
  }

  renderFullGuide(guide) {
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

    const platformTag = guide.platform || guide.game;

    this.tutorialViewport.innerHTML = `
      <article class="tutorial-reader">
        <header class="reader-header">
          <div class="reader-meta-bar" style="margin-bottom: 0.75rem; color: var(--text-muted); font-size: 0.85rem;">
            ${platformTag ? `<span class="filter-game-badge" style="margin-right: 0.5rem;">${platformTag}</span>` : ''}
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

// Start application on DOM Ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}
