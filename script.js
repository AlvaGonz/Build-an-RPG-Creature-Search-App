// API Base URL
const API_BASE_URL = 'https://rpg-creature-api.freecodecamp.rocks/api';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

// State management
let isSearching = false;
let currentCreature = null;
let favorites = JSON.parse(localStorage.getItem('creatureFavorites') || '[]');
let comparisonList = [];

// Display Elements
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const typesContainer = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const favoriteBtn = document.getElementById('favorite-btn');
const compareBtn = document.getElementById('compare-btn');
const favoritesList = document.getElementById('favorites-list');
const comparisonModal = document.getElementById('comparison-modal');
const comparisonContainer = document.getElementById('comparison-container');
const toggleFavorites = document.getElementById('toggle-favorites');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const particleCanvas = document.getElementById('particle-canvas');
const creatureSvg = document.getElementById('creature-svg');
let particlesInitialized = false;

// Type color mapping
const typeColors = {
  fire: 'type-fire',
  water: 'type-water',
  electric: 'type-electric',
  grass: 'type-grass',
  ice: 'type-ice',
  ground: 'type-ground',
  bug: 'type-bug',
  psychic: 'type-psychic',
  fairy: 'type-fairy',
  dark: 'type-dark',
  rock: 'type-rock',
  flying: 'type-flying'
};

/**
 * Fetches creature data from the API
 * @param {string} searchTerm - Creature name or ID
 * @returns {Promise<Object>} Creature data
 */
async function fetchCreatureData(searchTerm) {
  try {
    const response = await fetch(`${API_BASE_URL}/creature/${searchTerm}`);
    
    if (!response.ok) {
      throw new Error('Creature not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Creature not found');
  }
}

/**
 * Displays creature data in the UI
 * @param {Object} creature - Creature data object
 */
function displayCreatureData(creature) {
  currentCreature = creature;
  
  // Display basic info
  creatureName.textContent = creature.name.toUpperCase();
  creatureId.textContent = `#${creature.id}`;
  weight.textContent = creature.weight;
  height.textContent = creature.height;
  
  // Draw Low Poly SVG creature
  drawLowPolyCreature(creature);
  
  // Display types
  typesContainer.innerHTML = '';
  creature.types.forEach(type => {
    const typeElement = document.createElement('span');
    typeElement.className = `type-badge ${typeColors[type.name] || 'type-fire'}`;
    typeElement.textContent = type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });
  
  // Display stats
  creature.stats.forEach(stat => {
    switch(stat.name) {
      case 'hp':
        hp.textContent = stat.base_stat;
        break;
      case 'attack':
        attack.textContent = stat.base_stat;
        break;
      case 'defense':
        defense.textContent = stat.base_stat;
        break;
      case 'special-attack':
        specialAttack.textContent = stat.base_stat;
        break;
      case 'special-defense':
        specialDefense.textContent = stat.base_stat;
        break;
      case 'speed':
        speed.textContent = stat.base_stat;
        break;
    }
  });
  
  // Update favorite button
  updateFavoriteButton();
  
  // Show results container
  resultsContainer.classList.remove('hidden');
  
  // Trigger particles once
  if (!particlesInitialized) {
    createParticles();
    particlesInitialized = true;
  }
}

/**
 * Handles search functionality
 */
async function handleSearch() {
  const searchTerm = searchInput.value.trim();
  
  // Prevent empty searches
  if (!searchTerm) {
    return;
  }
  
  // Prevent multiple simultaneous searches
  if (isSearching) {
    return;
  }
  
  isSearching = true;
  searchButton.disabled = true;
  searchButton.textContent = 'Searching...';
  
  try {
    const creatureData = await fetchCreatureData(searchTerm);
    displayCreatureData(creatureData);
  } catch (error) {
    alert('Creature not found');
    resultsContainer.classList.add('hidden');
  } finally {
    isSearching = false;
    searchButton.disabled = false;
    searchButton.textContent = 'Search';
  }
}

/**
 * Draws a Low Poly creature representation based on creature type
 * @param {Object} creature - Creature data
 */
function drawLowPolyCreature(creature) {
  creatureSvg.innerHTML = '';
  const primaryType = creature.types[0].name;
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  
  // Gradient for the creature
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', 'creatureGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '100%');
  gradient.setAttribute('y2', '100%');
  
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', getTypeColor(primaryType, 1));
  gradient.appendChild(stop1);
  
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', getTypeColor(primaryType, 0.6));
  gradient.appendChild(stop2);
  
  svgDefs.appendChild(gradient);
  creatureSvg.appendChild(svgDefs);
  
  // Create main body polygon
  const bodyPoints = generatePolygonPoints(8, 80, 100, 100, 70, 50);
  const body = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  body.setAttribute('points', bodyPoints);
  body.setAttribute('fill', 'url(#creatureGradient)');
  body.setAttribute('stroke', getTypeColor(primaryType, 1));
  body.setAttribute('stroke-width', '2');
  creatureSvg.appendChild(body);
  
  // Add details based on type
  if (creature.types.length > 1) {
    const secondaryGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    secondaryGradient.setAttribute('id', 'secondaryGradient');
    const secStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    secStop1.setAttribute('offset', '0%');
    secStop1.setAttribute('stop-color', getTypeColor(creature.types[1].name, 1));
    secondaryGradient.appendChild(secStop1);
    const secStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    secStop2.setAttribute('offset', '100%');
    secStop2.setAttribute('stop-color', getTypeColor(creature.types[1].name, 0.6));
    secondaryGradient.appendChild(secStop2);
    svgDefs.appendChild(secondaryGradient);
    
    const detail = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    detail.setAttribute('points', generatePolygonPoints(6, 20, 120, 80, 15, 8));
    detail.setAttribute('fill', 'url(#secondaryGradient)');
    detail.setAttribute('stroke', getTypeColor(creature.types[1].name, 1));
    detail.setAttribute('stroke-width', '1');
    creatureSvg.appendChild(detail);
  }
}

/**
 * Gets color for a type
 */
function getTypeColor(type, alpha = 1) {
  const colors = {
    fire: { r: 249, g: 115, b: 22 },
    water: { r: 14, g: 165, b: 233 },
    electric: { r: 234, g: 179, b: 8 },
    grass: { r: 34, g: 197, b: 94 },
    ice: { r: 6, g: 182, b: 212 },
    ground: { r: 161, g: 98, b: 7 },
    bug: { r: 132, g: 204, b: 22 },
    psychic: { r: 236, g: 72, b: 153 },
    fairy: { r: 244, g: 114, b: 182 },
    dark: { r: 71, g: 85, b: 105 },
    rock: { r: 120, g: 113, b: 108 },
    flying: { r: 129, g: 140, b: 248 }
  };
  const c = colors[type] || colors.fire;
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

/**
 * Generates polygon points for Low Poly effect
 */
function generatePolygonPoints(sides, size, cx, cy, baseSize, variation) {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides;
    const radius = baseSize + (Math.random() * variation);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

/**
 * Creates particle effects on canvas
 */
function createParticles() {
  if (!particleCanvas) return;
  
  const ctx = particleCanvas.getContext('2d');
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 125, 189, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/**
 * Updates favorite button state
 */
function updateFavoriteButton() {
  if (!currentCreature) return;
  const isFavorited = favorites.some(f => f.id === currentCreature.id);
  favoriteBtn.classList.toggle('active', isFavorited);
  const heartIcon = favoriteBtn.querySelector('.heart-icon');
  heartIcon.textContent = isFavorited ? '❤️' : '🤍';
}

/**
 * Toggles favorite status
 */
function toggleFavorite() {
  if (!currentCreature) return;
  const index = favorites.findIndex(f => f.id === currentCreature.id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push({ id: currentCreature.id, name: currentCreature.name });
  }
  localStorage.setItem('creatureFavorites', JSON.stringify(favorites));
  updateFavoriteButton();
  renderFavorites();
}

/**
 * Adds creature to comparison or opens comparison modal
 */
function addToComparison() {
  if (!currentCreature) {
    // If no creature shown, just open the modal if there are creatures in comparison
    if (comparisonList.length > 0) {
      comparisonModal.classList.remove('hidden');
    }
    return;
  }
  
  // Check if creature is already in comparison
  const existingIndex = comparisonList.findIndex(c => c.id === currentCreature.id);
  
  if (existingIndex !== -1) {
    // Creature already in comparison, just open the modal
    comparisonModal.classList.remove('hidden');
    return;
  }
  
  // Add creature if there's space
  if (comparisonList.length >= 3) {
    alert('Maximum 3 creatures for comparison. Remove one to add another.');
    comparisonModal.classList.remove('hidden');
    return;
  }
  
  comparisonList.push(currentCreature);
  renderComparison();
  comparisonModal.classList.remove('hidden');
  updateCompareButton();
}

/**
 * Updates the compare button text based on list state
 */
function updateCompareButton() {
  if (comparisonList.length > 0) {
    compareBtn.textContent = `⚖️ Compare (${comparisonList.length}/3)`;
    if (comparisonList.length === 3) {
      compareBtn.classList.add('full');
      compareBtn.title = 'View comparison (full)';
    } else {
      compareBtn.classList.remove('full');
      compareBtn.title = `Add to comparison (${comparisonList.length}/3)`;
    }
  } else {
    compareBtn.textContent = '⚖️ Compare';
    compareBtn.classList.remove('full');
    compareBtn.title = 'Add to Comparison';
  }
}

/**
 * Renders favorites list
 */
function renderFavorites() {
  favoritesList.innerHTML = '';
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No favorites yet</p>';
    return;
  }
  favorites.forEach(creature => {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.innerHTML = `
      <span class="favorite-item-name">${creature.name}</span>
      <button class="favorite-item-remove" onclick="removeFavorite(${creature.id})">✕</button>
    `;
    item.addEventListener('click', () => searchForCreature(creature.id));
    favoritesList.appendChild(item);
  });
}

/**
 * Removes favorite
 */
function removeFavorite(id) {
  favorites = favorites.filter(f => f.id !== id);
  localStorage.setItem('creatureFavorites', JSON.stringify(favorites));
  renderFavorites();
  updateFavoriteButton();
}

/**
 * Searches for a creature by ID
 */
async function searchForCreature(id) {
  searchInput.value = id;
  await handleSearch();
}

/**
 * Renders comparison view
 */
function renderComparison() {
  comparisonContainer.innerHTML = '';
  
  if (comparisonList.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.gridColumn = '1 / -1';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = 'var(--text-secondary)';
    emptyMsg.style.padding = '40px';
    emptyMsg.style.fontSize = '1.2rem';
    emptyMsg.innerHTML = '🔍 No creatures selected for comparison';
    comparisonContainer.appendChild(emptyMsg);
    return;
  }
  
  comparisonList.forEach((creature, index) => {
    const card = document.createElement('div');
    card.className = 'comparison-creature';
    const totalStats = creature.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    
    // Get stats in order
    const hpStat = creature.stats.find(s => s.name === 'hp')?.base_stat || 0;
    const atkStat = creature.stats.find(s => s.name === 'attack')?.base_stat || 0;
    const defStat = creature.stats.find(s => s.name === 'defense')?.base_stat || 0;
    const spAtkStat = creature.stats.find(s => s.name === 'special-attack')?.base_stat || 0;
    const spDefStat = creature.stats.find(s => s.name === 'special-defense')?.base_stat || 0;
    const spdStat = creature.stats.find(s => s.name === 'speed')?.base_stat || 0;
    
    card.innerHTML = `
      <h3>${creature.name}</h3>
      <button class="remove-comparison" onclick="removeFromComparison(${index})" title="Remove from comparison">✕</button>
      <p><strong>Total:</strong> ${totalStats}</p>
      <p><strong>Weight:</strong> ${creature.weight}</p>
      <p><strong>Height:</strong> ${creature.height}</p>
      <p><strong>Types:</strong> ${creature.types.map(t => t.name).join(', ')}</p>
      <div class="comparison-stats">
        <p><span class="stat-icon-small">❤️</span> HP: ${hpStat}</p>
        <p><span class="stat-icon-small">⚔️</span> Attack: ${atkStat}</p>
        <p><span class="stat-icon-small">🛡️</span> Defense: ${defStat}</p>
        <p><span class="stat-icon-small">🔥</span> Sp.Attack: ${spAtkStat}</p>
        <p><span class="stat-icon-small">✨</span> Sp.Defense: ${spDefStat}</p>
        <p><span class="stat-icon-small">💨</span> Speed: ${spdStat}</p>
      </div>
    `;
    comparisonContainer.appendChild(card);
  });
}

/**
 * Removes a creature from comparison by index
 */
function removeFromComparison(index) {
  comparisonList.splice(index, 1);
  renderComparison();
  updateCompareButton();
  if (comparisonList.length === 0) {
    comparisonModal.classList.add('hidden');
  }
}

/**
 * Clears comparison list
 */
function clearComparison() {
  comparisonList = [];
  renderComparison();
  comparisonModal.classList.add('hidden');
  updateCompareButton();
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

favoriteBtn.addEventListener('click', toggleFavorite);
compareBtn.addEventListener('click', addToComparison);

// Toggle sidebar from both buttons
function toggleSidebar() {
  const sidebar = document.querySelector('.favorites-sidebar');
  sidebar.classList.toggle('collapsed');
  const innerToggle = document.getElementById('toggle-favorites');
  innerToggle.textContent = sidebar.classList.contains('collapsed') ? '▲' : '▼';
}

toggleFavorites.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSidebar();
});

sidebarToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSidebar();
});
document.querySelector('.close-modal').addEventListener('click', () => {
  comparisonModal.classList.add('hidden');
});
document.getElementById('clear-comparison').addEventListener('click', clearComparison);

// Close modal when clicking outside
comparisonModal.addEventListener('click', (e) => {
  if (e.target === comparisonModal) {
    comparisonModal.classList.add('hidden');
  }
});

// Prevent modal from closing when clicking inside modal-content
document.querySelector('.modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Initialize
renderFavorites();
createParticles();
updateCompareButton();
