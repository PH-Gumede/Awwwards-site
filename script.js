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