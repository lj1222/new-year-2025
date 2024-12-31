document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    const container = document.querySelector('.fireworks-container');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const message = document.getElementById('message');
    const blessing = document.getElementById('blessing');
    const bgMusic = document.getElementById('bgMusic');
    
    // 设置音量
    bgMusic.volume = 1.0;

    // 设置目标日期（2025年元旦）
    const targetDate = new Date('2025-01-01T00:00:00+08:00');

    // 更新倒计时
    function updateCountdown() {
        const currentDate = new Date();
        const diff = targetDate - currentDate;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            
            // 添加结束动画
            const container = document.querySelector('.container');
            container.classList.add('countdown-ended');
            
            // 等待动画完成后再切换背景和开始烟花
            setTimeout(() => {
                changeToNightSky();
                
                // 播放音乐
                bgMusic.play().catch(err => console.log('Auto-play was prevented'));
                
                setTimeout(() => {
                    startFireworksShow();
                    setTimeout(showMessage, 1000);
                }, 1500);
            }, 1000);
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 祝福语数组
    const blessings = [
        "桢儿，愿你眼中有光，心中有爱，前路有繁星。",
        "桢天子，愿你被温柔以待，幸福常在。",
        "桢帅哥，愿你平安喜乐，前程似锦。",
        "桢小菜，愿你心想事成，美梦成真。",
        "桢知音，愿你遇见的每一天都如阳光般温暖。",
        "精神小妹，愿你所求皆所愿，所遇皆温柔。",
        "精神教父，愿你一路向阳，无惧远方。",
        "香香公主，愿你被世界温柔相待，也温柔待人。",
        "皇上，新年至，百事皆可乐，万事皆如愿。",
        "笨师傅，2025新年万喜，去岁千般皆如意，今年万事定称心。",
        "小气鬼，跨年之时，新年的光芒依旧四射，未来可期。",
        "贝贝，愿你把遗憾丢弃在昨天，把憧憬寄托在明天。",
        "画画大师，接福纳新，目明心亮，立心利行，热爱如初。",
        "香蕉侠，愿我们眉目舒展，风日丽，海阔天高。",
        "大当家，旧历已成昨，千帆轻舟过，新历即启程，一切皆可盼。",
        "大王，所有过往皆为序章，不许回头看，向前，向前，再向前。",
        "桢儿，好风凭借力，送我上青云，祝你，祝我，祝我们。",
        "桢天子，be fine 我的2025，开心2025，健康2025，有钱2025。",
        "桢帅哥，山月知我心底事，岁月礼赠顺遂。",
        "桢小菜，辞暮尔尔，烟火年年。",
        "桢知音，华灯在照，照你依旧，相年等春见。",
        "精神小妹，大家沈醉对芳筵，愿新年，胜旧年。",
        "精神教父，共欢新故岁，迎送一宵中。",
        "香香公主，春萱并茂，棠棣同馨。",
        "皇上，愿天上人间，占得欢娱，年年今夜。",
        "笨师傅，岁聿云暮，一元复始。",
        "小气鬼，春祺夏安，秋绥冬禧。",
        "贝贝，但入新年，愿百事，皆如意。"
    ];

    // 添加音乐控制按钮
    const musicButton = document.createElement('div');
    musicButton.className = 'music-control';
    const musicIcon = document.createElement('span');
    musicIcon.className = 'icon';
    musicIcon.textContent = '♪';
    musicButton.appendChild(musicIcon);

    musicButton.onclick = () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.textContent = '♪';
            musicButton.classList.add('playing');
        } else {
            bgMusic.pause();
            musicIcon.textContent = '♫';
            musicButton.classList.remove('playing');
        }
    };

    document.body.appendChild(musicButton);

    // 修改背景切换函数
    function changeToNightSky() {
        // 先创建星星容器
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        document.body.insertBefore(starsContainer, document.body.firstChild);

        // 添加薄雾效果
        const fogContainer = document.createElement('div');
        fogContainer.className = 'fog-container';
        document.body.insertBefore(fogContainer, document.body.firstChild);
        
        // 平滑切换背景
        setTimeout(() => {
            document.body.classList.add('night-sky');
            
            // 延迟显示各个效果，创造层次感
            setTimeout(() => {
                starsContainer.classList.add('show');
            }, 500);
            
            setTimeout(() => {
                fogContainer.classList.add('show');
            }, 1000);
        }, 100);
    }

    // 添加音乐结束时的处理
    bgMusic.addEventListener('ended', () => {
        // 重置为初始状态
        const existingMessages = document.querySelectorAll('.message-clone');
        existingMessages.forEach(msg => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 800);
        });
    });

    function getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const messageWidth = 500;
        const messageHeight = 200;
        const margin = 50;
        
        let x, y;
        
        // 随机选择位置策略
        const strategy = Math.random();
        
        if (strategy < 0.25) {
            // 上部区域
            x = margin + Math.random() * (viewportWidth - messageWidth - margin * 2);
            y = margin + Math.random() * (viewportHeight * 0.3);
        } else if (strategy < 0.5) {
            // 下部区域
            x = margin + Math.random() * (viewportWidth - messageWidth - margin * 2);
            y = viewportHeight * 0.7 + Math.random() * (viewportHeight * 0.3 - messageHeight - margin);
        } else if (strategy < 0.75) {
            // 左侧区域
            x = margin + Math.random() * (viewportWidth * 0.3);
            y = margin + Math.random() * (viewportHeight - messageHeight - margin * 2);
        } else {
            // 右侧区域
            x = viewportWidth * 0.7 + Math.random() * (viewportWidth * 0.3 - messageWidth - margin);
            y = margin + Math.random() * (viewportHeight - messageHeight - margin * 2);
        }
        
        return { x, y };
    }

    // 修改烟花配置
    const fireworks = new Fireworks.default(container, {
        autoresize: true,
        opacity: 0.95,            // 增加不透明度
        acceleration: 1.03,       // 增加加速度使爆炸更有力
        friction: 0.97,           // 调整摩擦力
        gravity: 1.5,            // 增加重力效果
        particles: 250,          // 增加粒子数量
        traceLength: 4,          // 增加尾迹长度
        traceSpeed: 10,          // 调整上升速度
        explosion: 15,           // 增大爆炸范围
        intensity: 25,           // 增加密度
        flickering: 30,          // 增加闪烁效果
        lineStyle: 'round',
        hue: {
            min: 15,             // 暖色调范围
            max: 45              // 主要是金色和橙色
        },
        delay: {
            min: 15,             // 减少最小延迟
            max: 45              // 减少最大延迟
        },
        rocketsPoint: {
            min: 35,             // 扩大发射范围
            max: 65
        },
        
        // 自定义颜色配置
        colors: {
            // 主色调
            main: {
                min: 20,         // 金色和橙色系
                max: 35
            },
            // 点缀色
            accent: {
                min: 10,         // 红色系
                max: 50          // 到黄色系
            }
        },
        
        // 优化颜色选择
        color: ({ colors }) => {
            // 85%概率使用主色调，15%概率使用点缀色
            if (Math.random() < 0.85) {
                return {
                    hue: Math.random() * (colors.main.max - colors.main.min) + colors.main.min,
                    saturation: 85 + Math.random() * 15,  // 增加饱和度
                    brightness: 85 + Math.random() * 15,   // 增加亮度
                    opacity: 0.95 + Math.random() * 0.05
                };
            } else {
                return {
                    hue: Math.random() * (colors.accent.max - colors.accent.min) + colors.accent.min,
                    saturation: 85 + Math.random() * 15,
                    brightness: 85 + Math.random() * 15,
                    opacity: 0.95 + Math.random() * 0.05
                };
            }
        },
        
        // 优化轨迹配置
        trace: {
            update: (coordinates, index, total) => {
                const progress = index / total;
                // 添加轻微的随机偏移
                const wobble = Math.sin(progress * Math.PI * 2) * 0.3;
                return {
                    x: coordinates.x0 + wobble,  // 添加轻微摆动
                    y: coordinates.y0 + (coordinates.y1 - coordinates.y0) * Math.pow(progress, 0.9)  // 非线性上升
                };
            },
            generate: (origin) => {
                const startX = (origin.x / 100) * window.innerWidth;
                const startY = window.innerHeight;
                // 随机爆炸高度，但保持在合理范围内
                const endY = window.innerHeight * (0.15 + Math.random() * 0.4);
                
                return {
                    x0: startX,
                    y0: startY,
                    x1: startX + (Math.random() - 0.5) * 5,  // 添加轻微的水平偏移
                    y1: endY
                };
            }
        }
    });

    // 修改烟花展示函数
    function startFireworksShow() {
        container.classList.add('show');
        
        // 优化分阶段效果
        const stages = [
            { delay: { min: 30, max: 60 }, intensity: 12 },    // 开始阶段
            { delay: { min: 20, max: 40 }, intensity: 20 },    // 渐强阶段
            { delay: { min: 15, max: 30 }, intensity: 30 },    // 高潮阶段
            { delay: { min: 20, max: 40 }, intensity: 20 },    // 渐弱阶段
            { delay: { min: 30, max: 60 }, intensity: 12 }     // 结束阶段
        ];
        
        fireworks.start();
        
        // 每90秒切换一个阶段
        stages.forEach((stage, index) => {
            setTimeout(() => {
                fireworks.updateOptions(stage);
            }, index * 90000);
        });
    }

    // 优化整体布局
    document.body.style.cssText += `
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    `;

    // 优化倒计时容器布局
    document.querySelector('.countdown').style.cssText += `
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 40px auto;
        flex-wrap: wrap;
        max-width: 800px;
    `;

    // 修改显示祝福语函数
    function showMessage() {
        message.classList.add('show');
        
        function updateMessage() {
            const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
            const position = getRandomPosition();
            
            // 分离称呼和祝福语
            const [nickname, ...blessingText] = randomBlessing.split('，');
            
            // 设置CSS变量存储位置
            message.style.setProperty('--x', `${position.x}px`);
            message.style.setProperty('--y', `${position.y}px`);
            
            message.style.opacity = '0';
            message.style.transform = `translate(${position.x}px, ${position.y}px) scale(0.9)`;
            
            setTimeout(() => {
                // 使用 HTML 结构来应用样式
                blessing.innerHTML = `<span class="nickname">${nickname}</span>，${blessingText.join('，')}`;
                message.style.opacity = '1';
                message.style.transform = `translate(${position.x}px, ${position.y}px) scale(1)`;
                message.style.animation = 'messageFloat 4s ease-in-out infinite';
            }, 300);
                
                setTimeout(() => {
                message.style.opacity = '0';
                message.style.animation = 'none';
                
                setTimeout(() => {
                    updateMessage();
                }, 800);
                }, 3000);
        }
        
        updateMessage();
    }
}); 