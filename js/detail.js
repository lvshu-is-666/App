

// 显示列表
function showList() {
    document.querySelector('.search-container').style.display = 'flex';
    
    document.getElementById('app-list').style.display = 'grid';
    document.getElementById('app-detail-container').style.display = 'none';

    // 恢复滚动位置
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
}

// 创建Markdown内容加载器
async function loadFile(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error('文件加载失败');
    return await response.text();
}

// 显示应用详情页
async function showDetail(appId) {
    // 记录当前滚动位置
    localStorage.setItem('scrollPosition', window.pageYOffset);
    window.scrollTo(0,0);
    
    const app = apps.find(a => a.id === appId);
    const container = document.getElementById('app-detail');

    // 检测设备类型
    const deviceType = detectDeviceType();
    const isSupported = app.supportedDevices.includes(deviceType);

    document.querySelector('.search-container').style.display = 'none';

    container.innerHTML = `
    <div class="app-detail">
        <div class="detail-container">
            <!-- 左侧内容区 -->
            <div class="detail-main">
                <h1 class="app-title">${app.name}</h1>
                <div class="app-meta">
                    <div class="tags-section">
                        ${app.tags.map(tag => `<span class="tag"><i class="fa-solid fa-hashtag"></i> ${tag}</span>`).join('')}
                    </div>
                    <div class="share-section">
                        <button class="share-btn" onclick="copyShareLink(${app.id})">
                            <i class="fa-solid fa-share-from-square"></i> 分享
                        </button>
                    </div>
                </div>

                <div class="markdown-content">
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
            </div>

            <!-- 右侧侧边栏 -->
            <div class="detail-sidebar">
                <img src="${app.icon}" 
                     class="detail-icon" 
                     alt="${app.name}图标">
                <div class="download-area">
                    ${isSupported ? `
                        <button class="download-btn" 
                                onclick="location.href='${app.download[deviceType]}'">
                            <i class="fa-solid fa-download"></i> 下载
                        </button>
                    ` : `
                        <div class=".unsupported-device">
                            <p>很抱歉，该应用暂不支持您的设备，可尝试使用网页版</p>
                        </div>
                    `}
                    ${app.webVersion ? `
                        <a href="${app.webVersion}" 
                           class="download-link">
                            <i class="fa-solid fa-globe"></i> 使用网页版
                        </a>
                    ` : ''}
                    <div class="other-downloads">
                        <span>其他下载选项：</span>
                        ${app.download.windows ? `
                            <a href="${app.download.windows}" 
                               class="download-link"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-windows"></use></svg>　Windows</a>
                        ` : ''}
                        ${app.download.mobile ? `
                            <a href="${app.download.mobile}" 
                               class="download-link"><i class="fa-solid fa-mobile"></i> mobile phone</a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
        <div class="back-and-share-container">
            <button class="gradient-back-btn" onclick="showList()"><i class="fa-solid fa-arrow-left"></i>返回列表</button>
            <button class="share-btn" onclick="copyShareLink(${app.id})">
                <i class="fa-solid fa-share-from-square"></i> 分享
            </button>
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
