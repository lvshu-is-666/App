

// 搜索处理函数
function handleSearch() {
    // search.js 修改后逻辑（支持多标签和模糊匹配）
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredApps = apps.filter(app => {
        const terms = searchTerm.split(' ');
        return terms.every(term => 
            app.name.toLowerCase().includes(term) ||
            app.brief.toLowerCase().includes(term) ||
            app.tags.some(tag => tag.toLowerCase().includes(term))
        );
    });
    
    document.getElementById('app-list').innerHTML = filteredApps.map(app => `
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
