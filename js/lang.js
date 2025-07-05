const translations = {
    "zh": {
        "home": "首页",
        "about": "关于我",
        "contact": "联系方式",
        "title": "你的说人生",
        "tagline": "探索科技与创意的无限可能",
        "about_title": "关于我",
        "about_intro1": "欢迎来到我的个人空间！我是你的说人生，一个热爱科技与创新的探索者。",
        "about_intro2": "在这个数字化的时代，我致力于探索技术与艺术的完美结合，创造出独特的数字体验。",
        "about_intro3": "我相信技术不仅仅是工具，更是表达创意和解决问题的媒介。通过不断学习和实践，我希望能够为这个世界带来一些微小但有意义的改变。",
        "tag_innovation": "创新",
        "tag_tech": "科技",
        "tag_design": "设计",
        "tag_explore": "探索",
        "contact_title": "联系方式",
        "contact_email": "邮箱",
        "contact_phone": "电话",
        "copyright": "&copy; 2025 你的说人生. 保留所有权利.",
        // 设置面板翻译
        "settings": "设置",
        "theme": "主题",
        "default": "默认",
        "light": "明亮",
        "dark": "暗黑",
        "animation": "动画效果",
        "enable_animations": "启用动画",
        "language": "语言",
        "background_music": "背景音乐",
        "on": "开启",
        "off": "关闭",
        "volume": "音量"
    },
    "en": {
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "title": "NDSRS",
        "tagline": "Exploring the Infinite Possibilities of Technology and Creativity",
        "about_title": "About Me",
        "about_intro1": "Welcome to my personal space! I'm NDSRS, an explorer passionate about technology and innovation.",
        "about_intro2": "In this digital age, I'm dedicated to exploring the perfect combination of technology and art, creating unique digital experiences.",
        "about_intro3": "I believe technology is not just a tool, but also a medium for expressing creativity and solving problems. Through continuous learning and practice, I hope to bring some small but meaningful changes to this world.",
        "tag_innovation": "Innovation",
        "tag_tech": "Technology",
        "tag_design": "Design",
        "tag_explore": "Exploration",
        "contact_title": "Contact",
        "contact_email": "Email",
        "contact_phone": "Phone",
        "copyright": "&copy; 2025 NDSRS. All rights reserved.",
        // Settings panel translations
        "settings": "Settings",
        "theme": "Theme",
        "default": "Default",
        "light": "Light",
        "dark": "Dark",
        "animation": "Animation",
        "enable_animations": "Enable Animations",
        "language": "Language",
        "background_music": "Background Music",
        "on": "On",
        "off": "Off",
        "volume": "Volume"
    }
};

function updatePageLanguage(lang) {
    // 更新导航栏
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            // 对于版权信息使用innerHTML以正确解析HTML实体
            if (key === 'copyright') {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // 更新其他文本元素
    document.documentElement.lang = lang;
}

// 初始化语言
document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage获取保存的语言设置，如果没有则默认为中文
    const savedLang = localStorage.getItem('language') || 'zh';
    updatePageLanguage(savedLang);
    
    // 初始化语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 为语言按钮添加点击事件
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const newLang = this.getAttribute('data-lang');
                updatePageLanguage(newLang);
            
                // 保存语言设置到localStorage
                localStorage.setItem('language', newLang);
            
                // 更新按钮状态
                document.querySelectorAll('.lang-btn').forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
            
                // 更新音乐状态文本（如果存在updateMusicStatus函数）
                if (typeof updateMusicStatus === 'function') {
                    updateMusicStatus();
                }
            });
        });
});