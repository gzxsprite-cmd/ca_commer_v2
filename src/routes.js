import { requiredRoutes } from './navigation.js';

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

export function getCurrentPath() {
  const hash = window.location.hash || '#/operations/home';
  return hash.replace(/^#/, '');
}

export function getDomainFromPath(path) {
  if (path.startsWith('/workspace/')) return 'workspace';
  return 'operations';
}

export function isKnownRoute(path) {
  return requiredRoutes.includes(path);
}

export function getRouteMeta(path) {
  return routeMeta[path] || null;
}
