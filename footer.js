// footer.js
export function createFooter() {
  const nav = document.createElement('nav');
  nav.id = 'bottom-bar';
  nav.setAttribute('aria-label', 'Bottom navigation');
  nav.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         role="img" aria-label="Home" tabindex="0"
         onclick="window.location.href='index.html'">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         role="img" aria-label="Search" tabindex="0"
         onclick="alert('Search not implemented yet')">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5
               6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79
               l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 119.5 5
               a4.5 4.5 0 010 9z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         role="img" aria-label="Profile" tabindex="0"
         onclick="(() => {
           const username = localStorage.getItem('username');
           if (username) {
             window.location.href = \`/user.html?username=\${username}\`;
           } else {
             alert('You must be logged in to view your profile');
           }
         })()">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5
               2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3
               c0-3.3-6.7-5-10-5z"/>
    </svg>

    <!-- Dream uploading bar (hidden by default) -->
    <div id="dream-uploading-box" style="
        display: none;
        position: fixed;
        bottom: 70px; /* float above footer */
        left: 0;
        width: 100%;
        background-color: #1a1a1a;
        color: #fff;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        z-index: 1000;
        border-top: 1px solid #444;
    ">
      <div class="spinner" style="
          width: 20px;
          height: 20px;
          border: 3px solid #444;
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
      "></div>
      <span>Dream uploading...</span>
    </div>

    <style>
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    </style>
  `;
  return nav;
}

// Functions to show/hide the uploading bar
export function showDreamUploading() {
  const box = document.getElementById('dream-uploading-box');
  if (box) box.style.display = 'flex';
}

export function hideDreamUploading() {
  const box = document.getElementById('dream-uploading-box');
  if (box) box.style.display = 'none';
}
