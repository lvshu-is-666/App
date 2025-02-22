

// 主题切换功能
//function toggleTheme() {
//    const darkThemeKey = 'prefers-color-scheme';
//    const root = document.documentElement;
//    const currentTheme = (root.style.getPropertyValue('--current-theme') || '').trim();
//    
//    if (currentTheme === 'dark') {
//        // 切换到默认主题
//        root.style.removeProperty('--current-theme');
//        document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'inline');
//        document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'none');
//        localStorage.removeItem('appTheme');
//    } else {
//        // 根据用户设置切换
//        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//        const newTheme = localStorage.getItem('appTheme') || (systemPrefersDark ? 'dark' : 'light');
//
//        root.style.setProperty('--current-theme', 'dark');
//        document.querySelectorAll('.theme-toggle-btn .light-icon').forEach(e => e.style.display = 'none');
//        document.querySelectorAll('.theme-toggle-btn .dark-icon').forEach(e => e.style.display = 'inline');
//        localStorage.setItem('appTheme', 'dark');
//    }
//}

// theme.js 修改后逻辑
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.style.getPropertyValue('--current-theme') || localStorage.getItem('appTheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.style.setProperty('--current-theme', newTheme);
    localStorage.setItem('appTheme', newTheme);
    
    // 更新按钮图标
    document.querySelectorAll('.theme-toggle-btn .light-icon, .theme-toggle-btn .dark-icon').forEach(icon => {
        icon.style.display = icon.classList.contains(newTheme + '-icon') ? 'inline' : 'none';
    });

    if(newTheme == 'light')
    {
        let colorbg = new Color4Bg.AestheticFluidBg({
	    dom: "box",
	    colors: ["#86DFE9","#A4EFF4","#faffd6","#D6F2C7","#BDEDAD","#AAE0A6"],
	    loop: true
        });	
    }
    else
    {
        let colorbg = new Color4Bg.AestheticFluidBg({
	    dom: "box",
	    colors: ["#0D4405","#35620D","#5C8A03","#2456cc","#bb78c4","#0D4405"],
	    loop: true
        });
    }
}
