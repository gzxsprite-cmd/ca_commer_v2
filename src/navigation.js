export const domainConfig = {
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

export const requiredRoutes = [
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
