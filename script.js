    const emailInput   = document.getElementById('emailInput');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const privacyCheck = document.getElementById('privacyCheck');
    const underlineBar = document.getElementById('underlineBar');
    const successMsg   = document.getElementById('successMsg');

    const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    function updateState() {
      const ok = validEmail(emailInput.value) && privacyCheck.checked;
      subscribeBtn.disabled = !ok;
      subscribeBtn.classList.toggle('active', ok);
      underlineBar.classList.toggle('filling', ok);
    }

    emailInput.addEventListener('input', updateState);
    privacyCheck.addEventListener('change', updateState);

    subscribeBtn.addEventListener('click', () => {
      if (subscribeBtn.disabled) return;
      successMsg.classList.add('show');
      subscribeBtn.classList.remove('active');
      subscribeBtn.disabled = true;
      emailInput.disabled = true;
      privacyCheck.disabled = true;
      emailInput.value = '';
      underlineBar.classList.remove('filling');
    });

    /* ============================================================
       INFINITE CAROUSEL — rAF-driven, no CSS animation
       ============================================================ */
    (function () {
      const CARD_COUNT  = 8;      // how many unique numbers
      const CARD_WIDTH  = 160;    // px  (matches CSS flex-basis 10rem @ 16px)
      const GAP         = 20;     // px  (matches CSS gap 1.25rem @ 16px)
      const SPEED       = 0.6;    // px per frame (~36px/s at 60fps)

      const track = document.getElementById('carouselTrack');
      if (!track) return;

      // Build one set of cards
      function makeCards() {
        const frag = document.createDocumentFragment();
        for (let i = 1; i <= CARD_COUNT; i++) {
          const card = document.createElement('div');
          card.className = 'carousel-card';
          card.textContent = i;
          frag.appendChild(card);
        }
        return frag;
      }

      // Fill track with enough clones so it's always wider than the viewport
      // Strategy: 3 full sets → centre set scrolls, we reset when one set is consumed
      track.appendChild(makeCards());
      track.appendChild(makeCards());
      track.appendChild(makeCards());

      // Width of one full set (cards + gaps between them)
      const setWidth = CARD_COUNT * CARD_WIDTH + (CARD_COUNT - 1) * GAP + GAP; // +GAP for the gap after last card before next set

      let offset = 0;
      track.style.transform = `translateX(0px)`;

      function tick() {
        offset += SPEED;
        // Once we've scrolled exactly one set, snap back silently
        if (offset >= setWidth) {
          offset -= setWidth;
        }
        track.style.transform = `translateX(${-offset}px)`;
        requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    })();

// ---- Mobile nav overlay ----
const burgerBtn = document.getElementById('burgerBtn');
const navOverlay = document.getElementById('navOverlay');
const overlayClose = document.getElementById('overlayClose');

burgerBtn.addEventListener('click', () => {
  navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

overlayClose.addEventListener('click', closeOverlay);

// Close when tapping any overlay link
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeOverlay);
});

function closeOverlay() {
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}