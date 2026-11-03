// ===== CHALLENGES.JS — Challenge filtering and data =====

document.addEventListener('DOMContentLoaded', () => {
  initChallengeTabs();
});

// ===== CHALLENGE DATA =====
const challengeData = [
  {
    id: 'html-easy',
    category: 'html',
    difficulty: 'easy',
    title: 'Registration Form Repair',
    description: 'A college registration website has an incorrectly structured form. Fix the HTML structure, input attributes, labels, and semantic elements.',
    points: 5,
    link: 'challenges/html-easy.html'
  },
  {
    id: 'html-moderate',
    category: 'html',
    difficulty: 'moderate',
    title: 'E-commerce Product Structure',
    description: 'An e-commerce product listing page has broken HTML elements. Fix nested elements, image paths, semantic structure, and product card markup.',
    points: 10,
    link: 'challenges/html-moderate.html'
  },
  {
    id: 'html-hard',
    category: 'html',
    difficulty: 'hard',
    title: 'College Portal Investigation',
    description: 'A college portal contains complex structural issues and hidden DOM clues. Use DevTools to investigate and fix the underlying markup.',
    points: 20,
    link: 'challenges/html-hard.html'
  },
  {
    id: 'css-easy',
    category: 'css',
    difficulty: 'easy',
    title: 'Broken Navigation Bar',
    description: 'A navigation bar has incorrect spacing, alignment, colors, and positioning. Fix the layout to match the reference design.',
    points: 5,
    link: 'challenges/css-easy.html'
  },
  {
    id: 'css-moderate',
    category: 'css',
    difficulty: 'moderate',
    title: 'Dashboard Layout Repair',
    description: 'A dashboard has broken Grid and Flexbox layouts. Fix the grid structure, card alignment, and responsive breakpoints.',
    points: 10,
    link: 'challenges/css-moderate.html'
  },
  {
    id: 'css-hard',
    category: 'css',
    difficulty: 'hard',
    title: 'The CSS Mystery',
    description: 'A complex landing page looks different at various screen sizes. Investigate CSS specificity, conflicting selectors, and computed styles.',
    points: 20,
    link: 'challenges/css-hard.html'
  },
  {
    id: 'js-easy',
    category: 'js',
    difficulty: 'easy',
    title: 'Interactive Counter',
    description: 'A webpage has an interactive counter with broken buttons. Fix event listeners, increment/decrement functionality, and DOM updates.',
    points: 5,
    link: 'challenges/js-easy.html'
  },
  {
    id: 'js-moderate',
    category: 'js',
    difficulty: 'moderate',
    title: 'Shopping Cart Repair',
    description: 'An e-commerce shopping cart has several functional bugs. Fix quantity updates, price calculations, and remove-item functionality.',
    points: 10,
    link: 'challenges/js-moderate.html'
  },
  {
    id: 'js-hard',
    category: 'js',
    difficulty: 'hard',
    title: 'The Broken Dashboard',
    description: 'An interactive dashboard contains complex runtime bugs. Investigate async updates, duplicate events, and race conditions.',
    points: 20,
    link: 'challenges/js-hard.html'
  }
];

// ===== CATEGORY LABELS =====
const categoryLabels = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript'
};

const difficultyLabels = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard'
};

// ===== TAB FILTERING =====
function initChallengeTabs() {
  const tabs = document.querySelectorAll('.tab[data-category]');
  const grid = document.querySelector('.challenges-grid');

  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      renderChallenges(category);
    });
  });

  // Initial render
  renderChallenges('all');
}

function renderChallenges(category) {
  const grid = document.querySelector('.challenges-grid');
  if (!grid) return;

  const filtered = category === 'all'
    ? challengeData
    : challengeData.filter(c => c.category === category);

  grid.innerHTML = filtered.map(challenge => createChallengeCard(challenge)).join('');

  // Animate cards in
  const cards = grid.querySelectorAll('.challenge-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 80);
  });
}

function createChallengeCard(challenge) {
  return `
    <div class="challenge-card category--${challenge.category}">
      <div class="challenge-card__header">
        <span class="challenge-card__category">&lt;${categoryLabels[challenge.category]}&gt;</span>
        <span class="badge badge--${challenge.difficulty}">${difficultyLabels[challenge.difficulty]}</span>
      </div>
      <div class="challenge-card__body">
        <h3 class="challenge-card__title">${challenge.title}</h3>
        <p class="challenge-card__desc">${challenge.description}</p>
        <div class="challenge-card__meta">
          <span class="challenge-card__meta-item">
            <span class="challenge-card__meta-icon">📂</span>
            ${categoryLabels[challenge.category]}
          </span>
          <span class="challenge-card__meta-item">
            <span class="challenge-card__meta-icon">⚡</span>
            ${difficultyLabels[challenge.difficulty]}
          </span>
          <span class="challenge-card__meta-item">
            <span class="challenge-card__meta-icon">🏆</span>
            ${challenge.points} pts
          </span>
        </div>
      </div>
      <div class="challenge-card__footer">
        <span class="challenge-card__points">${challenge.points} Points</span>
        <a href="${challenge.link}" class="challenge-card__btn">
          Open Challenge →
        </a>
      </div>
    </div>
  `;
}
