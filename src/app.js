import { domainConfig } from './navigation.js';
import { getCurrentPath, getDomainFromPath, isKnownRoute, getRouteMeta } from './routes.js';

function link(path, label, className = '') {
  return `<a class="${className}" href="#${path}">${label}</a>`;
}

function renderDomainSwitcher(domain) {
  return `
    <div class="domain-switcher" aria-label="Domain Switcher">
      ${link(domainConfig.operations.home, 'Operations', domain === 'operations' ? 'switch active' : 'switch')}
      ${link(domainConfig.workspace.home, 'Workspace', domain === 'workspace' ? 'switch active' : 'switch')}
    </div>
  `;
}

function renderSidebar(domain, currentPath) {
  const config = domainConfig[domain];

  return `
    <nav class="sidebar" aria-label="Sidebar Navigation">
      <h2>${config.label}</h2>
      <ul>
        ${config.items
          .map((item) => {
            if (item.type === 'group') {
              return `
                <li class="group">
                  <div class="group-title">${item.label}</div>
                  <ul>
                    ${item.children
                      .map((child) => `
                        <li>
                          ${link(child.path, child.label, currentPath === child.path ? 'active nav-link' : 'nav-link')}
                        </li>
                      `)
                      .join('')}
                  </ul>
                </li>
              `;
            }

            return `
              <li>
                ${link(item.path, item.label, currentPath === item.path ? 'active nav-link' : 'nav-link')}
              </li>
            `;
          })
          .join('')}
      </ul>
    </nav>
  `;
}

function renderOperationsHome() {
  const sections = [
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
  ];

  return `
    <section class="page">
      <h1>Operations Home</h1>
      ${sections
        .map(
          (section) => `
            <article class="home-section">
              <h3>${section.title}</h3>
              <div class="entry-links">
                ${section.links.map((item) => link(item.path, item.label, 'entry-link')).join('')}
              </div>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderWorkspaceHome() {
  const sections = [
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
  ];

  return `
    <section class="page">
      <h1>Workspace Home</h1>
      ${sections
        .map(
          (section) => `
            <article class="home-section">
              <h3>${section.title}</h3>
              <div class="entry-links">
                ${section.links.map((item) => link(item.path, item.label, 'entry-link')).join('')}
              </div>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderPlaceholderPage(path, domain) {
  const meta = getRouteMeta(path);
  const nextLinks = (meta?.links || []).map((item) => link(item.path, item.label, 'entry-link')).join('');

  return `
    <section class="page">
      <h1>${meta?.title || 'Placeholder Page'}</h1>
      <p>${meta?.purpose || 'Skeleton placeholder page.'}</p>
      <p><strong>Current domain:</strong> ${domainConfig[domain].label}</p>
      <div class="entry-links">
        ${nextLinks}
      </div>
    </section>
  `;
}

function renderMainContent(path, domain) {
  if (path === '/operations/home') return renderOperationsHome();
  if (path === '/workspace/home') return renderWorkspaceHome();
  return renderPlaceholderPage(path, domain);
}

export function renderApp(root) {
  const rawPath = getCurrentPath();
  const path = isKnownRoute(rawPath) ? rawPath : '/operations/home';

  if (rawPath !== path) {
    window.location.hash = `#${path}`;
    return;
  }

  const domain = getDomainFromPath(path);

  root.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">CA Commer v2</div>
        ${renderDomainSwitcher(domain)}
      </header>
      <div class="layout">
        ${renderSidebar(domain, path)}
        <main class="content" aria-live="polite">
          ${renderMainContent(path, domain)}
        </main>
      </div>
    </div>
  `;
}
