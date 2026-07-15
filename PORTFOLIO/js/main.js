document.getElementById('emailBtn').addEventListener('click', function (e) {
  e.preventDefault();

  const email = 'haidukm95@gmail.com';
  let mailClientOpened = false;

  window.addEventListener('blur', function onBlur() {
    mailClientOpened = true;
    window.removeEventListener('blur', onBlur);
  });

  window.location.href = 'mailto:' + email;

  setTimeout(function () {
    if (!mailClientOpened) {
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email, '_blank');
    }
  }, 500);
});
