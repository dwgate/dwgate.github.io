/*scrolling*/
const sections = document.querySelectorAll('.page');
const maxDisplayIndex = sections.length - 1;
window.scrollY = 0;
let prevLocation = window.pageYOffset || document.documentElement.scrollTop;
let displayIndex = 0;
var previousPosition = window.pageYOffset || document.documentElement.scrollTop;

setTimeout(() => debounce(
  window.onscroll = function(e) {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (previousPosition > currentPosition) {
      adjustContent(true);
    } else {
      adjustContent(false);
    }
    previousPosition = currentPosition;
    setTimeout(() => window.scrollTo(0, 1), 35);
  })
, 100);

const adjustContent = debounce(function focusSection(direction) {
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



/*
.sliding-middle-out {
  display: inline-block;
  position: relative;
  padding-bottom: 3px;
}
.sliding-middle-out:after {
  content: '';
  display: block;
  margin: auto;
  height: 3px;
  width: 0px;
  background: transparent;
  transition: width .5s ease, background-color .5s ease;
}
.sliding-middle-out:hover:after {
  width: 100%;
  background: blue;
}
*/

/*projects*/
const thumbnailImg = document.querySelectorAll('.thumbnail-img img');
const projectDescriptions = Array.from(document.querySelectorAll('.project-descriptions')[0].children);
const projectInfoSections = document.querySelectorAll('.project-descriptions');

projectInfoSections.forEach(project => project.addEventListener('mouseleave', hideDescriptions));
thumbnailImg.forEach(nail => nail.addEventListener('mouseenter', hoverProject) );

function hoverProject() {
  const index = this.dataset.thumbnum;
  thumbnailImg.forEach((img, i) => {
    img.style.opacity = (i === index) ? 1.0 : 0.65;
    img.parentElement.style.borderBottom = (i === index) ? '1px solid #87A09D' : 'none';
  });

  this.style.opacity = 1.0;
  this.parentElement.style.borderBottom = '1px solid #87A09D';


  projectDescriptions.forEach((project, i) => {
    if (project.dataset.pnum === index) {
      project.classList.remove('hide-info');
      project.classList.add('project-info');
    } else {
      project.classList.add('hide-info');
      project.classList.remove('project-info');
    }
  });
}

function hideDescriptions() {
  thumbnailImg.forEach(img => {
    img.style.opacity = 0.65;
    img.parentElement.style.borderBottom = 'none';
  });

  projectDescriptions.forEach(project => {
    project.classList.remove('project-info');
    project.classList.add('hide-info');
  });
}


const experienceItems = document.querySelectorAll('.work-item, .school-item');

experienceItems.forEach(logo => logo.addEventListener('mouseenter', function() {
  const currentHover = this.children[0].dataset.place;
  this.children[0].classList.add('hidden-details');

  experienceItems.forEach((place) => {
    const icon = place.children[0];
    const worko = icon.dataset.place;
    const description = place.children[1];
    if (worko === currentHover) {
      place.children[1].classList.remove('hidden-details');
    }
  });
}));

experienceItems.forEach(logo => logo.addEventListener('mouseleave', function() {
  const currentHover = this.children[0].dataset.place;
  this.children[0].classList.remove('hidden-details');

  experienceItems.forEach((place) => {
    const icon = place.children[0];
    const worko = icon.dataset.place;
    const description = place.children[1];
    if (worko === currentHover) {
      place.children[1].classList.add('hidden-details');
    }
  });
}));

const skills = document.querySelectorAll('.skills > span');
skills.forEach(skill => skill.addEventListener('mouseenter', expandSkill, true));
skills.forEach(skill => skill.addEventListener('mouseleave', shrinkSkill, true));


function expandSkill() {
  this.style.transform = 'scale(1.2, 1.2)';
}
function shrinkSkill() {
  this.style.transform = 'scale(1, 1)';
}






/*nav menu*/
const nav = document.querySelector('.nav');
document.addEventListener('scroll', toggleNav);

function toggleNav() {
  if (displayIndex > 1) { return; }

  const navWidth = window.getComputedStyle(nav).width;
  const position = `calc(${window.innerWidth}px ${displayIndex === 0 ? '+' : '-'} ${navWidth})`;
  nav.style.left = position;

  if (displayIndex === 1) {
    setTimeout(() => nav.style.color = '#87A09D', 750);
  } else {
    nav.style.color = 'white';
  }
}


const navMenu = document.querySelectorAll('li');
navMenu.forEach(location => location.addEventListener('click', navigate));

function navigate() {
  const page = +this.dataset.page;
  displayIndex = page;

  Array.from(sections).forEach((section, i) => {
    if (i === displayIndex) {
      section.classList.add('focus');
      section.classList.remove('hide');
    } else {
      section.classList.add('hide');
      section.classList.remove('focus');
    }
  });
  toggleNav();
}









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
