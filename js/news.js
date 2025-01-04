const newsData = {
    team: [
        {
            id: 1,
            title: "Победа на турнире Standoff 2 Pro League",
            date: "2024-03-16",
            preview: "Наша команда одержала убедительную победу в финале турнира, обыграв сильнейших соперников со счетом 13:7",
            image: "images/news/victory.jpg",
            tags: ["турнир", "победа"]
        },
        {
            id: 2,
            title: "Новый игрок в составе",
            date: "2024-03-10",
            preview: "К нашей команде присоединился талантливый игрок CLAT4ER, ранее выступавший за команду Elite Warriors",
            image: "images/news/new-player.jpg",
            tags: ["состав", "трансфер"]
        }
    ],
    game: [
        {
            id: 1,
            title: "Обновление 2.10.0",
            date: "2024-03-20",
            preview: "Масштабное обновление игры: новая карта, система рангов и балансировка оружия",
            image: "images/news/update.jpg",
            tags: ["обновление", "патч"]
        },
        {
            id: 2,
            title: "Турнирная система",
            date: "2024-03-15",
            preview: "Разработчики представили новую систему проведения турниров и рейтинговых матчей",
            image: "images/news/tournament.jpg",
            tags: ["турниры", "рейтинг"]
        }
    ]
};

function renderNews() {
    const teamNews = document.getElementById('teamNews');
    const gameNews = document.getElementById('gameNews');
    
    if (teamNews) {
        renderTeamNews();
    }
    
    if (gameNews) {
        renderGameNews();
    }
}

function renderTeamNews() {
    const teamNewsGrid = document.getElementById('teamNews');
    if (teamNewsGrid) {
        // Показываем только 3 последние новости на главной
        const recentTeamNews = newsData.team.slice(0, 3);
        teamNewsGrid.innerHTML = generateNewsHTML(recentTeamNews);
    }
}

function renderGameNews() {
    const gameNewsGrid = document.getElementById('gameNews');
    if (gameNewsGrid) {
        // Показываем только 3 последние новости на главной
        const recentGameNews = newsData.game.slice(0, 3);
        gameNewsGrid.innerHTML = generateNewsHTML(recentGameNews);
    }
}

function generateNewsHTML(news) {
    return news.map(item => `
        <div class="news-card">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${formatDate(item.date)}</div>
                <h3>${item.title}</h3>
                <p>${item.preview}</p>
                <div class="news-tags">
                    ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Форматирование даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Экспортируем функции
window.renderNews = renderNews;