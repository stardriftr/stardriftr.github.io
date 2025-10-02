// header.js
export function createHeader() {
  const header = document.createElement('header');
  header.id = 'header';
  header.innerHTML = `
    <img
      src="https://raw.githubusercontent.com/stardriftr/stardriftr.github.io/main/images/star_driftr_logo.png"
      alt="STAR DRIFTR Logo"
      class="logo"
      onclick="goHome()"
    />
    <div
      class="header-right"
      onclick="toggleMenu()"
      aria-label="Menu"
      role="button"
      tabindex="0"
    >
      <svg class="hamburger" viewBox="0 0 24 24" aria-hidden="true">
        <rect y="4" width="24" height="2" rx="1"></rect>
        <rect y="11" width="24" height="2" rx="1"></rect>
        <rect y="18" width="24" height="2" rx="1"></rect>
      </svg>
    </div>
  `;
  return header;
}

// Needed global helpers
window.goHome = function () {
  window.location.href = "index.html";
};
window.toggleMenu = function () {
  alert("TODO: implement menu toggle");
};
