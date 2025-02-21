

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

// 显示搜索提示
function showSuggestions() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById('search-suggestions');

    if (searchTerm === '') {
        suggestionsContainer.innerHTML = '';
        return;
    }

    const filteredApps = apps.filter(app => {
        return app.name.toLowerCase().includes(searchTerm) ||
            app.brief.toLowerCase().includes(searchTerm) ||
            app.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });

    const suggestions = filteredApps.map(app => `<div onclick="selectSuggestion('${app.name}')">${app.name}</div>`).join('');
    suggestionsContainer.innerHTML = suggestions;
}

// 选择搜索提示项
function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = suggestion;
    document.getElementById('search-suggestions').innerHTML = '';
    handleSearch();
}

// 初始化搜索提示
function initSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', showSuggestions);
    }
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce2(handleSearch, 300));
    }
    initSearchSuggestions();
}

// 防抖函数
function debounce2(func, delay) {
    let timer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
