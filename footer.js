export function createFooter() {
  const nav = document.createElement('nav');
  nav.id = 'bottom-bar';
  nav.setAttribute('aria-label', 'Bottom navigation');
  nav.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Home" tabindex="0" onclick="window.location.href='index.html'">
      <rect x="2" y="2" width="20" height="20" fill="red"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Search" tabindex="0" onclick="alert('Search not implemented yet')">
      <circle cx="12" cy="12" r="10" fill="blue"/>
    </svg>
  `;
  return nav;
}
