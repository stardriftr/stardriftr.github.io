// dreamCard.js

// Global dream categories definition
const DREAM_CATEGORIES = [
    { "emoji": "😱", "name": "Nightmare", "background": "#a76f7f", "stroke": "#6b3b42" },
    { "emoji": "😰", "name": "Anxiety", "background": "#ff8c61", "stroke": "#7f4425" },
    { "emoji": "🕵️", "name": "Mystery", "background": "#4f6666", "stroke": "#2b3737" },
    { "emoji": "🌀", "name": "Surreal", "background": "#8a7acc", "stroke": "#483d66" },
    { "emoji": "🌌", "name": "Lucid", "background": "#4fa3ff", "stroke": "#1f487f" },
    { "emoji": "🔁", "name": "Recurring", "background": "#a0a0a0", "stroke": "#505050" },
    { "emoji": "🏃‍♂️", "name": "Escape", "background": "#7ed77e", "stroke": "#196619" },
    { "emoji": "⬇️", "name": "Falling", "background": "#7fa3c4", "stroke": "#23415a" },
    { "emoji": "🕊️", "name": "Flying", "background": "#a0dfff", "stroke": "#438777" },
    { "emoji": "⚰️", "name": "Death", "background": "#2c2c2c", "stroke": "#000000" },
    { "emoji": "👼", "name": "Afterlife", "background": "#fff8b3", "stroke": "#bfff66" },
    { "emoji": "🦋", "name": "Transformation", "background": "#ff9cc9", "stroke": "#7f5a7a" },
    { "emoji": "🌊", "name": "Disaster", "background": "#3b3b7f", "stroke": "#000045" },
    { "emoji": "🌋", "name": "Apocalypse", "background": "#ff7f7f", "stroke": "#7f0000" },
    { "emoji": "🗺️", "name": "Adventure", "background": "#ffe066", "stroke": "#7f6b00" },
    { "emoji": "❤️", "name": "Romantic", "background": "#ff66aa", "stroke": "#7f0a49" },
    { "emoji": "👨‍👩‍👧‍👦", "name": "Family", "background": "#ffad66", "stroke": "#7f4600" },
    { "emoji": "🗣️", "name": "Social", "background": "#66c0b0", "stroke": "#105955" },
    { "emoji": "⚔️", "name": "Violence", "background": "#bb6b6b", "stroke": "#521515" },
    { "emoji": "🌟", "name": "Celebrity", "background": "#ffe066", "stroke": "#7f6b00" },
    { "emoji": "💼", "name": "Work", "background": "#87909c", "stroke": "#384848" },
    { "emoji": "🎓", "name": "School", "background": "#6b85ff", "stroke": "#203484" },
    { "emoji": "✈️", "name": "Travel", "background": "#66c0ff", "stroke": "#005f7f" },
    { "emoji": "🧭", "name": "Lost", "background": "#8a8a8a", "stroke": "#343434" },
    { "emoji": "🏠", "name": "Home", "background": "#a36b3b", "stroke": "#462208" },
    { "emoji": "🧸", "name": "Childhood", "background": "#ffc2d1", "stroke": "#7f5b60" },
    { "emoji": "🧠", "name": "Memory", "background": "#b49dff", "stroke": "#4b385d" },
    { "emoji": "🐾", "name": "Animals", "background": "#66aa66", "stroke": "#114411" },
    { "emoji": "🌳", "name": "Nature", "background": "#4fa377", "stroke": "#17442b" },
    { "emoji": "🌍", "name": "Elements", "background": "#66e0e0", "stroke": "#006e6e" },
    { "emoji": "💸", "name": "Money", "background": "#7ed77e", "stroke": "#196619" },
    { "emoji": "💎", "name": "Wealth", "background": "#66d9d9", "stroke": "#207060" },
    { "emoji": "🏆", "name": "Success", "background": "#ffe066", "stroke": "#7f6b00" },
    { "emoji": "📉", "name": "Failure", "background": "#bb6666", "stroke": "#591111" }
];

export function createDreamCard(d, index) {
  const currentUid = localStorage.getItem('uid');
  const fallbackAnon = i => 'Anon-' + String(1000 + i);

  const randomEmoji = () => {
    const emojis = ['😴', '🌌', '👁️', '🌀', '🌙', '🛌'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  if (!d || !d.original) return null;

  const div = document.createElement('div');
  div.className = 'dream';

  const name = d.display_name?.trim() || fallbackAnon(index);
  const fullText = d.original;
  const isTruncated = fullText.length > 200;
  const displayText = isTruncated ? fullText.slice(0, 200) + '...' : fullText;
  const hasLiked = d.likes?.includes(currentUid) || false;
  const likeCount = d.likes?.length || 0;

  // Build card HTML
  div.innerHTML = `
    <div class="meta" style="display:flex; justify-content:space-between; align-items:center;">
      <span>
        <span class="emoji">${randomEmoji()}</span> 
        <a href="/user.html?username=${d.username}" class="username" style="color:inherit; text-decoration:none; font-weight:bold; cursor:pointer;">
          ${name}
        </a>
      </span>

      <span style="display:flex; align-items:center; gap:8px;">
        <span>${new Date(Number(d.time)).toLocaleString()}</span>
        <svg class="options-btn" viewBox="0 0 24 24" style="width:20px;height:20px;cursor:pointer;">
          <circle cx="5" cy="12" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="19" cy="12" r="2"/>
        </svg>
      </span>
    </div>

    <div class="image-container">
      ${ d.image ? `<div class="shimmer-box" style="width:100%; height:460px; border-radius:6px;"></div>` : '' }
    </div>

    <div class="body">
      ${displayText}
      ${ isTruncated ? `<div class="expand-link" style="color:#5492a5; cursor:pointer; font-weight:bold; text-decoration:none; margin-top:4px;">Expand full dream</div>` : '' }
    </div>

    <div class="actions" style="display:flex; align-items:center; gap:12px;">
      <div style="display:flex; align-items:center; gap:4px; cursor:pointer;">
        <svg class="like-icon" data-dream-id="${d.dream_id}" data-liked="${hasLiked}" viewBox="0 0 24 24" style="fill:${hasLiked ? 'red' : 'none'}; stroke:${hasLiked ? 'red' : '#999'}; stroke-width:2;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74
                   C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span class="like-count">${likeCount > 0 ? likeCount : ''}</span>
      </div>

      <div style="display:flex; align-items:center; gap:4px; cursor:pointer;" onclick="window.location.href='dream.html?id=${d.dream_id}'">
        <svg viewBox="0 0 24 24" style="stroke:#999; fill:none;">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
        </svg>
        <span class="comment-count">${d.comment_count > 0 ? d.comment_count : ''}</span>
      </div>
    </div>
  `;

  // Load image
  if (d.image) {
    const container = div.querySelector('.image-container');
    const img = new Image();
    img.src = d.image;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '6px';
    img.onload = () => {
      container.innerHTML = '';
      container.appendChild(img);
    };
  }

  // --- CATEGORY BADGES ---
  const badgeContainer = document.createElement('div');
  badgeContainer.className = 'badge-container';
  badgeContainer.style.display = 'flex';
  badgeContainer.style.flexWrap = 'wrap';
  badgeContainer.style.gap = '4px';

  if (Array.isArray(d.categories)) {
    d.categories.forEach(catName => {
      const cat = DREAM_CATEGORIES.find(c => c.name === catName);
      if (cat) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = `${cat.emoji} ${cat.name}`;
        badge.style.backgroundColor = cat.background; // ✅ fixed
        badge.style.border = `1px solid ${cat.stroke}`;
        badgeContainer.appendChild(badge);
      }
    });
  }

  const imageContainer = div.querySelector('.image-container');
  imageContainer.insertAdjacentElement('afterend', badgeContainer);

  // Expand/collapse dream text
  if (isTruncated) {
    const expandLink = div.querySelector('.expand-link');
    expandLink.addEventListener('click', () => {
      const bodyDiv = expandLink.parentElement;
      if (expandLink.textContent === 'Expand full dream') {
        bodyDiv.innerHTML = fullText + `<div class="expand-link" style="color:#5492a5; cursor:pointer; font-weight:bold; text-decoration:none; margin-top:4px;">Hide full dream</div>`;
        bodyDiv.querySelector('.expand-link').addEventListener('click', () => {
          bodyDiv.innerHTML = displayText + `<div class="expand-link" style="color:#5492a5; cursor:pointer; font-weight:bold; text-decoration:none; margin-top:4px;">Expand full dream</div>`;
          bodyDiv.querySelector('.expand-link').addEventListener('click', arguments.callee);
        });
      }
    });
  }

  // Options button popup
    const optionsBtn = div.querySelector('.options-btn');
    if (optionsBtn) {
      optionsBtn.addEventListener('click', () => {
        const popup = document.getElementById('popup');
        const uid = localStorage.getItem('uid');
    
        let buttonsHtml = `<button style="padding:10px 16px; font-size:16px; cursor:pointer;">Report Post</button>`;
    
        popup.innerHTML = `<div class="modal-content"><div class="close-btn">&times;</div>${buttonsHtml}</div>`;
        popup.style.display = 'flex';
    
        // Close button
        popup.querySelector('.close-btn').addEventListener('click', () => popup.style.display = 'none');
    
        // Add delete button if owner
        if (uid && uid === d.uid) {
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = "Delete Post";
          deleteBtn.style.cssText = "padding:10px 16px; font-size:16px; cursor:pointer; margin-top:8px;";
          popup.querySelector('.modal-content').appendChild(deleteBtn);
    
          deleteBtn.addEventListener('click', async () => {
            if (!confirm("Are you sure you want to delete this dream?")) return;
    
            try {
              const res = await fetch(`https://stardriftr-api.calembeaz.workers.dev/dreams/${d.dream_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid })
              });
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              alert("Dream deleted!");
              popup.style.display = 'none';
              div.remove(); // remove the card immediately from timeline
            } catch (err) {
              console.error("Failed to delete dream:", err);
              alert("Failed to delete dream");
            }
          });
        }
      });
    }


  // Like button
  const likeIcon = div.querySelector('.like-icon');
  const likeCountSpan = div.querySelector('.like-count');
  likeIcon.addEventListener('click', async () => {
    const dreamId = likeIcon.dataset.dreamId;
    const uid = currentUid;
    if (!uid) return alert("You must be logged in to like");

    const isLiked = likeIcon.dataset.liked === 'true';
    likeIcon.dataset.liked = (!isLiked).toString();
    likeIcon.style.fill = !isLiked ? 'red' : 'none';
    likeIcon.style.stroke = !isLiked ? 'red' : '#999';
    likeCountSpan.textContent = !isLiked ? (likeCount + 1) : (likeCount - 1 || '');

    const endpoint = isLiked ? 'unlike' : 'like';
    try {
      await fetch(`https://stardriftr-api.calembeaz.workers.dev/dreams/${dreamId}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid })
      });
    } catch (err) {
      console.error(err);
      alert(`Failed to ${endpoint} dream`);
      likeIcon.dataset.liked = isLiked.toString();
      likeIcon.style.fill = isLiked ? 'red' : 'none';
      likeIcon.style.stroke = isLiked ? 'red' : '#999';
      likeCountSpan.textContent = likeCount > 0 ? likeCount : '';
    }
  });

  return div;
}


