const maxDisplayIndex = document.querySelectorAll('.content').length - 1;
const sections = document.querySelectorAll('.content');
window.scrollY = 0;
// window.addEventListener('scroll', debounce(test, 700));

let prevLocation = window.pageYOffset || document.documentElement.scrollTop;
let displayIndex = 0;
var previousPosition = window.pageYOffset || document.documentElement.scrollTop;

setTimeout(() => debounce(
  window.onscroll = function() {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (previousPosition > currentPosition) {
      adjustContent(true);
    } else {
      adjustContent(false);
    }
    previousPosition = currentPosition;
    setTimeout(() => window.scrollTo(0, 1), 35);
  })
, 600);

const adjustContent = debounce(function(direction) {
  if (direction) {
    displayIndex--;
    if (displayIndex < 0) { displayIndex = 0; }
  } else {
    displayIndex++;
    if (displayIndex > maxDisplayIndex) { displayIndex--; }
  }

  Array.from(sections).forEach((section, i) => {
    if (i === displayIndex) {
      section.classList.add('focus');
      section.classList.remove('hide');
    } else {
      section.classList.add('hide');
      section.classList.remove('focus');
    }
  });
}, 400);






function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function test(e) {
  // const currentLocation = window.pageYOffset || document.documentElement.scrollTop;

  // if (currentLocation >= prevLocation) {
  //   displayIndex++;
  //   if (displayIndex < 0) { displayIndex = 0; }
  // } else {
  //   displayIndex--;
  //   if (displayIndex > maxDisplayIndex) { displayIndex--; }
  // }

  // Array.from(sections).forEach((section, i) => {
  //   if (i === displayIndex) {
  //     section.classList.add('focus');
  //     section.classList.remove('hide');
  //   } else {
  //     section.classList.add('hide');
  //     section.classList.remove('focus');
  //   }
  // });

  // prevLocation = currentLocation;
  // const visible = document.querySelector('.focus');

  // window.scrollTo(0, 2);
// }


  // const me = document.getElementById('me');
  // const apps = document.getElementById('applications');
  // if (window.scrollY > prevLocation) {
  //   me.classList.remove('focus');
  //   me.classList.add('hide');

  //   apps.classList.remove('hide');
  //   apps.classList.add('focus');
  // } else {
  //   apps.classList.remove('focus');
  //   apps.classList.add('hide');

  //   me.classList.remove('hide');
  //   me.classList.add('focus');
  // }
  // prevLocation = window.scrollY;