async function loadAboutSections() {
  try {
    const response = await fetch('data/about-sections.json');
    const sections = await response.json();
    renderSections(sections);
  } catch (error) {
    console.error('Error loading about sections:', error);
  }
}

function renderSections(sections) {
  const main = document.querySelector('main.about');
  main.innerHTML = `
    <div class="about-header">
      <h1>About Feast Together</h1>
      <p>Your smart kitchen assistant for easy, fun, and sustainable cooking</p>
    </div>
  `;

  sections.forEach(section => {
    const sectionEl = document.createElement('section');
    sectionEl.classList.add('about-section');
    sectionEl.innerHTML = `<h2>${section.title}</h2>${section.content}`;
    main.appendChild(sectionEl);

    // Animations
    sectionEl.style.opacity = 0;
    sectionEl.style.transform = 'translateY(20px)';
    setTimeout(() => {
      sectionEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      sectionEl.style.opacity = 1;
      sectionEl.style.transform = 'translateY(0)';
    }, 50);
  });
}

document.addEventListener('DOMContentLoaded', loadAboutSections);
