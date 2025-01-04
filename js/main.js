// Загрузка данных при старте
// Прелоадер
function initializePreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Удаляем прелоадер после загрузки всех данных и элементов
    window.addEventListener('load', () => {
        // Добавляем небольшую задержку для уверенности, что все отрендерилось
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Обновляем основную функцию загрузки
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Инициализация навигации на всех страницах
        initializeNavigation();
        updateActiveNavLink();

        // Проверяем, на какой странице мы находимся
        const currentPage = window.location.pathname;
        
        // Инициализируем компоненты в зависимости от страницы
        if (currentPage.includes('team.html')) {
            renderTeam();
        } else if (currentPage.includes('news.html')) {
            renderNews();
        } else if (currentPage.includes('achievements.html')) {
            renderAchievements();
        } else {
            // Главная страница
            initializeHeroStats();
            renderTeam();
            renderNews();
            renderAchievements();
        }

    } catch (error) {
        console.error('Error initializing:', error);
        // В случае ошибки скрываем прелоадер
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.display = 'none';
        }
    }
});

// Вспомогательные функции
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Навигация
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    // Мобильное меню
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Активные ссылки при скролле
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Прозрачность навбара
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0,0,0,0.9)';
        } else {
            navbar.style.background = 'rgba(0,0,0,0.7)';
        }
    });
}

// Анимация статистики на главной
function initializeHeroStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        
        function updateCounter() {
            const current = parseInt(stat.innerText);
            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                stat.innerText = target.toLocaleString();
            }
        }
        
        updateCounter();
    });
}

// Рендер команды
function renderTeam() {
    const teamGrid = document.getElementById('teamGrid');
    
    teamData.players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-image">
                <img src="${player.image}" alt="${player.name}">
                <div class="player-overlay">
                    <div class="player-stats">
                        ${Object.entries(player.stats).map(([key, value]) => `
                            <div class="stat">
                                <span class="stat-value">${value}</span>
                                <span class="stat-label">${key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="player-info">
                <h3>${player.name}</h3>
                <p>${player.role}</p>
                <div class="player-social">
                    ${player.social.map(s => `
                        <a href="${s.url}" target="_blank">
                            <i class="fab fa-${s.platform}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Открытие модального окна при клике
        playerCard.addEventListener('click', () => showPlayerModal(player));
        teamGrid.appendChild(playerCard);
    });
}

// Модальное окно игрока
function showPlayerModal(player) {
    const modal = document.getElementById('playerModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-player-info">
            <div class="modal-player-header">
                <img src="${player.image}" alt="${player.name}">
                <div class="modal-player-details">
                    <h2>${player.name}</h2>
                    <p class="role">${player.role}</p>
                    <p class="description">${player.description}</p>
                </div>
            </div>
            <div class="modal-player-stats">
                ${Object.entries(player.stats).map(([key, value]) => `
                    <div class="modal-stat">
                        <span class="modal-stat-value">${value}</span>
                        <span class="modal-stat-label">${key}</span>
                    </div>
                `).join('')}
            </div>
            <div class="modal-player-social">
                ${player.social.map(s => `
                    <a href="${s.url}" target="_blank" class="social-link">
                        <i class="fab fa-${s.platform}"></i>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Закрытие модального окна
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Рендер достижений
function renderAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    
    teamData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="achievement-content">
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <div class="achievement-details">
                    <span class="achievement-date">${formatDate(achievement.date)}</span>
                    <span class="achievement-prize">${achievement.prize}</span>
                </div>
            </div>
        `;
        achievementsGrid.appendChild(achievementCard);
    });
}

// Рендер новостей
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    
    teamData.news.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${formatDate(news.date)}</div>
                <h3>${news.title}</h3>
                <p>${news.preview}</p>
                <div class="news-tags">
                    ${news.tags.map(tag => `
                        <span class="tag">#${tag}</span>
                    `).join('')}
                </div>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
}

// Вспомогательные функции
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Удаляем класс active со всех ссылок
        link.classList.remove('active');
        
        // Получаем путь из href ссылки
        const linkPath = link.getAttribute('href');
        
        // Проверяем, соответствует ли путь текущей странице
        if (currentPath.includes('team.html') && linkPath.includes('team.html') ||
            currentPath.includes('news.html') && linkPath.includes('news.html') ||
            currentPath.includes('achievements.html') && linkPath.includes('achievements.html') ||
            (currentPath === '/' || currentPath.includes('index.html')) && (linkPath === 'index.html' || linkPath === './')) {
            link.classList.add('active');
        }
    });
}


// Обработка ошибок
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + error);
    return false;
};