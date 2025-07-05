// 主JavaScript文件

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单交互
    setupNavigation();
    
    // 初始化粒子背景
    initParticles();
    
    // 滚动监听
    setupScrollListeners();
    
    // 故障文字效果
    setupGlitchEffect();
    
    // 3D立方体交互
    setupCubeInteraction();
    
    // 设置按钮功能
    setupSettingsButton();
    
    // 主题切换功能已移除
    
    // 加载用户设置
    loadUserSettings();
    
    // 初始化音乐控制
    const musicToggle = document.getElementById('musicToggle');
    const musicStatus = document.querySelector('.music-status');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.querySelector('.volume-value');
    
    if (musicToggle && bgMusic) {
        // 设置初始状态
        musicToggle.checked = localStorage.getItem('musicEnabled') !== 'false';
        
        // 设置初始音量
        const savedVolume = localStorage.getItem('musicVolume');
        const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.5;
        bgMusic.volume = initialVolume;
        
        if (volumeSlider && volumeValue) {
            volumeSlider.value = initialVolume * 100;
            volumeValue.textContent = Math.round(initialVolume * 100) + '%';
            
            // 音量滑块事件监听
            volumeSlider.addEventListener('input', function() {
                const volume = this.value / 100;
                bgMusic.volume = volume;
                volumeValue.textContent = this.value + '%';
                localStorage.setItem('musicVolume', volume);
            });
        }
        
        // 尝试自动播放（可能会被浏览器阻止）
        if (musicToggle.checked) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('自动播放被阻止:', error);
                });
            }
        }
        
        // 更新状态显示
        updateMusicStatus();
        
        // 切换音乐开关
        musicToggle.addEventListener('change', function() {
            if (this.checked) {
                bgMusic.play();
            } else {
                bgMusic.pause();
            }
            localStorage.setItem('musicEnabled', this.checked);
            updateMusicStatus();
        });
    }
    
    function updateMusicStatus() {
        if (musicStatus) {
            const isMusicOn = musicToggle.checked;
            // 更新data-translate属性
            musicStatus.setAttribute('data-translate', isMusicOn ? 'on' : 'off');
        
            // 根据当前语言设置文本
            const currentLang = localStorage.getItem('language') || 'zh';
            if (translations && translations[currentLang]) {
                musicStatus.textContent = translations[currentLang][isMusicOn ? 'on' : 'off'];
            } else {
                // 如果翻译不可用，使用默认文本
                musicStatus.textContent = isMusicOn ? '开启' : '关闭';
            }
        
            musicStatus.style.color = isMusicOn ? '#00ffff' : '#fff';
        }
    }
    
    // 音乐初始化已移至音乐控制逻辑部分
});

// 导航菜单功能
function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // 菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // 导航项点击
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 移动端菜单点击后关闭菜单
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // 更新活动状态
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // 平滑滚动到目标位置
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70; // 导航栏高度
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 初始化粒子背景
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00f0ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00f0ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 设置按钮功能
function setupSettingsButton() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsModal = document.getElementById('settingsModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (settingsToggle && settingsModal) {
        // 打开设置面板
        settingsToggle.addEventListener('click', function() {
            settingsModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
        
        // 关闭设置面板
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // 点击模态框外部关闭
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                closeModal();
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

// 关闭模态框
function closeModal() {
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// 主题切换功能已移除

// 保存用户设置到localStorage
function saveUserSettings(key, value) {
    try {
        // 获取现有设置或创建新对象
        let settings = JSON.parse(localStorage.getItem('userSettings')) || {};
        
        // 更新设置
        settings[key] = value;
        
        // 保存回localStorage
        localStorage.setItem('userSettings', JSON.stringify(settings));
    } catch (error) {
        console.error('保存设置时出错:', error);
    }
}

// 从localStorage加载用户设置
function loadUserSettings() {
    try {
        // 获取保存的设置
        const settings = JSON.parse(localStorage.getItem('userSettings'));
        
        if (settings) {
            // 主题设置已移除
            // 动画设置已移除
        }

        // 加载音乐设置
        const musicToggle = document.getElementById('musicToggle');
        const bgMusic = document.getElementById('bgMusic');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.querySelector('.volume-value');
        
        if (musicToggle && bgMusic) {
            const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
            musicToggle.checked = musicEnabled;
            
            // 加载音量设置
            if (volumeSlider && volumeValue) {
                const savedVolume = localStorage.getItem('musicVolume');
                const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.5;
                bgMusic.volume = initialVolume;
                volumeSlider.value = initialVolume * 100;
                volumeValue.textContent = Math.round(initialVolume * 100) + '%';
            }
            
            if (musicEnabled) {
                bgMusic.play().catch(e => console.log('自动播放被阻止:', e));
            }
        }
    } catch (error) {
        console.error('加载设置时出错:', error);
    }
}

// 设置滚动监听
function setupScrollListeners() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // 导航栏滚动效果
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 故障文字效果
function setupGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // 确保元素有data-text属性
        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
        
        // 随机触发故障效果
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.classList.add('active-glitch');
                setTimeout(() => {
                    element.classList.remove('active-glitch');
                }, 200);
            }
        }, 2000);
    });
}

// 添加一些科技风格的动态效果
function addTechEffects() {
    // 这里可以添加更多的动态效果
    console.log('Tech effects initialized');
}

// 3D立方体交互功能
function setupCubeInteraction() {
    const cube = document.querySelector('.tech-cube');
    if (!cube) return;

    let isDragging = false;
    let startX, startY;
    let rotateX = -20, rotateY = 30;

    // 鼠标事件
    cube.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // 触摸事件
    cube.addEventListener('touchstart', startDrag, {passive: false});
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        startX = clientX;
        startY = clientY;
        cube.style.animation = 'none';
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        startX = clientX;
        startY = clientY;
        e.preventDefault();
    }

    function endDrag() {
        isDragging = false;
        // 2秒后恢复自动旋转
        setTimeout(() => {
            if (!isDragging) {
                cube.style.animation = 'rotate-cube 15s infinite linear';
            }
        }, 2000);
    }
}