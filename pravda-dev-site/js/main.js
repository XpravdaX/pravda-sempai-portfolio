document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-dark)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderBottom = '1px solid var(--border)';
                navLinks.style.zIndex = '1000';
            }
        });
    }

    // Данные проектов (встроены напрямую)
    const allProjects = [
        {
            "id": 1,
            "name": "PRAVDA_SEMPAI Pizza Shop",
            "description": "Полноценное веб-приложение для пиццерии с фронтендом, бэкендом на FastAPI, админ-панелью и корзиной.",
            "tech": ["Python", "FastAPI", "HTML/CSS/JS", "SQLite"],
            "github": "https://github.com/XpravdaX/PRAVDA_SEMPAI-Pizza-Shop",
            "category": "web",
            "icon": ""
        },
        {
            "id": 2,
            "name": "RU-OpticStore",
            "description": "Магазин оптических прицелов с клиент-серверной архитектурой: CustomTkinter + FastAPI + SQLite.",
            "tech": ["Python", "CustomTkinter", "FastAPI", "SQLAlchemy"],
            "github": "https://github.com/XpravdaX/RU-Optic-Store",
            "category": "other",
            "icon": ""
        },
        {
            "id": 3,
            "name": "RussianClicker v2.0",
            "description": "Мобильный кликер на чистом Kotlin с системой улучшений, локализацией и Material Design.",
            "tech": ["Kotlin", "Android Jetpack", "Room DB", "Coroutines"],
            "github": "https://github.com/XpravdaX/RussianClickerv2.0",
            "category": "mobile",
            "icon": ""
        },
        {
            "id": 4,
            "name": "BitrAdaptr CRM",
            "description": "Модульная CRM-система с плагинами, отчетами и темной темой на Python/CustomTkinter.",
            "tech": ["Python", "CustomTkinter", "Pandas", "SQLite"],
            "github": "https://github.com/XpravdaX/BitrAdaptr-CRM",
            "category": "other",
            "icon": ""
        },
        {
            "id": 5,
            "name": "SubwayRussian",
            "description": "Симулятор московского метро: 3D-модели, текстуры, сцена на Godot Engine.",
            "tech": ["Godot", "GDScript", "Blender (модели)"],
            "github": "https://github.com/XpravdaX/SubwayRussian",
            "category": "game",
            "icon": ""
        },
        {
            "id": 6,
            "name": "Bot-Moderator-Test-1",
            "description": "Telegram-бот для автоматической модерации групп: фильтрация мата, warn/ban/mute команды.",
            "tech": ["Python", "python-telegram-bot", "SQLite"],
            "github": "https://github.com/XpravdaX/Bot-Moderator-Test-1-Python",
            "category": "other",
            "icon": ""
        },
        {
            "id": 7,
            "name": "Testing Portfolio Template",
            "description": "Шаблон портфолио для автоматизатора тестирования: unit, API, web, нагрузочные тесты.",
            "tech": ["Python", "Pytest", "Selenium", "Locust"],
            "github": "https://github.com/XpravdaX/Python-testing-portfolio-template-",
            "category": "web",
            "icon": ""
        },
        {
            "id": 8,
            "name": "RouletteCSGO",
            "description": "Основа симулятора открытия кейсов на Godot. Механика рандома и простой UI.",
            "tech": ["Godot", "GDScript"],
            "github": "https://github.com/XpravdaX/RouletteCSGO",
            "category": "game",
            "icon": ""
        }
    ];

    const grid = document.getElementById('projects-grid');
    
    function renderProjects(projects) {
        if (!grid) return;
        if (projects.length === 0) {
            grid.innerHTML = '<p class="empty">Нет проектов в этой категории.</p>';
            return;
        }
        grid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-icon">${project.icon}</div>
                <h3>${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" rel="noopener" class="project-link">
                    GitHub <i class="fab fa-github"></i> →
                </a>
            </div>
        `).join('');
    }

    // Отображаем проекты
    renderProjects(allProjects);

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (filter === 'all') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category === filter);
                renderProjects(filtered);
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (navLinks && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Simple contact form handler (prevent default, show alert)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за сообщение! (Демо-режим) В реальном проекте настройте отправку на ваш Telegram или email.');
            contactForm.reset();
        });
    }

    // Кнопка "Наверх"
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Показываем/скрываем кнопку при прокрутке
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Плавная прокрутка наверх при клике
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});