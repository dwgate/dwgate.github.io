
console.log('loaded');
const projects = document.querySelectorAll('.application-item');


projects.forEach(project => project.addEventListener('mouseenter', showProjectInfo));
projects.forEach(project => project.addEventListener('mouseleave', hideProjectInfo));


function showProjectInfo() {
  this.children[0].classList.add('hide-info');
  this.children[1].classList.remove('hide-info');
  this.children[1].classList.add('project-info');
}

function hideProjectInfo() {
  this.children[0].classList.remove('hide-info');
  this.children[1].classList.add('hide-info');
  this.children[1].classList.remove('project-info');
}