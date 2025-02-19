
// 防抖功能
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 显示和隐藏置顶按钮
let scrollBtn = document.getElementById('scroll-top-btn');
const container = document.getElementById('app-detail'); // 替换为实际的滚动容器 ID

if (container) {
    container.addEventListener('scroll', () => {
        if (container.scrollTop > 500) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
} else {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}
