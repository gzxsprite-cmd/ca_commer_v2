# Home & Navigation Skeleton

## 一、入口结构

- Operations
- Workspace

入口使用 URL hash 路由：

- `#/operations/home`
- `#/workspace/home`

Domain switcher 必须由当前路径前缀驱动：

- `/operations/*` → Operations
- `/workspace/*` → Workspace

---

## 二、Home（骨架）

### Operations Home 必须包含区块：

- My Tasks
- In-flight Contracts
- This Month Execution
- Quick Entry

### Workspace Home 必须包含区块：

- In-flight Overview
- Archived / Effective
- Billing Progress
- Quick Trace Entry

每个区块至少包含 1–2 个可点击入口链接。

---

## 三、一级导航

### Operations
- Home
- Contract
  - Intake
  - Review
  - Archive
- Billing
  - Plan
  - Execution
  - Records
- Exceptions

### Workspace
- Home
- Contract Trace
- Billing Trace
- Mapping
- Planning
- Review Dashboard

---

## 四、路由清单

### Operations
- `/operations/home`
- `/operations/contract/intake`
- `/operations/contract/review`
- `/operations/contract/archive`
- `/operations/billing/plan`
- `/operations/billing/execution`
- `/operations/billing/records`
- `/operations/exceptions`

### Workspace
- `/workspace/home`
- `/workspace/contract-trace`
- `/workspace/billing-trace`
- `/workspace/mapping`
- `/workspace/planning`
- `/workspace/review-dashboard`

---

## 五、占位页要求

所有非 Home 页使用同一个占位页模板，包含：

- page title
- one-line purpose
- current domain
- related next links

---

## 六、原则

- 不锁页面细节
- 按任务组织
- 允许未来重构
- 本轮不引入复杂状态管理
