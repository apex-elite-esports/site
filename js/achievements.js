const achievementsData = {
    // "2024": [
    //     {
    //         id: 1,
    //         title: "Чемпионы Standoff 2 Pro League Season 1",
    //         date: "2024-03-15",
    //         prize: "$10,000",
    //         place: "1 место",
    //         location: "Москва, Россия",
    //         description: "Победа в международном турнире с призовым фондом $50,000",
    //         image: "../images/achievements/trophy1.jpg"
    //     },
    //     {
    //         id: 2,
    //         title: "Финалисты Winter Cup 2024",
    //         date: "2024-02-20",
    //         prize: "$5,000",
    //         place: "2 место",
    //         location: "Онлайн",
    //         description: "Второе место в зимнем турнире среди команд СНГ",
    //         image: "../images/achievements/trophy2.jpg"
    //     }
    // ],
    // "2023": [
    //     {
    //         id: 3,
    //         title: "Победители Regional Masters",
    //         date: "2023-12-10",
    //         prize: "$7,000",
    //         place: "1 место",
    //         location: "Киев, Украина",
    //         description: "Уверенная победа в региональном турнире",
    //         image: "../images/achievements/trophy3.jpg"
    //     }
    // ]
};

// Добавляем функцию форматирования даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function renderAchievements() {
    // const achievements2024 = document.getElementById('achievements2024');
    // const achievements2023 = document.getElementById('achievements2023');
    
    // if (achievements2024) {
    //     renderYearAchievements("2024");
    // }
    
    // if (achievements2023) {
    //     renderYearAchievements("2023");
    // }
}

function renderYearAchievements(year) {
    const container = document.getElementById(`achievements${year}`);
    if (!container) return;

    container.innerHTML = achievementsData[year].map(achievement => `
        <div class="achievement-card">
            <div class="achievement-image">
                <img src="${achievement.image}" alt="${achievement.title}">
                <div class="achievement-place">${achievement.place}</div>
            </div>
            <div class="achievement-content">
                <div class="achievement-date">${formatDate(achievement.date)}</div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <div class="achievement-details">
                    <div class="detail">
                        <i class="fas fa-trophy"></i>
                        <span>${achievement.prize}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${achievement.location}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', renderAchievements);