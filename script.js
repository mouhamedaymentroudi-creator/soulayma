// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const welcomeSection = document.getElementById('welcome');
const mainContent = document.getElementById('main-content');

// ===== FONCTION DE DÉMARRAGE =====
function startExploring() {
    // Animation de transition vers le contenu principal
    welcomeSection.style.transform = 'translateY(-100%)';
    welcomeSection.style.transition = 'transform 0.8s ease-in-out';
    
    setTimeout(() => {
        welcomeSection.style.display = 'none';
        mainContent.style.display = 'block';
        navbar.classList.add('active');
        
        // Déclencher l'animation des premiers éléments visibles
        revealElements();
    }, 800);
}

// ===== GESTION DU SCROLL =====
window.addEventListener('scroll', () => {
    // Afficher/masquer la navbar
    if (window.scrollY > 100) {
        navbar.classList.add('active');
    }
    
    // Révéler les éléments au scroll
    revealElements();
});

// ===== RÉVÉLER LES ÉLÉMENTS AU SCROLL =====
function revealElements() {
    const headers = document.querySelectorAll('.section-header');
    const cards = document.querySelectorAll('.example-card');
    const performanceSections = document.querySelectorAll('.performance-section');
    const applicationsSections = document.querySelectorAll('.applications-section');
    
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    // Animer les en-têtes
    headers.forEach(header => {
        const headerTop = header.getBoundingClientRect().top;
        
        if (headerTop < windowHeight - revealPoint) {
            header.classList.add('visible');
        }
    });
    
    // Animer les cartes avec délai progressif
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - revealPoint) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100); // Délai de 100ms entre chaque carte
        }
    });
    
    // Animer les sections de performance
    performanceSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
    
    // Animer les sections d'applications
    applicationsSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
}

// ===== SMOOTH SCROLL POUR LA NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Compensation pour la navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION DES CARTES AU SURVOL =====
const cards = document.querySelectorAll('.example-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PARALLAX EFFECT SUBTIL =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section-header');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== ANIMATION DE CHARGEMENT INITIALE =====
window.addEventListener('load', () => {
    // S'assurer que le contenu principal est caché au début
    mainContent.style.display = 'none';
    
    // Animation de la page de bienvenue
    const welcomeContent = document.querySelector('.welcome-content');
    welcomeContent.style.opacity = '0';
    
    setTimeout(() => {
        welcomeContent.style.transition = 'opacity 1s ease-in';
        welcomeContent.style.opacity = '1';
    }, 100);
    
    // Initialiser les radars Chart.js
    initializeRadarCharts();
});

// ===== CRÉATION DES RADARS DE PERFORMANCE =====
function initializeRadarCharts() {
    // Configuration commune pour tous les radars
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                cornerRadius: 8
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 2,
                    font: {
                        size: 11
                    }
                },
                pointLabels: {
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    // Radar Matériaux Métalliques
    const metallicCtx = document.getElementById('metallicRadar');
    if (metallicCtx) {
        new Chart(metallicCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Conductivité', 'Coût', 'Malléabilité', 'Recyclabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [9, 8, 10, 6, 7, 8],
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderColor: 'rgba(100, 116, 139, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(100, 116, 139, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Organiques
    const organicCtx = document.getElementById('organicRadar');
    if (organicCtx) {
        new Chart(organicCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Flexibilité', 'Coût', 'Légèreté', 'Biodégradabilité'],
                datasets: [{
                    label: 'Performance',
                    data: [5, 6, 9, 8, 8, 7],
                    backgroundColor: 'rgba(5, 150, 105, 0.2)',
                    borderColor: 'rgba(5, 150, 105, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(5, 150, 105, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Minéraux
    const mineralCtx = document.getElementById('mineralRadar');
    if (mineralCtx) {
        new Chart(mineralCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Résist. Chaleur', 'Coût', 'Dureté', 'Inertie Chimique'],
                datasets: [{
                    label: 'Performance',
                    data: [8, 9, 10, 7, 9, 9],
                    backgroundColor: 'rgba(220, 38, 38, 0.2)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(220, 38, 38, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }

    // Radar Matériaux Composites
    const compositeCtx = document.getElementById('compositeRadar');
    if (compositeCtx) {
        new Chart(compositeCtx, {
            type: 'radar',
            data: {
                labels: ['Résistance', 'Durabilité', 'Légèreté', 'Coût', 'Polyvalence', 'Performance'],
                datasets: [{
                    label: 'Performance',
                    data: [10, 9, 10, 4, 9, 10],
                    backgroundColor: 'rgba(234, 88, 12, 0.2)',
                    borderColor: 'rgba(234, 88, 12, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(234, 88, 12, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: commonOptions
        });
    }
}

// ===== DÉTECTION DE L'APPAREIL MOBILE =====
function isMobile() {
    return window.innerWidth <= 768;
}

// ===== ADAPTATION DES ANIMATIONS POUR MOBILE =====
if (isMobile()) {
    // Réduire les animations complexes sur mobile pour améliorer les performances
    document.querySelectorAll('.example-card').forEach(card => {
        card.style.transition = 'all 0.2s ease';
    });
}

// ===== GESTION DU REDIMENSIONNEMENT =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les positions au redimensionnement
        revealElements();
    }, 250);
});

// ===== EASTER EGG - DOUBLE CLIC SUR LE LOGO =====
const logo = document.querySelector('.logo-animation');
let clickCount = 0;
let clickTimer = null;

logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);
    } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;
        
        // Animation spéciale
        logo.style.animation = 'rotate 0.5s ease-in-out 3';
        
        // Créer des particules colorées
        createParticles();
    }
});

function createParticles() {
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = '50%';
        particle.style.top = '40%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5 + Math.random() * 5;
        
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity + 2; // Gravité
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ===== INDICATEUR DE PROGRESSION DE SCROLL =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Activer l'indicateur de progression (optionnel)
// createScrollProgress();

// ===== ACCESSIBILITÉ - NAVIGATION AU CLAVIER =====
document.addEventListener('keydown', (e) => {
    // Touche Espace pour démarrer depuis la page de bienvenue
    if (e.code === 'Space' && welcomeSection.style.display !== 'none') {
        e.preventDefault();
        startExploring();
    }
    
    // Touches fléchées pour naviguer entre les sections
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        const sections = ['metallic', 'organic', 'mineral', 'composite'];
        const currentScroll = window.pageYOffset;
        
        let currentSection = 0;
        sections.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element && Math.abs(element.offsetTop - currentScroll) < 100) {
                currentSection = index;
            }
        });
        
        if (e.code === 'ArrowDown' && currentSection < sections.length - 1) {
            document.getElementById(sections[currentSection + 1]).scrollIntoView({ behavior: 'smooth' });
        } else if (e.code === 'ArrowUp' && currentSection > 0) {
            document.getElementById(sections[currentSection - 1]).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== CONSOLE LOG ARTISTIQUE =====
console.log('%c🎨 Site Les Matériaux', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cCréé par: SOULAYMA DHAHBI & SIRINE ELAARBI', 'color: #7c3aed; font-size: 14px;');
console.log('%cDéveloppé par: Med Aymen Troudi', 'color: #059669; font-size: 14px;');
console.log('%c✨ Merci de visiter notre site!', 'color: #ea580c; font-size: 12px;');
