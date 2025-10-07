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
    <div id="hamburger-menu" class="hamburger-menu" style="display: none;">
      <button id="auth-btn">Sign In</button>
    </div>
  `;
  return header;
}

// Initialize Firebase and handle auth state
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkI9Gnob-bIpZL0m6E8pf7lO8f7dlrYYg",
  authDomain: "stardriftr.firebaseapp.com",
  projectId: "stardriftr",
  storageBucket: "stardriftr.firebasestorage.app",
  messagingSenderId: "115649067004",
  appId: "1:115649067004:web:e24fdd5a8447f92f342479",
  measurementId: "G-Q62KZDRBWG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Needed global helpers
window.goHome = function () {
  window.location.href = "index.html";
};

window.toggleMenu = function () {
  const menu = document.getElementById('hamburger-menu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
};

// Handle authentication state and button behavior
document.addEventListener('DOMContentLoaded', () => {
  const authBtn = document.getElementById('auth-btn');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authBtn.textContent = 'Sign Out';
      authBtn.onclick = async () => {
        try {
          await signOut(auth);
          console.log("✅ User signed out");
          // Clear localStorage
          localStorage.removeItem('uid');
          localStorage.removeItem('username');
          localStorage.removeItem('display_name');
          // Optionally clear other items
          localStorage.removeItem('pendingDream');
          localStorage.removeItem('selectedDreamText');
          localStorage.removeItem('generateImage');
          // Close menu after sign-out
          document.getElementById('hamburger-menu').style.display = 'none';
        } catch (error) {
          console.error("❌ Sign-out error:", error);
          alert(`Sign-out error: ${error.message}`);
        }
      };
    } else {
      authBtn.textContent = 'Sign In';
      authBtn.onclick = () => {
        window.location.href = 'login.html';
        document.getElementById('hamburger-menu').style.display = 'none';
      };
    }
  });
});
