document.addEventListener('DOMContentLoaded', function() {
    // Define keywords and their corresponding anchors
    const keywordMap = {
        'Memory Dust': '#memory-dust',
        'Clone Program': '#clone-program',
        'Memory Transmission Centers': '#memory-centers',
        'Dust Zones': '#key-locations',
        'Elite Sector': '#social-structure',
        'Memory Injection': '#applications',
        'Clone': '#clone-program',
        'Memory Recovery Program': '#applications',
        'Society Structure': '#society',
        'Technology and Innovation': '#technology',
        'Ethical Implications': '#ethics',
        'Key Events': '#key-events',
        'Memory Dust Applications': '#applications',
        'Potential Threats': '#threats',
        'Example Characters': '#characters',
        'Visual Prompts': '#visual-prompts',
        'Post-War Life': '#post-war-life',
        'Urban Architecture': '#urban-architecture',
        'Social Structure': '#social-structure',
        'Memory Centers': '#memory-centers',
        'Memory Contamination Zones': '#key-locations',
        'Memory Processing Units': '#technology',
        'Clone Incubation Chambers': '#technology',
        'Memory Riots': '#key-events',
        'Clone Uprising': '#key-events',
        'The Great Collapse': '#pre-war',
        'Golden Window': '#memory-dust',
        'Memory Diagnostics': '#social-structure',
        'Memory Injection Kiosks': '#society',
        'Clone Rights': '#ethics',
        'Memory Addiction': '#threats',
        'Memory Market': '#future-concepts',
        'Dust Contamination': '#threats'
    };

    // 为文本内容添加链接
    function addKeywordLinks() {
        const contentElements = document.querySelectorAll('.content-box p, .content-box li');
        
        contentElements.forEach(element => {
            let html = element.innerHTML;
            
            // 按关键词长度排序（从长到短），避免部分替换问题
            const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
            
            // 遍历关键词映射
            for (let keyword of sortedKeywords) {
                // 创建正则表达式，匹配关键词（不区分大小写）
                const regex = new RegExp(`(${keyword})(?![^<]*>)`, 'gi');
                
                // 替换关键词为带链接的版本，但避免替换已经在链接中的文本
                html = html.replace(regex, `<a href="${keywordMap[keyword]}" class="keyword">$1</a>`);
            }
            
            element.innerHTML = html;
        });
    }

    // 添加平滑滚动效果
    function addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 滚动到目标位置
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 添加高亮效果
                    targetElement.classList.add('highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    }

    // 在现有的 script.js 中添加搜索功能
    function initSearch() {
        const searchInput = document.querySelector('.search-box input');
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const contentSections = document.querySelectorAll('section');
            
            contentSections.forEach(section => {
                const text = section.textContent.toLowerCase();
                const match = text.includes(searchTerm);
                
                if (searchTerm.length > 2) {
                    if (match) {
                        section.style.display = 'block';
                        // 高亮匹配文本
                        highlightText(section, searchTerm);
                    } else {
                        section.style.display = 'none';
                    }
                } else {
                    section.style.display = 'block';
                    // 移除之前的高亮
                    removeHighlights(section);
                }
            });
        });
    }

    function highlightText(element, searchTerm) {
        removeHighlights(element);
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                const span = document.createElement('span');
                span.className = 'search-highlight';
                span.textContent = node.textContent;
                node.parentNode.replaceChild(span, node);
            }
        }
    }

    function removeHighlights(element) {
        const highlights = element.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const text = document.createTextNode(highlight.textContent);
            highlight.parentNode.replaceChild(text, highlight);
        });
    }

    // 添加阅读进度指示器
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.scrollY / documentHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 添加返回顶部按钮
    function addBackToTop() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 添加章节目录交互
    function initSidebarInteraction() {
        const sectionTitles = document.querySelectorAll('.section-title');
        
        sectionTitles.forEach(title => {
            title.addEventListener('click', () => {
                const subMenu = title.nextElementSibling;
                title.classList.toggle('expanded');
                subMenu.style.maxHeight = subMenu.style.maxHeight ? null : subMenu.scrollHeight + 'px';
            });
        });
    }

    const sidebarPrompt = document.querySelector('.sidebar-prompt');
    const fixedLinks = document.querySelector('.fixed-links');

    sidebarPrompt.addEventListener('mouseenter', () => {
        fixedLinks.style.display = 'flex'; 
    });

    sidebarPrompt.addEventListener('mouseleave', () => {
        fixedLinks.style.display = 'none'; 
    });

    // 添加高亮当前章节的功能
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 在初始化时调用
    highlightCurrentSection();

}); 