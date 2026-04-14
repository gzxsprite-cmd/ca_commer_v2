(function () {
  const appRoot = document.getElementById('app');

  const domainConfig = {
    operations: {
      label: 'Operations',
      home: '/operations/home',
      items: [
        { type: 'link', label: 'Home', path: '/operations/home' },
        {
          type: 'group',
          label: 'Contract',
          children: [
            { label: 'Intake', path: '/operations/contract/intake' },
            { label: 'Review', path: '/operations/contract/review' },
            { label: 'Archive', path: '/operations/contract/archive' }
          ]
        },
        {
          type: 'group',
          label: 'Billing',
          children: [
            { label: 'Plan', path: '/operations/billing/plan' },
            { label: 'Execution', path: '/operations/billing/execution' },
            { label: 'Records', path: '/operations/billing/records' }
          ]
        },
        { type: 'link', label: 'Exceptions', path: '/operations/exceptions' }
      ]
    },
    workspace: {
      label: 'Workspace',
      home: '/workspace/home',
      items: [
        { type: 'link', label: 'Home', path: '/workspace/home' },
        { type: 'link', label: 'Contract Trace', path: '/workspace/contract-trace' },
        { type: 'link', label: 'Billing Trace', path: '/workspace/billing-trace' },
        { type: 'link', label: 'Mapping', path: '/workspace/mapping' },
        { type: 'link', label: 'Planning', path: '/workspace/planning' },
        { type: 'link', label: 'Review Dashboard', path: '/workspace/review-dashboard' }
      ]
    }
  };

  const requiredRoutes = [
    '/operations/home',
    '/operations/contract/intake',
    '/operations/contract/review',
    '/operations/contract/archive',
    '/operations/billing/plan',
    '/operations/billing/execution',
    '/operations/billing/records',
    '/operations/exceptions',
    '/workspace/home',
    '/workspace/contract-trace',
    '/workspace/billing-trace',
    '/workspace/mapping',
    '/workspace/planning',
    '/workspace/review-dashboard'
  ];

  const routeMeta = {
    '/operations/contract/intake': {
      title: 'Contract Intake',
      purpose: 'Capture and start contract intake workflow at skeleton level.',
      links: [
        { label: 'Contract Review', path: '/operations/contract/review' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/contract/review': {
      title: 'Contract Review',
      purpose: 'Review in-flight contract items at skeleton level.',
      links: [
        { label: 'Contract Archive', path: '/operations/contract/archive' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/contract/archive': {
      title: 'Contract Archive',
      purpose: 'Track archived contract records at skeleton level.',
      links: [
        { label: 'Contract Intake', path: '/operations/contract/intake' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/billing/plan': {
      title: 'Billing Plan',
      purpose: 'Prepare billing planning checkpoints at skeleton level.',
      links: [
        { label: 'Billing Execution', path: '/operations/billing/execution' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/billing/execution': {
      title: 'Billing Execution',
      purpose: 'Track billing execution progress at skeleton level.',
      links: [
        { label: 'Billing Records', path: '/operations/billing/records' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/billing/records': {
      title: 'Billing Records',
      purpose: 'View billing record placeholders at skeleton level.',
      links: [
        { label: 'Billing Plan', path: '/operations/billing/plan' },
        { label: 'Operations Home', path: '/operations/home' }
      ]
    },
    '/operations/exceptions': {
      title: 'Exceptions',
      purpose: 'Handle exception routing points at skeleton level.',
      links: [
        { label: 'Operations Home', path: '/operations/home' },
        { label: 'Contract Review', path: '/operations/contract/review' }
      ]
    },
    '/workspace/contract-trace': {
      title: 'Contract Trace',
      purpose: 'Trace contract lifecycle checkpoints at skeleton level.',
      links: [
        { label: 'Workspace Home', path: '/workspace/home' },
        { label: 'Mapping', path: '/workspace/mapping' }
      ]
    },
    '/workspace/billing-trace': {
      title: 'Billing Trace',
      purpose: 'Trace billing lifecycle checkpoints at skeleton level.',
      links: [
        { label: 'Workspace Home', path: '/workspace/home' },
        { label: 'Review Dashboard', path: '/workspace/review-dashboard' }
      ]
    },
    '/workspace/mapping': {
      title: 'Mapping',
      purpose: 'Review mapping relationships at skeleton level.',
      links: [
        { label: 'Planning', path: '/workspace/planning' },
        { label: 'Workspace Home', path: '/workspace/home' }
      ]
    },
    '/workspace/planning': {
      title: 'Planning',
      purpose: 'Prepare planning checkpoints at skeleton level.',
      links: [
        { label: 'Review Dashboard', path: '/workspace/review-dashboard' },
        { label: 'Workspace Home', path: '/workspace/home' }
      ]
    },
    '/workspace/review-dashboard': {
      title: 'Review Dashboard',
      purpose: 'Review workspace-level progress at skeleton level.',
      links: [
        { label: 'Contract Trace', path: '/workspace/contract-trace' },
        { label: 'Workspace Home', path: '/workspace/home' }
      ]
    }
  };

  function link(path, label, className) {
    return '<a class="' + (className || '') + '" href="#' + path + '">' + label + '</a>';
  }

  function getCurrentPath() {
    const hash = window.location.hash || '#/operations/home';
    return hash.replace(/^#/, '');
  }

  function normalizeHashRoute() {
    const current = getCurrentPath();
    if (!requiredRoutes.includes(current)) {
      window.location.hash = '#/operations/home';
      return '/operations/home';
    }
    return current;
  }

  function getDomainFromPath(path) {
    return path.startsWith('/workspace/') ? 'workspace' : 'operations';
  }

  function renderDomainSwitcher(domain) {
    return (
      '<div class="domain-switcher" aria-label="Domain Switcher">' +
      link('/operations/home', 'Operations', domain === 'operations' ? 'switch active' : 'switch') +
      link('/workspace/home', 'Workspace', domain === 'workspace' ? 'switch active' : 'switch') +
      '</div>'
    );
  }

  function renderSidebar(domain, currentPath) {
    const config = domainConfig[domain];

    return (
      '<nav class="sidebar" aria-label="Sidebar Navigation">' +
      '<h2>' + config.label + '</h2>' +
      '<ul>' +
      config.items
        .map(function (item) {
          if (item.type === 'group') {
            return (
              '<li class="group">' +
              '<div class="group-title">' + item.label + '</div>' +
              '<ul>' +
              item.children
                .map(function (child) {
                  return '<li>' + link(child.path, child.label, currentPath === child.path ? 'active nav-link' : 'nav-link') + '</li>';
                })
                .join('') +
              '</ul>' +
              '</li>'
            );
          }

          return '<li>' + link(item.path, item.label, currentPath === item.path ? 'active nav-link' : 'nav-link') + '</li>';
        })
        .join('') +
      '</ul>' +
      '</nav>'
    );
  }

  function renderHomePage(title, sections) {
    return (
      '<section class="page">' +
      '<h1>' + title + '</h1>' +
      sections
        .map(function (section) {
          return (
            '<article class="home-section">' +
            '<h3>' + section.title + '</h3>' +
            '<div class="entry-links">' +
            section.links
              .map(function (entry) {
                return link(entry.path, entry.label, 'entry-link');
              })
              .join('') +
            '</div>' +
            '</article>'
          );
        })
        .join('') +
      '</section>'
    );
  }

  function renderOperationsHome() {
    return renderHomePage('Operations Home', [
      {
        title: 'My Tasks',
        links: [
          { label: 'Go to Contract Intake', path: '/operations/contract/intake' },
          { label: 'Go to Contract Review', path: '/operations/contract/review' }
        ]
      },
      {
        title: 'In-flight Contracts',
        links: [
          { label: 'Go to Contract Review', path: '/operations/contract/review' },
          { label: 'Go to Contract Archive', path: '/operations/contract/archive' }
        ]
      },
      {
        title: 'This Month Execution',
        links: [
          { label: 'Go to Billing Plan', path: '/operations/billing/plan' },
          { label: 'Go to Billing Execution', path: '/operations/billing/execution' }
        ]
      },
      {
        title: 'Quick Entry',
        links: [
          { label: 'Go to Billing Records', path: '/operations/billing/records' },
          { label: 'Go to Exceptions', path: '/operations/exceptions' }
        ]
      }
    ]);
  }

  function renderWorkspaceHome() {
    return renderHomePage('Workspace Home', [
      {
        title: 'In-flight Overview',
        links: [
          { label: 'Go to Contract Trace', path: '/workspace/contract-trace' },
          { label: 'Go to Billing Trace', path: '/workspace/billing-trace' }
        ]
      },
      {
        title: 'Archived / Effective',
        links: [
          { label: 'Go to Mapping', path: '/workspace/mapping' },
          { label: 'Go to Review Dashboard', path: '/workspace/review-dashboard' }
        ]
      },
      {
        title: 'Billing Progress',
        links: [
          { label: 'Go to Billing Trace', path: '/workspace/billing-trace' },
          { label: 'Go to Planning', path: '/workspace/planning' }
        ]
      },
      {
        title: 'Quick Trace Entry',
        links: [
          { label: 'Go to Contract Trace', path: '/workspace/contract-trace' },
          { label: 'Go to Mapping', path: '/workspace/mapping' }
        ]
      }
    ]);
  }

  function renderPlaceholderPage(path, domain) {
    const meta = routeMeta[path] || {
      title: 'Placeholder Page',
      purpose: 'Skeleton placeholder page.',
      links: [{ label: 'Operations Home', path: '/operations/home' }]
    };

    return (
      '<section class="page">' +
      '<h1>' + meta.title + '</h1>' +
      '<p>' + meta.purpose + '</p>' +
      '<p><strong>Current domain:</strong> ' + domainConfig[domain].label + '</p>' +
      '<div class="entry-links">' +
      meta.links
        .map(function (entry) {
          return link(entry.path, entry.label, 'entry-link');
        })
        .join('') +
      '</div>' +
      '</section>'
    );
  }

  function renderMainContent(path, domain) {
    if (path === '/operations/home') return renderOperationsHome();
    if (path === '/workspace/home') return renderWorkspaceHome();
    return renderPlaceholderPage(path, domain);
  }

  function renderApp() {
    const path = normalizeHashRoute();
    const domain = getDomainFromPath(path);

    appRoot.innerHTML =
      '<div class="app-shell">' +
      '<header class="topbar">' +
      '<div class="brand">CA Commer v2</div>' +
      renderDomainSwitcher(domain) +
      '</header>' +
      '<div class="layout">' +
      renderSidebar(domain, path) +
      '<main class="content" aria-live="polite">' +
      renderMainContent(path, domain) +
      '</main>' +
      '</div>' +
      '</div>';
  }

  window.addEventListener('hashchange', renderApp);
  renderApp();
})();
