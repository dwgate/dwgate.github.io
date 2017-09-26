

const x = document.querySelector('.focus');
window.addEventListener('scroll', () => test());

let prevLocation = 0;
let displayIndex = 0;

function test() {
  console.log(window.scrollY);
  const me = document.getElementById('me');
  const apps = document.getElementById('applications');
  if (window.scrollY > prevLocation) {
    me.classList.remove('focus');
    me.classList.add('hide');

    apps.classList.remove('hide');
    apps.classList.add('focus');
  } else {
    apps.classList.remove('focus');
    apps.classList.add('hide');

    me.classList.remove('hide');
    me.classList.add('focus');
  }
  prevLocation = window.scrollY;
}