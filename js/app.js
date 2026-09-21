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
      categoryId: null,        // e.g. "modding", "software", "ai" (null = All)
      subcategoryId: null,     // e.g. "loaders", "mods", "tools" (null = All in Category)
      activeGame: 'All',       // specific game when selected from dropdown
      activePlatform: 'All',   // 'All', 'github', 'curseforge', 'nexus'
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
      let catId = parts[1] || null;
      let subId = parts[2] || null;
      
      let gameParam = null;
      if (cleanHash.includes('?')) {
        const queryStr = cleanHash.split('?')[1];
        const params = new URLSearchParams(queryStr);
        gameParam = params.get('game');
        if (subId && subId.includes('?')) {
          subId = subId.split('?')[0];
        }
        if (catId && catId.includes('?')) {
          catId = catId.split('?')[0];
        }
      }

      this.projectState.categoryId = catId;
      this.projectState.subcategoryId = subId;
      if (gameParam) {
        this.projectState.activeGame = decodeURIComponent(gameParam);
      } else {
        this.projectState.activeGame = 'All';
      }

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
      const isGameActive = this.projectState.activeGame && this.projectState.activeGame !== 'All';
      crumbs.push({
        label: subcategory.title,
        hash: `#/projects/${category.id}/${subcategory.id}`,
        active: !isGameActive
      });
      if (isGameActive) {
        crumbs.push({
          label: this.projectState.activeGame,
          hash: `#/projects/${category.id}/${subcategory.id}?game=${encodeURIComponent(this.projectState.activeGame)}`,
          active: true
        });
      }
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

    const activePlatform = this.projectState.activePlatform || 'All';
    const platformPillsHtml = `
      <div class="sidebar-heading" style="margin-top: 0.85rem;">Platform Filter</div>
      <div class="sidebar-platform-group">
        <button type="button" class="sidebar-platform-btn ${activePlatform === 'All' ? 'active' : ''}" data-platform="All">
          <span>All</span>
        </button>
        <button type="button" class="sidebar-platform-btn ${activePlatform === 'github' ? 'active' : ''}" data-platform="github">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>GitHub</span>
        </button>
        <button type="button" class="sidebar-platform-btn ${activePlatform === 'curseforge' ? 'active' : ''}" data-platform="curseforge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5h20c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-2.5c-.7 0-1.35.37-1.7 1-.7 1.25-1.8 2-3.8 2h-4c-2 0-3.1-.75-3.8-2-.35-.63-1-1-1.7-1H2c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 8h8v3h-8v-3zm-3 5h14c.55 0 1 .45 1 1v2H4v-2c0-.55.45-1 1-1z"/></svg>
          <span>Curse</span>
        </button>
        <button type="button" class="sidebar-platform-btn ${activePlatform === 'nexus' ? 'active' : ''}" data-platform="nexus">
          <svg width="13" height="14" viewBox="0 0 24 26" fill="currentColor"><path d="M6.98826 24.495C6.79343 24.4706 6.59794 24.4233 6.3908 24.3501C6.01427 24.2172 5.70001 24.0384 5.46836 23.8975C4.95807 23.5873 4.43921 23.1981 3.88232 22.7082C3.63916 22.4941 3.40229 22.2694 3.17787 22.0399L2.98506 21.8434C2.85076 21.716 2.73601 21.5732 2.64187 21.4194C2.4658 21.138 2.32507 20.7623 2.30378 20.2704C2.29092 20.1102 2.28356 19.9489 2.28195 19.7882C2.27834 19.4379 2.30083 19.0765 2.3489 18.7137C2.44705 17.9728 2.66397 17.3068 2.84205 16.8094C2.85665 16.7685 2.87151 16.7276 2.88664 16.6866C2.83697 16.5506 2.78983 16.4137 2.74565 16.2765C2.49003 15.4831 2.32239 14.6568 2.24714 13.8205C2.168 12.9397 2.1905 12.0498 2.31409 11.1763C2.34006 10.9925 2.37086 10.8085 2.40594 10.6254C2.08632 10.1296 1.68101 9.4239 1.42928 8.5827L1.42446 8.56706C1.36996 8.38783 1.24222 7.96838 1.31292 7.4192C1.33916 7.21658 1.38496 7.01424 1.45325 6.79971C1.57965 6.40236 1.74555 6.07087 1.87583 5.82649C2.16573 5.28334 2.52645 4.73258 2.9789 4.1428C3.17774 3.88364 3.38542 3.63222 3.59658 3.3953L3.78096 3.18752C3.87697 3.072 3.98275 2.96939 4.09656 2.88085C4.36664 2.66474 4.74102 2.48365 5.2477 2.45853C5.4136 2.44318 5.58352 2.43514 5.75357 2.43471H5.76656C6.10653 2.43471 6.45788 2.46499 6.81098 2.52469C7.34082 2.61437 7.82647 2.77481 8.25669 2.94471C8.5435 2.81298 8.83822 2.69473 9.13467 2.59285C9.87554 2.33785 10.6459 2.17641 11.4245 2.11298C12.2399 2.0464 13.07 2.08758 13.8718 2.23438C14.0583 2.26854 14.2452 2.30872 14.4309 2.35464C15.0615 1.89099 15.6421 1.57227 16.2398 1.36032L16.253 1.35544C16.3931 1.30321 16.6846 1.19458 17.0708 1.19458C17.1543 1.19458 17.2387 1.19975 17.3213 1.21008C17.5163 1.23447 17.7118 1.28183 17.9188 1.35487C18.2956 1.4879 18.6097 1.6667 18.8413 1.80776C19.3518 2.11801 19.8706 2.50718 20.4274 2.99709C20.6704 3.21091 20.9074 3.43577 21.132 3.66537L21.3245 3.86154C21.4205 3.95266 21.5065 4.05153 21.5821 4.15672C21.8249 4.48706 22.0144 4.95645 22.0181 5.61798C22.0307 5.85361 22.0312 6.09412 22.0198 6.33491C21.9951 6.86156 21.9209 7.36338 21.7994 7.82631C21.7101 8.16641 21.6035 8.51153 21.4818 8.85507C21.7187 9.4968 21.8972 10.1619 22.0139 10.8385C22.2584 12.2556 22.2311 13.7213 21.9384 15.1263C22.118 15.4056 22.2704 15.664 22.4028 15.9141C22.633 16.3488 22.8156 16.7967 22.9455 17.2451C22.9937 17.4116 23.121 17.8515 23.0371 18.4149C23.0079 18.6107 22.96 18.8083 22.8907 19.0179C22.6488 19.7506 22.2721 20.3476 21.938 20.8496C21.5703 21.4019 21.1653 21.9265 20.7336 22.4091L20.5775 22.5851C20.4803 22.7026 20.3727 22.8062 20.2572 22.8956C19.9876 23.1097 19.6146 23.2889 19.1111 23.3142C18.9451 23.3297 18.775 23.3374 18.605 23.338H18.5916C18.2341 23.338 17.864 23.3044 17.4919 23.2383C16.8958 23.1324 16.3515 22.9361 15.8781 22.7375C15.6208 22.8471 15.3586 22.9457 15.0954 23.0316C14.3418 23.2773 13.5601 23.4267 12.7718 23.4755C11.9527 23.5266 11.1215 23.4682 10.3187 23.304C10.2214 23.284 10.1241 23.2625 10.027 23.2394C9.33217 23.7661 8.70834 24.1182 8.06963 24.3448L8.05651 24.3495C7.91645 24.4019 7.62495 24.5104 7.23879 24.5104C7.15523 24.5104 7.07088 24.5052 6.98826 24.495Z"/></svg>
          <span>Nexus</span>
        </button>
      </div>
    `;

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
                  
                  // Collect unique games if this subcategory has distinct games
                  const gameGroups = {};
                  sub.projects.forEach(p => {
                    const g = p.platform || p.game;
                    if (g) {
                      gameGroups[g] = (gameGroups[g] || 0) + 1;
                    }
                  });
                  const games = Object.keys(gameGroups);
                  const hasNestedGames = games.length > 1;

                  return `
                    <div>
                      <a href="#/projects/${cat.id}/${sub.id}" class="sidebar-sub-link ${isCurrentSub && activeGame === 'All' ? 'active' : ''}">
                        <span>${sub.title}</span>
                        <span class="category-badge-count">${sub.projects.length}</span>
                      </a>
                      ${hasNestedGames ? `
                        <div class="sidebar-nested-list ${isCurrentSub ? 'open' : ''}">
                          ${games.map(gameName => {
                            const isGameActive = isCurrentSub && activeGame === gameName;
                            return `
                              <a href="#/projects/${cat.id}/${sub.id}?game=${encodeURIComponent(gameName)}" class="sidebar-nested-link ${isGameActive ? 'active' : ''}">
                                <span>${gameName}</span>
                                <span class="category-badge-count">${gameGroups[gameName]}</span>
                              </a>
                            `;
                          }).join('')}
                        </div>
                      ` : ''}
                    </div>
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
        this.projectState.activePlatform = btn.getAttribute('data-platform');
        this.renderProjectSidebar();
        this.renderProjectsContent();
      });
    });
  }

  renderProjectsContent() {
    if (!this.projectViewport) return;
    const { categoryId, subcategoryId, activeGame, activePlatform, searchQuery } = this.projectState;

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

    // Filter by Specific Game (from sidebar nested dropdown)
    let filtered = allProjects;
    if (activeGame && activeGame !== 'All') {
      filtered = filtered.filter(p => (p.platform || p.game) === activeGame);
    }

    // Filter by Platform (All, GitHub, CurseForge, Nexus)
    if (activePlatform && activePlatform !== 'All') {
      if (activePlatform === 'github') {
        filtered = filtered.filter(p => !!p.githubUrl);
      } else if (activePlatform === 'curseforge') {
        filtered = filtered.filter(p => !!p.curseforgeUrl);
      } else if (activePlatform === 'nexus') {
        filtered = filtered.filter(p => !!p.nexusUrl);
      }
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
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    ${proj.githubUrl ? `
                      <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-emblem-link github" title="GitHub Repository" aria-label="GitHub Repository">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      </a>
                    ` : ''}
                    ${proj.nexusUrl ? `
                      <a href="${proj.nexusUrl}" target="_blank" rel="noopener noreferrer" class="card-emblem-link nexus" title="Nexus Mods" aria-label="Nexus Mods" style="color: #da8e35;">
                        <svg width="16" height="17" viewBox="0 0 24 26" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.98826 24.495C6.79343 24.4706 6.59794 24.4233 6.3908 24.3501C6.01427 24.2172 5.70001 24.0384 5.46836 23.8975C4.95807 23.5873 4.43921 23.1981 3.88232 22.7082C3.63916 22.4941 3.40229 22.2694 3.17787 22.0399L2.98506 21.8434C2.85076 21.716 2.73601 21.5732 2.64187 21.4194C2.4658 21.138 2.32507 20.7623 2.30378 20.2704C2.29092 20.1102 2.28356 19.9489 2.28195 19.7882C2.27834 19.4379 2.30083 19.0765 2.3489 18.7137C2.44705 17.9728 2.66397 17.3068 2.84205 16.8094C2.85665 16.7685 2.87151 16.7276 2.88664 16.6866C2.83697 16.5506 2.78983 16.4137 2.74565 16.2765C2.49003 15.4831 2.32239 14.6568 2.24714 13.8205C2.168 12.9397 2.1905 12.0498 2.31409 11.1763C2.34006 10.9925 2.37086 10.8085 2.40594 10.6254C2.08632 10.1296 1.68101 9.4239 1.42928 8.5827L1.42446 8.56706C1.36996 8.38783 1.24222 7.96838 1.31292 7.4192C1.33916 7.21658 1.38496 7.01424 1.45325 6.79971C1.57965 6.40236 1.74555 6.07087 1.87583 5.82649C2.16573 5.28334 2.52645 4.73258 2.9789 4.1428C3.17774 3.88364 3.38542 3.63222 3.59658 3.3953L3.78096 3.18752C3.87697 3.072 3.98275 2.96939 4.09656 2.88085C4.36664 2.66474 4.74102 2.48365 5.2477 2.45853C5.4136 2.44318 5.58352 2.43514 5.75357 2.43471H5.76656C6.10653 2.43471 6.45788 2.46499 6.81098 2.52469C7.34082 2.61437 7.82647 2.77481 8.25669 2.94471C8.5435 2.81298 8.83822 2.69473 9.13467 2.59285C9.87554 2.33785 10.6459 2.17641 11.4245 2.11298C12.2399 2.0464 13.07 2.08758 13.8718 2.23438C14.0583 2.26854 14.2452 2.30872 14.4309 2.35464C15.0615 1.89099 15.6421 1.57227 16.2398 1.36032L16.253 1.35544C16.3931 1.30321 16.6846 1.19458 17.0708 1.19458C17.1543 1.19458 17.2387 1.19975 17.3213 1.21008C17.5163 1.23447 17.7118 1.28183 17.9188 1.35487C18.2956 1.4879 18.6097 1.6667 18.8413 1.80776C19.3518 2.11801 19.8706 2.50718 20.4274 2.99709C20.6704 3.21091 20.9074 3.43577 21.132 3.66537L21.3245 3.86154C21.4205 3.95266 21.5065 4.05153 21.5821 4.15672C21.8249 4.48706 22.0144 4.95645 22.0181 5.61798C22.0307 5.85361 22.0312 6.09412 22.0198 6.33491C21.9951 6.86156 21.9209 7.36338 21.7994 7.82631C21.7101 8.16641 21.6035 8.51153 21.4818 8.85507C21.7187 9.4968 21.8972 10.1619 22.0139 10.8385C22.2584 12.2556 22.2311 13.7213 21.9384 15.1263C22.118 15.4056 22.2704 15.664 22.4028 15.9141C22.633 16.3488 22.8156 16.7967 22.9455 17.2451C22.9937 17.4116 23.121 17.8515 23.0371 18.4149C23.0079 18.6107 22.96 18.8083 22.8907 19.0179C22.6488 19.7506 22.2721 20.3476 21.938 20.8496C21.5703 21.4019 21.1653 21.9265 20.7336 22.4091L20.5775 22.5851C20.4803 22.7026 20.3727 22.8062 20.2572 22.8956C19.9876 23.1097 19.6146 23.2889 19.1111 23.3142C18.9451 23.3297 18.775 23.3374 18.605 23.338H18.5916C18.2341 23.338 17.864 23.3044 17.4919 23.2383C16.8958 23.1324 16.3515 22.9361 15.8781 22.7375C15.6208 22.8471 15.3586 22.9457 15.0954 23.0316C14.3418 23.2773 13.5601 23.4267 12.7718 23.4755C11.9527 23.5266 11.1215 23.4682 10.3187 23.304C10.2214 23.284 10.1241 23.2625 10.027 23.2394C9.33217 23.7661 8.70834 24.1182 8.06963 24.3448L8.05651 24.3495C7.91645 24.4019 7.62495 24.5104 7.23879 24.5104C7.15523 24.5104 7.07088 24.5052 6.98826 24.495Z" stroke="currentColor"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.22924 9.73278C8.75778 9.50447 8.41727 9.27444 8.06324 9.00351C7.52255 8.60745 7.03007 8.15685 6.6127 7.68976C5.59721 6.57993 5.13359 5.41838 5.28128 4.49194L4.9099 4.86108C4.17144 5.69381 3.19143 7.15005 3.18286 7.78361L3.20094 7.85048C3.33203 8.33508 3.55497 8.82227 3.86307 9.29854L3.86816 9.30629C4.26557 9.99754 5.05933 11.1254 7.87083 12.4477L7.37366 13.4489L11.168 12.3565L9.80112 8.59051L9.22924 9.73278Z" fill="currentColor"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.129 16.0396C15.6006 16.2679 15.941 16.4979 16.295 16.7688C16.8359 17.1649 17.3282 17.6154 17.7456 18.0826C18.7612 19.1923 19.1784 20.2422 19.0307 21.1684L19.4485 20.9113C20.187 20.0785 21.1668 18.6223 21.1755 17.9887L21.1573 17.9219C21.0263 17.4373 20.8034 16.9499 20.4952 16.4737L20.4901 16.4661C20.0928 15.7748 19.2989 14.6469 16.4875 13.3247L16.9846 12.3235L13.1903 13.4158L14.5573 17.1818L15.129 16.0396Z" fill="currentColor"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.218 9.70161C15.4309 9.1962 15.6456 8.83142 15.8984 8.45201C16.2679 7.87255 16.6884 7.34476 17.1242 6.89747C18.1599 5.80902 19.2366 5.30432 20.101 5.4626L19.7636 5.07243C18.9867 4.28102 17.6279 3.23089 17.0368 3.22156L16.9743 3.24107C16.522 3.38156 16.0675 3.62035 15.6231 3.95068L15.6159 3.95614C14.9709 4.38205 13.9185 5.23272 12.6847 8.2458L11.7505 7.71298L12.7697 11.7794L16.2838 10.3144L15.218 9.70161Z" fill="currentColor"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0914 16.003C8.87836 16.5084 8.66372 16.8732 8.41092 17.2525C8.04136 17.8321 7.62091 18.3599 7.1852 18.8072C6.14949 19.8956 5.07539 20.3561 4.21094 20.1978L4.54577 20.6322C5.32266 21.4235 6.68147 22.4738 7.2725 22.4829L7.33504 22.4636C7.78735 22.3231 8.24181 22.0843 8.68622 21.7538L8.69345 21.7485C9.33844 21.3226 10.3909 20.4719 11.6248 17.4589L12.5589 17.9917L11.5396 13.9253L8.02556 15.3901L9.0914 16.003Z" fill="currentColor"/>
                        </svg>
                      </a>
                    ` : ''}
                    ${proj.curseforgeUrl ? `
                      <a href="${proj.curseforgeUrl}" target="_blank" rel="noopener noreferrer" class="card-emblem-link curseforge" title="CurseForge" aria-label="CurseForge" style="color: #f16436;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5h20c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-2.5c-.7 0-1.35.37-1.7 1-.7 1.25-1.8 2-3.8 2h-4c-2 0-3.1-.75-3.8-2-.35-.63-1-1-1.7-1H2c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 8h8v3h-8v-3zm-3 5h14c.55 0 1 .45 1 1v2H4v-2c0-.55.45-1 1-1z"/></svg>
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
