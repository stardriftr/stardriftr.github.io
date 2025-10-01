// dreamCard.js
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
      if (uid && uid === d.uid) {
        buttonsHtml += `<button style="padding:10px 16px; font-size:16px; cursor:pointer; margin-top:8px;" onclick="deleteDream('${d.dream_id}')">Delete Post</button>`;
      }

      popup.innerHTML = `<div class="modal-content"><div class="close-btn">&times;</div>${buttonsHtml}</div>`;
      popup.style.display = 'flex';
      popup.querySelector('.close-btn').addEventListener('click', () => popup.style.display = 'none');
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
