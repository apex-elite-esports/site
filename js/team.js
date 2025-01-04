const teamData = {
    players: [
        {
            id: 1,
            nickname: "CLAT4ER",
            realName: "Александр Иванов",
            role: "CAPTAIN",
            country: {
                code: "az",
                name: "Azerbaijan"
            },
            description: "Ведущий игрок команды, специализируется на агрессивном стиле игры",
            stats: {
                "K/D": "1.8",
                "HS%": "68%",
                "Win Rate": "75%",
                "Hours": "1500+"
            },
            image: "../images/players/Аватарка.jpg",
            social: {
                discord: "#",
                youtube: "#"
            }
        },
        {
            id: 2,
            nickname: "Sargis",
            realName: "Саргис Акопян",
            role: "ELDER",
            country: {
                code: "am",
                name: "Armenia"
            },
            description: "Опытный стратег команды с отличным пониманием тактики",
            stats: {
                "K/D": "1.5",
                "HS%": "62%",
                "Win Rate": "72%",
                "Hours": "1200+"
            },
            image: "../images/players/Аватарка.jpg",
            social: {
                discord: "#"
            }
        },
        {
            id: 3,
            nickname: "Derex",
            realName: "Андрей Петров",
            role: "MEMBER",
            country: {
                code: "ru",
                name: "Russia"
            },
            description: "Молодой талант команды, быстро прогрессирующий игрок",
            stats: {
                "K/D": "1.6",
                "HS%": "65%",
                "Win Rate": "70%",
                "Hours": "1000+"
            },
            image: "../images/players/Аватарка.jpg",
            social: {
                discord: "#"
            }
        }
    ]
};

function renderTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = teamData.players.map(player => `
        <div class="player-card">
            <div class="player-image">
                <img src="${player.image}" alt="${player.nickname}" class="player-avatar">
                <div class="player-overlay">
                    <div class="player-stats">
                        ${Object.entries(player.stats).map(([key, value]) => `
                            <div class="stat">
                                <span class="stat-label">${key}</span>
                                <span class="stat-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="player-info">
                <div class="player-header">
                    <div class="player-name-container">
                        <h3 class="player-nickname">${player.nickname}</h3>
                        <span class="player-real-name">${player.realName}</span>
                        <img 
                            src="https://flagcdn.com/w40/${player.country.code}.png"
                            srcset="https://flagcdn.com/w80/${player.country.code}.png 2x"
                            width="30"
                            alt="${player.country.name}"
                            class="country-flag"
                            title="${player.country.name}"
                        >
                    </div>
                </div>

                <div class="divider"></div>

                <div class="player-role-container">
                    <span class="role-label">РОЛЬ:</span>
                    <span class="player-role">${player.role}</span>
                </div>

                <div class="divider"></div>

                <div class="player-description-container">
                    <p class="player-description">${player.description}</p>
                </div>

                <div class="divider"></div>

                <div class="player-social">
                    ${player.social.discord ? `<a href="${player.social.discord}" target="_blank"><i class="fab fa-discord"></i></a>` : ''}
                    ${player.social.youtube ? `<a href="${player.social.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', renderTeam);