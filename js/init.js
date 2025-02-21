

// 调试用初始化提示
console.log("初始化开始...");

// 应用数据
const apps = [
    {
        id: 1001,
        name: "Lvshu OS",
        brief: "绿树公司操作系统",
        version: "7.0.3",
        download: {
            windows: "apps/Lvshu OS.exe"
        },
        supportedDevices: ["windows"], // 支持的设备类型
        icon: "icon/Lvshu OS.png",
        description: "details/Lvshu OS.md",
        changelog: "log/Lvshu OS.md",
        tags: ["绿树公司官方应用", "系统"] // 新添加的标签字段
    },
    {
        id: 1002,
        name: "谜之工具箱",
        brief: "你想要的工具这里都有",
        version: "3.6.0",
        download: {mobile:"#小程序://工具箱/Z0pJuFQYxJb5c2J"},
        supportedDevices: ["windows", "mobile"],
        icon: "icon/谜之工具箱.png",
        description: "details/谜之工具箱.md",
        changelog: "log/谜之工具箱.md",
        tags: ["绿树公司官方应用", "工具"]
    },
    {
        id: 1003,
        name: "俄罗斯方块3",
        brief: "你能打到4000分以上吗？",
        version: "3.0.1",
        download: {
            windows: "apps/俄罗斯方块3.exe"
        },
        supportedDevices: ["windows"],
        icon: "icon/俄罗斯方块.png",
        description: "details/俄罗斯方块.md",
        changelog: "log/俄罗斯方块.md",
        tags: ["绿树公司官方应用", "游戏"]
    },
    {
        id: 2001,
        name: "DeepSeek",
        brief: "DeepSeek - 探索未至之境",
        version: "V3 / R1",
        download: {
            mobile: "https://download.deepseek.com/app/"
        },
        supportedDevices: ["mobile"],
        webVersion: "https://chat.deepseek.com/", // 网页版链接
        icon: "icon/deepseek.svg",
        description: "details/deepseek.md",
        changelog: "log/deepseek.md",
        tags: ["人工智能(AI)大模型", "工具"]
    },
    {
        id: 2002,
        name: "文心一言",
        brief: "文心一言，你的智能伙伴<br>有用、有趣、有温度",
        version: "3.5 / 4.0",
        download: {
            windows: "https://xiaoyan-desktop.cdn.bcebos.com/wenxiaoyan_setup.exe",
            mobile: "https://www.wenxiaoyan.com/app"
        },
        supportedDevices: ["windows", "mobile"],
        webVersion: "https://yiyan.baidu.com/",
        icon: "icon/文心一言.png",
        description: "details/文心一言.md",
        changelog: "log/文心一言.md",
        tags: ["人工智能(AI)大模型", "工具"]
    },
    {
        id: 2003,
        name: "Kimi",
        brief: "Kimi.ai - 会推理解析，能深度思考的AI助手",
        version: "k1.5 长思考",
        download: {
            windows: "https://kimi-img.moonshot.cn/prod-chat-kimi/kimi/kimi-desktop-windows-x86.exe",
            mobile: "https://kimi.moonshot.cn/download/app"
        },
        supportedDevices: ["windows", "mobile"],
        webVersion: "https://kimi.moonshot.cn/",
        icon: "icon/Kimi.png",
        description: "details/Kimi.md",
        changelog: "log/Kimi.md",
        tags: ["人工智能(AI)大模型", "工具"]
    },
    {
        id: 2004,
        name: "ima.copilot",
        brief: "ima.copilot智慧因你而生<br>会思考的知识库，开启搜读写新体验",
        version: "DeepSeek R1",
        download: {
            windows: "https://ima.qq.com/",
            mobile: "https://ima.qq.com/"
        },
        supportedDevices: ["windows", "mobile"],
        icon: "https://qbnovel.qq.com/static/353eac8f6c283745f02dddb66e7c6ec4f1c3252f8e6146d4ccd07ffaf70cfddc",
        description: "details/ima.md",
        changelog: "log/ima.md",
        tags: ["人工智能(AI)大模型", "工具", "办公"]
    },
    {
        id: 3001,
        name: "地铁线路图绘制器",
        brief: "一个线路图工具包项目(rmp)",
        version: "5.2.14",
        download: {},
        supportedDevices: [],
        webVersion: "https://railmapgen.github.io/rmp/",
        icon: "icon/rmp.png",
        description: "details/rmp.md",
        changelog: "log/rmp.md",
        tags: ["工具", "交通"]
    },
    {
        id: 3002,
        name: "GeoGebra",
        brief: "以更聪明的方式讲授和学习数学",
        version: "网页版",
        download: {
            windows: "https://www.geogebra.org/download",
            mobile: "https://www.geogebra.org/download"
        },
        supportedDevices: ["windows", "mobile"],
        webVersion: "https://www.geogebra.org/calculator",
        icon: "icon/geogebra.svg",
        description: "details/geogebra.md",
        changelog: "log/geogebra.md",
        tags: ["工具", "学习"]
    },
    {
        id: 3003,
        name: "Desmos",
        brief: "免费使用的精美数学工具组",
        version: "网页版",
        download: {},
        supportedDevices: [],
        webVersion: "https://www.desmos.com/calculator?lang=zh-CN",
        icon: "https://www.desmos.com/assets/build/desmos-studio-pbc-IWAXZOF2.png",
        description: "details/desmos.md",
        changelog: "log/desmos.md",
        tags: ["工具", "学习"]
    }
];

// 检测设备类型
function detectDeviceType() {
    const parser = new UAParser();
    const result = parser.getResult();
    
    console.log(result.browser.name); // 打印浏览器名称
    console.log(result.os.name);      // 打印操作系统名称
    console.log(result.device.type);  // 打印设备类型
    
    if (navigator.userAgent.includes('Windows')) {
        return 'windows';
    }
    if (navigator.userAgent.includes('Mac')) {
        return 'mac';
    }
    if (navigator.userAgent.includes('Android')) {
        return 'mobile';
    }
    if (window.innerWidth <= 768) {
        return 'mobile';
    }
    return 'unknown';
}

// 初始化应用详情页面
function initAppDetail() {
    const appId = getQueryParam('appId');
    const deviceType = detectDeviceType();
    showDetail(appId, deviceType);
}

// 获取查询参数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 在页面加载时初始化应用详情
window.addEventListener('load', initAppDetail);

// 初始化应用列表
function initAppList() {
    try {
        console.log("正在初始化应用列表...");
        const container = document.getElementById('app-list');
        if (!container) throw new Error('找不到列表容器元素');

        container.innerHTML = apps.map(app => `
        <div class="app-card" onclick="showDetail(${app.id})">
            <img src="${app.icon}" class="app-icon" alt="${app.name}图标" loading="lazy">
            <div class="app-card-content">
                <h2>${app.name}</h2>
                <p class="app-brief">${app.brief}</p>
                <small>当前版本: ${app.version}</small>
            </div>
        </div>
    `).join('');
        
        console.log("应用列表初始化完成");
    } catch (error) {
        console.error("初始化失败:", error);
        document.body.innerHTML = `<h2 style="color:red">初始化错误: ${error.message}</h2>`;
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

// 启动初始化
window.addEventListener('DOMContentLoaded', () => {
    initAppList();
    initTheme();
    initSearch();
    initParticleEffect();
    parseUrlParams();
});

// 页面加载完成后初始化搜索功能
window.addEventListener('load', initSearch);

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

// 初始化搜索框事件
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}
