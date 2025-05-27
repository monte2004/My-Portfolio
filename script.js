// Navigation Functions
function showSection(sectionId) {
  // Hide all content sections and projects
  document.querySelectorAll('.content-section, .project-content, #about-container').forEach(element => {
    element.classList.remove('active');
  });

  // Update menu bar active state
  document.querySelectorAll('.menu-bar a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(sectionId)) {
      link.classList.add('active');
    }
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.scrollTop = 0;
  }
}

function loadAboutPage() {
  // Hide all content sections and projects
  document.querySelectorAll('.content-section, .project-content').forEach(element => {
    element.classList.remove('active');
  });

  // Update menu bar active state
  document.querySelectorAll('.menu-bar a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes('loadAboutPage')) {
      link.classList.add('active');
    }
  });

  // Create or show the about iframe container
  let aboutContainer = document.getElementById('about-container');
  if (!aboutContainer) {
    aboutContainer = document.createElement('div');
    aboutContainer.id = 'about-container';
    aboutContainer.className = 'project-content active';
    aboutContainer.innerHTML = `
      <h2>About Me</h2>
      <div class="project-item">
        <iframe src="about/index.html"></iframe>
      </div>
      <button class="back-button" onclick="goBack()">Back</button>
    `;
    document.querySelector('.screen').appendChild(aboutContainer);
  } else {
    aboutContainer.classList.add('active');
  }
  
  // Scroll to top
  aboutContainer.scrollTop = 0;
}

function showProject(projectId) {
  // Hide all sections
  document.querySelectorAll('.content-section, #about-container').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected project content
  const projectContent = document.getElementById(projectId);
  if (projectContent) {
    projectContent.classList.add('active');
    
    // Load content into iframe
    const iframe = projectContent.querySelector('iframe');
    if (iframe) {
      const contentPath = projectContent.getAttribute('data-content');
      if (contentPath && iframe.src !== contentPath) {
        iframe.src = contentPath;
      }
    }
    
    // Scroll to top of the project content
    projectContent.scrollTop = 0;
  }
}

function goBack() {
  // Hide all project content sections and about container
  document.querySelectorAll('.project-content, #about-container').forEach(element => {
    element.classList.remove('active');
    // Reset iframes when going back
    const iframe = element.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src; // This refreshes the iframe
    }
  });
  
  // Show the active section
  const activeLink = document.querySelector('.menu-bar a.active');
  if (activeLink) {
    const onclickAttr = activeLink.getAttribute('onclick');
    if (onclickAttr) {
      if (onclickAttr.includes('showSection')) {
        const sectionId = onclickAttr.match(/'([^']+)'/)[1];
        showSection(sectionId);
      } else if (onclickAttr.includes('loadAboutPage')) {
        loadAboutPage();
      }
    }
  } else {
    // Default to home if no active link found
    showSection('home');
  }
}

// Initialize default view
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});