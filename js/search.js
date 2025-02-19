// 搜索处理函数
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    
    const filteredApps = apps.filter(app => {
        const nameMatch = app.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = app.brief.toLowerCase().includes(searchTerm);
        const tagsMatch = app.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return nameMatch || descriptionMatch || tagsMatch;
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

// 显示列表
function showList() {
    document.querySelector('.search-container').style.display = 'flex';
    
    document.getElementById('app-list').style.display = 'grid';
    document.getElementById('app-detail-container').style.display = 'none';
}
