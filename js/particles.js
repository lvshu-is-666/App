

// 粒子效果开关
let isParticleEffectActive = true;
let animationFrameId = null; // 存储动画帧 ID

// 初始化粒子效果
function initParticleEffect() {
    // 获取 canvas 元素和上下文
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    // 设置 canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 6; // 粒子大小
            this.speedX = (Math.random() - 0.5) * 3;
            this.speedY = (Math.random() - 0.5) * 3;
            this.color = getRandomColor(); // 随机颜色
            this.shape = getRandomShape();  // 随机形状
        }

        draw() {
            ctx.fillStyle = this.color;
            switch (this.shape) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'square':
                    ctx.fillRect(this.x, this.y, this.size * 2, this.size * 2);
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // 边界碰撞检测
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            this.draw();
        }
    }

    // 获取随机颜色
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = 0.4 + Math.random() * 0.6; // 透明度
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // 获取随机形状
    function getRandomShape() {
        const shapes = ['circle', 'square', 'triangle'];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    // 创建粒子数组
    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    // 动画函数
    function animate() {
        if (!isParticleEffectActive) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
        });

        animationFrameId = requestAnimationFrame(animate);
    }
    
    // 窗口大小调整时更新 canvas 尺寸
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // 恢复粒子效果状态
    const storedState = localStorage.getItem('particleEffectState');
    if (storedState !== null) {
        isParticleEffectActive = JSON.parse(storedState);
    }

    // 初始化按钮样式
    const button = document.getElementById('toggle-btn');
    button.classList.add(isParticleEffectActive ? 'fa-toggle-on' : 'fa-toggle-off');

    // 启动动画
    animationFrameId = requestAnimationFrame(animate);
}

// 切换粒子效果
function toggleParticleEffect() {
    isParticleEffectActive = !isParticleEffectActive;

    // 更新按钮样式
    const button = document.getElementById('toggle-btn');
    if (isParticleEffectActive) {
        button.classList.remove('fa-toggle-off');
        button.classList.add('fa-toggle-on');
    } else {
        button.classList.remove('fa-toggle-on');
        button.classList.add('fa-toggle-off');
    }

    // 如果粒子效果关闭，重置画布
    if (!isParticleEffectActive) {
        const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        initParticleEffect(); // 重新启动粒子效果
    }

    // 保存粒子效果状态到 localStorage
    localStorage.setItem('particleEffectState', isParticleEffectActive);
}
