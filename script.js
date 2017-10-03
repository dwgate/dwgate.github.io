const sections = document.querySelectorAll('.page');
const maxDisplayIndex = sections.length - 1;
window.scrollY = 0;
// window.addEventListener('scroll', debounce(test, 700));
// on transitionend for scroll, then move scroll position. remove from inside event
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



/*projects*/
const thumbnailImg = document.querySelectorAll('.thumbnail-img img');
const projectDescriptions = Array.from(document.querySelectorAll('.project-descriptions')[0].children);
const projectInfoSections = document.querySelectorAll('.project-descriptions');

projectInfoSections.forEach(project => project.addEventListener('mouseleave', hideDescriptions));
thumbnailImg.forEach(nail => nail.addEventListener('mouseenter', hoverProject) );

function hoverProject() {
  const index = this.dataset.thumbnum;
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
  projectDescriptions.forEach(project => {
    project.classList.remove('project-info');
    project.classList.add('hide-info');
  });
}


const experienceItems = document.querySelectorAll('.work-item, .school-item');

experienceItems.forEach(logo => logo.addEventListener('mouseenter', function() {
  const currentHover = this.children[0].dataset.place;
  this.children[0].classList.remove('details');
  this.children[0].classList.add('hidden-details');

  // this.classList.add('grow');

  experienceItems.forEach((place) => {
    const icon = place.children[0];
    const worko = icon.dataset.place;
    const description = place.children[1];
    if (worko === currentHover) {
      place.children[1].classList.remove('hidden-details');
      place.children[1].classList.add('details');
    }
  });
}));

experienceItems.forEach(logo => logo.addEventListener('mouseleave', function() {
  const currentHover = this.children[0].dataset.place;
  this.children[0].classList.add('details');
  this.children[0].classList.remove('hidden-details');

  // this.classList.remove('grow');

  experienceItems.forEach((place) => {
    const icon = place.children[0];
    const worko = icon.dataset.place;
    const description = place.children[1];
    if (worko === currentHover) {
      place.children[1].classList.add('hidden-details');
      place.children[1].classList.remove('details');
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
