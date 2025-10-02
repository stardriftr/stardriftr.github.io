// notification.js

// Create the notification container (floating box)
const notificationBox = document.createElement('div');
notificationBox.id = 'notification-box';
notificationBox.style.cssText = `
  display: none; /* hidden by default */
  position: fixed;
  bottom: 70px; /* default above footer */
  left: 50%;
  transform: translateX(-50%);
  max-width: 400px;
  background-color: #1a1a1a;
  color: #fff;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  z-index: 1000;
  border-radius: 6px;
  border: 1px solid #444;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
`;
notificationBox.innerHTML = `
  <div class="spinner" style="
      width: 20px;
      height: 20px;
      border: 3px solid #444;
      border-top: 3px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
  "></div>
  <span id="notification-text"></span>
`;
document.body.appendChild(notificationBox);

// Spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`;
document.head.appendChild(style);

// Show function
export function showNotification(text, options = {}) {
  const { duration = null, bottom = 70, showSpinner = true } = options;
  const spinner = notificationBox.querySelector('.spinner');
  const textSpan = notificationBox.querySelector('#notification-text');

  // Only update if text exists
  if (!text) return;

  textSpan.textContent = text;
  spinner.style.display = showSpinner ? 'block' : 'none';
  notificationBox.style.bottom = `${bottom}px`;
  notificationBox.style.display = 'flex';

  if (duration) {
    setTimeout(() => hideNotification(), duration);
  }
}

// Hide function
export function hideNotification() {
  notificationBox.style.display = 'none';
}
