import { renderApp } from './app.js';
import './styles.css';

const appRoot = document.getElementById('app');

function normalizeHashRoute() {
  if (!window.location.hash || window.location.hash === '#') {
    window.location.hash = '#/operations/home';
    return;
  }

  const knownPrefixes = ['#/operations/', '#/workspace/'];
  const hasKnownPrefix = knownPrefixes.some((prefix) => window.location.hash.startsWith(prefix));

  if (!hasKnownPrefix) {
    window.location.hash = '#/operations/home';
  }
}

function onRouteChange() {
  normalizeHashRoute();
  renderApp(appRoot);
}

window.addEventListener('hashchange', onRouteChange);
onRouteChange();
