// 初始化 marked 支持表格
marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true
});

// 调试用初始化提示
console.log("初始化开始...");

const apps = [
    {
        id: 1001,
        name: "Lvshu OS",
        brief: "绿树公司操作系统",
        version: "7.0.3",
        download: "apps/Lvshu OS.exe",
        icon: "icon/Lvshu OS.png",
        description: "details/Lvshu OS.md",
        changelog: "log/Lvshu OS.md"
    },
    {
        id: 1002,
        name: "谜之工具箱",
        brief: "你想要的工具这里都有",
        version: "3.6.0",
        download: "微信小程序",
        icon: "icon/谜之工具箱.png",
        description: "details/谜之工具箱.md",
        changelog: "log/谜之工具箱.md"
    },
    {
        id: 1003,
        name: "俄罗斯方块3",
        brief: "你能打到4000分以上吗？",
        version: "3.0.1",
        download: "apps/俄罗斯方块3.exe",
        icon: "icon/俄罗斯方块.png",
        description: "details/俄罗斯方块.md",
        changelog: "log/俄罗斯方块.md"
    },
    {
        id: 2001,
        name: "deepseek",
        brief: "DeepSeek - 探索未至之境",
        version: "V3 / R1",
        download: "https://chat.deepseek.com/",
        icon: "icon/deepseek.svg",
        description: "details/deepseek.md",
        changelog: "log/deepseek.md"
    },
    {
        id: 2002,
        name: "文心一言",
        brief: "文心一言，你的智能伙伴\r\n有用、有趣、有温度",
        version: "3.5 / 4.0",
        download: "https://yiyan.baidu.com/",
        icon: "icon/文心一言.png",
        description: "details/文心一言.md",
        changelog: "log/文心一言.md"
    },
    {
        id: 2003,
        name: "Kimi",
        brief: "Kimi.ai - 会推理解析，能深度思考的AI助手",
        version: "k1.5 长思考",
        download: "https://kimi.moonshot.cn/",
        icon: "icon/Kimi.png",
        description: "details/Kimi.md",
        changelog: "log/Kimi.md"
    },
    {
        id: 3001,
        name: "地铁线路图绘制器",
        brief: "一个线路图工具包项目",
        version: "5.2.14",
        download: "https://railmapgen.github.io/rmp/",
        icon: "icon/rmp.png",
        description: "details/rmp.md",
        changelog: "log/rmp.md"
    }
];

// 增强的错误处理
function initAppList() {
    try {
        console.log("正在初始化应用列表...");
        const container = document.getElementById('app-list');
        if (!container) throw new Error('找不到列表容器元素');
        
        container.innerHTML = apps.map(app => `
    <div class="app-card" onclick="showDetail(${app.id})">
        <img src="${app.icon}" class="app-icon" alt="${app.name}图标">
        <div class="app-card-content">
            <h2>${app.name}</h2>
            <p class="app-brief">${app.brief}</p>  <!-- 显示简短描述 -->
            <small>当前版本: ${app.version}</small>
        </div>
    </div>
`).join('');
        
        console.log("应用列表初始化完成");
        
        // 初始化搜索功能
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    } catch (error) {
        console.error("初始化失败:", error);
        document.body.innerHTML = `<h2 style="color:red">初始化错误: ${error.message}</h2>`;
    }
}

// 创建Markdown内容加载器
async function loadFile(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error('文件加载失败');
    return await response.text();
}

async function showDetail(appId) {
    const app = apps.find(a => a.id === appId);
    const container = document.getElementById('app-detail');

    document.querySelector('.search-container').style.display = 'none';

    container.innerHTML = `
    <div class="app-detail">
        <div class="detail-container">
            <!-- 左侧内容区 -->
            <div class="detail-main">
                <h1>${app.name}</h1>
                <!-- 分享按钮 -->
                <div class="share-container">
                    <button class="share-btn" onclick="copyShareLink(${app.id})">
                        <i class="fas fa-share-alt"></i> 分享
                    </button>
                </div>
                <div class="description-container">
                    <div class="loading-description">加载详细内容中...</div>
                    <div id="description-content"></div>
                </div>
                
                <div class="changelog-container">
                    <h2>更新日志</h2>
                    <div class="loading-changelog">加载更新日志中...</div>
                    <div id="changelog-content"></div>
                </div>
            </div>

            <!-- 右侧侧边栏 -->
            <div class="detail-sidebar">
                <img src="${app.icon}" 
                     class="detail-icon" 
                     alt="${app.name}图标">
                <button class="download-btn" 
                        onclick="location.href='${app.download}'">
                    <i class="fa-solid fa-download"></i> 下载 ${app.version} 版本
                </button>
            </div>
        </div>
    </div>`;

    try {
        const [descMD, changelogMD] = await Promise.all([
            loadFile(app.description || app.detail),
            loadFile(app.changelog || app.changelogs)
        ]);

        // 渲染应用介绍
        document.getElementById('description-content').innerHTML = marked.parse(descMD);
        document.querySelector('.loading-description').style.display = 'none';
        document.getElementById('description-content').style.display = 'block';

        // 渲染更新日志
        document.getElementById('changelog-content').innerHTML = marked.parse(changelogMD);
        document.querySelector('.loading-changelog').style.display = 'none';
        document.getElementById('changelog-content').style.display = 'block';

        // 初始化 highlight.js
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    } catch (error) {
        document.querySelector('.loading-description').innerHTML = 
            `<div class="error">内容加载失败：${error.message}</div>`;
        document.querySelector('.loading-changelog').innerHTML = 
            `<div class="error">日志加载失败：${error.message}</div>`;
    }

    document.getElementById('app-list').style.display = 'none';
    document.getElementById('app-detail-container').style.display = 'block';

    // 初始化图片加载占位符
    document.querySelectorAll('.markdown-content img').forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
    });
}

// 复制分享链接
function copyShareLink(appId) {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?appId=${appId}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert(`已复制分享链接：${shareUrl}`);
        })
        .catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制以下链接：' + shareUrl);
        });
}

// 显示列表
function showList() {
    document.querySelector('.search-container').style.display = 'flex';
    
    document.getElementById('app-list').style.display = 'grid';
    document.getElementById('app-detail-container').style.display = 'none';
}

// 启动初始化
 window.onload = () => {
    initAppList();
    initTheme(); // 初始化主题
    parseUrlParams(); // 初始化时解析 URL 参数
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
};

// 添加搜索功能
function handleSearch() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('app-list');
    
    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(search));
    container.innerHTML = filteredApps.map(app => `
    <div class="app-card" onclick="showDetail(${app.id})">
        <img src="${app.icon}" class="app-icon" alt="${app.name}图标">
        <div class="app-card-content">
            <h2>${app.name}</h2>
            <p class="app-brief">${app.brief}</p>
            <small>当前版本: ${app.version}</small>
        </div>
    </div>
`).join('');
}

// 防抖功能
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 主题切换功能
function toggleTheme() {
    const darkThemeKey = 'prefers-color-scheme';
    const root = document.documentElement;
    const currentTheme = (root.style.getPropertyValue('--current-theme') || '').trim();
    
    if (currentTheme === 'dark') {
        // 切换到默认主题
        root.style.removeProperty('--current-theme');
        document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'inline');
        document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'none');
        localStorage.removeItem('appTheme');
    } else {
        // 根据用户设置切换
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = localStorage.getItem('appTheme') || (systemPrefersDark ? 'dark' : 'light');
        
        // 使用系统偏好
        if (newTheme === 'dark') {
            root.style.setProperty('--current-theme', 'dark');
            document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'none');
            document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'inline');
            localStorage.setItem('appTheme', 'dark');
        } else {
            // 复位主题
            root.style.removeProperty('--current-theme');
            document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'inline');
            document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'none');
            localStorage.removeItem('appTheme');
        }
    }
}

// 初始化主题
function initTheme() {
    const storedTheme = localStorage.getItem('appTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--current-theme', currentTheme);
    
    // 根据主题显示图标
    if (currentTheme === 'dark') {
        document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'inline');
    } else {
        document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'inline');
    }
}

// 解析 URL 参数
function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('appId');
    
    if (appId) {
        console.log("从 URL 中解析到 appId:", appId);
        
        // 显示应用详情页
        showDetail(parseInt(appId));
        document.getElementById('app-list').style.display = 'none';
        document.getElementById('app-detail-container').style.display = 'block';
    }
}
