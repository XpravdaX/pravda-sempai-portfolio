document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.width = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.padding = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(10, 12, 18, 0.98)';
                navLinks.style.backdropFilter = 'blur(12px)';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderBottom = '1px solid var(--border)';
                navLinks.style.zIndex = '1000';
                navLinks.style.gap = '1rem';
            }
        });
    }

    // Projects data
    const projects = [
        {
            id: 1,
            name: "Portfolio website for a photographer",
            description: "Сайт-портфолио для фотографа с галереей и адаптивным дизайном.",
            tech: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/XpravdaX/-portfolio-website-for-a-photographer",
            category: "web",
            icon: ""
        },
        {
            id: 2,
            name: "PRAVDA_SEMPAI Pizza Shop",
            description: "Веб-приложение для пиццерии с корзиной, админ-панелью и API на FastAPI.",
            tech: ["Python", "FastAPI", "HTML/CSS/JS", "SQLite"],
            github: "https://github.com/XpravdaX/PRAVDA_SEMPAI-Pizza-Shop",
            category: "web",
            icon: ""
        },
        {
            id: 3,
            name: "RU-OpticStore",
            description: "Магазин оптических прицелов с клиент-серверной архитектурой.",
            tech: ["Python", "CustomTkinter", "FastAPI", "SQLAlchemy"],
            github: "https://github.com/XpravdaX/RU-Optic-Store",
            category: "other",
            icon: ""
        },
        {
            id: 4,
            name: "RussianClicker v2.0",
            description: "Мобильный кликер на Kotlin с системой улучшений и Material Design.",
            tech: ["Kotlin", "Android Jetpack", "Room DB", "Coroutines"],
            github: "https://github.com/XpravdaX/RussianClickerv2.0",
            category: "mobile",
            icon: ""
        },
        {
            id: 5,
            name: "BitrAdaptr CRM",
            description: "Модульная CRM-система с плагинами и темной темой.",
            tech: ["Python", "CustomTkinter", "Pandas", "SQLite"],
            github: "https://github.com/XpravdaX/BitrAdaptr-CRM",
            category: "other",
            icon: ""
        },
        {
            id: 6,
            name: "SubwayRussian",
            description: "Симулятор московского метро на Godot Engine.",
            tech: ["Godot", "GDScript", "Blender"],
            github: "https://github.com/XpravdaX/SubwayRussian",
            category: "game",
            icon: ""
        },
        {
            id: 7,
            name: "Bot-Moderator-Test-1",
            description: "Telegram-бот для автоматической модерации групп.",
            tech: ["Python", "python-telegram-bot", "SQLite"],
            github: "https://github.com/XpravdaX/Bot-Moderator-Test-1-Python",
            category: "other",
            icon: ""
        },
        {
            id: 8,
            name: "Testing Portfolio Template",
            description: "Шаблон портфолио для автоматизатора тестирования.",
            tech: ["Python", "Pytest", "Selenium", "Locust"],
            github: "https://github.com/XpravdaX/Python-testing-portfolio-template-",
            category: "web",
            icon: ""
        },
        {
            id: 9,
            name: "RouletteCSGO",
            description: "Симулятор открытия кейсов на Godot.",
            tech: ["Godot", "GDScript"],
            github: "https://github.com/XpravdaX/RouletteCSGO",
            category: "game",
            icon: ""
        }
    ];

    const grid = document.getElementById('works-grid');
    
    function renderProjects(projectsList) {
        if (!grid) return;
        
        if (projectsList.length === 0) {
            grid.innerHTML = '<div class="empty-state"><p>Нет проектов в этой категории</p></div>';
            return;
        }
        
        grid.innerHTML = projectsList.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-icon">${project.icon}</div>
                <h3>${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" rel="noopener" class="project-link">
                    <span>Подробнее</span>
                    <i class="fab fa-github"></i>
                </a>
            </div>
        `).join('');
    }

    // Initial render
    renderProjects(projects);

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (filter === 'all') {
                renderProjects(projects);
            } else {
                const filtered = projects.filter(p => p.category === filter);
                renderProjects(filtered);
            }
            
            // После смены фильтра скроллим к началу секции проектов
            const worksSection = document.getElementById('works');
            if (worksSection && window.innerWidth <= 768) {
                setTimeout(() => {
                    worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
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
                    navLinks.style.display = '';
                }
            }
        });
    });

    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // Intersection Observer for stats animation
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroStats);
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });

    // Управление видимостью индикаторов прокрутки на мобильных
    function handleScrollHints() {
        const isMobile = window.innerWidth <= 768;
        
        const worksGrid = document.querySelector('.works-grid');
        const worksHint = document.getElementById('works-scroll-hint');
        const stackGrid = document.querySelector('.stack-grid');
        const stackHint = document.getElementById('stack-scroll-hint');
        
        if (isMobile && worksGrid && worksHint) {
            // Показываем индикатор только если есть переполнение
            const hasOverflow = worksGrid.scrollWidth > worksGrid.clientWidth;
            worksHint.style.display = hasOverflow ? 'flex' : 'none';
            
            // Скрываем индикатор после прокрутки
            if (hasOverflow) {
                let hideTimeout;
                worksGrid.addEventListener('scroll', () => {
                    worksHint.style.opacity = '0.5';
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        worksHint.style.opacity = '1';
                    }, 1000);
                });
            }
        } else if (worksHint) {
            worksHint.style.display = 'none';
        }
        
        if (isMobile && stackGrid && stackHint) {
            const hasOverflow = stackGrid.scrollWidth > stackGrid.clientWidth;
            stackHint.style.display = hasOverflow ? 'flex' : 'none';
        } else if (stackHint) {
            stackHint.style.display = 'none';
        }
    }
    
    // Запускаем при загрузке и при изменении размера окна
    handleScrollHints();
    window.addEventListener('resize', handleScrollHints);
    
    // Дополнительно: авто-скрытие индикатора при скролле проектов
    const worksGrid = document.querySelector('.works-grid');
    if (worksGrid) {
        worksGrid.addEventListener('scroll', () => {
            const worksHint = document.getElementById('works-scroll-hint');
            if (worksHint && window.innerWidth <= 768) {
                worksHint.style.opacity = '0.3';
                clearTimeout(window.worksHintTimeout);
                window.worksHintTimeout = setTimeout(() => {
                    worksHint.style.opacity = '1';
                }, 800);
            }
        });
    }
    
    const stackGrid = document.querySelector('.stack-grid');
    if (stackGrid) {
        stackGrid.addEventListener('scroll', () => {
            const stackHint = document.getElementById('stack-scroll-hint');
            if (stackHint && window.innerWidth <= 768) {
                stackHint.style.opacity = '0.3';
                clearTimeout(window.stackHintTimeout);
                window.stackHintTimeout = setTimeout(() => {
                    stackHint.style.opacity = '1';
                }, 800);
            }
        });
    }
});