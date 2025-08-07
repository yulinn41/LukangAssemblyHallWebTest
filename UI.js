// 全域常數和變數
const blessings = [
    '地表最強', '彰化94讚', '控霸奔', '有彰力', '甲霸丸', '幸福平安',
    '健康', '快樂', '賺大錢', '金榜題名', '事事如意', '心想事成'
];

const blessingImageMap = {
    '地表最強': './LaternText1.png',
    '彰化94讚': './LaternText2.png',
    '控霸奔': './LaternText3.png',
    '有彰力': './LaternText4.png',
    '甲霸丸': './LaternText5.png',
    '幸福平安': './LaternText6.png',
    '健康': './LaternText7.png',
    '快樂': './LaternText8.png',
    '賺大錢': './LaternText9.png',
    '金榜題名': './LaternText10.png',
    '事事如意': './LaternText11.png',
    '心想事成': './LaternText12.png'
};

const styleImageMap = {
    1: "./Latern1.png",
    2: "./Latern2.png",
    3: "./Latern3.png",
    4: "./Latern4.png",
    5: "./Latern5.png"
};

let currentSelectedStyle = 1;
let currentSelectedBlessing = blessings[0];


// ------------ 全域函式 ------------

function updateBackgroundImage() {
    const body = document.body;
    if (window.innerWidth <= 768) {
        body.style.backgroundImage = "url('./BG3.png')";
    } else if (window.innerWidth <= 1023) {
        body.style.backgroundImage = "url('./BG2.png')";
    } else {
        body.style.backgroundImage = "url('./BG1.png')";
    }
}

function updateScrollThumb() {
    const buttonsContainer1 = document.getElementById('buttonsContainer1');
    const scrollIndicatorBar1 = document.getElementById('scrollIndicatorBar1');
    const scrollIndicatorThumb1 = document.getElementById('scrollIndicatorThumb1');

    if (!buttonsContainer1 || !scrollIndicatorBar1 || !scrollIndicatorThumb1) return;

    if (buttonsContainer1.scrollWidth <= buttonsContainer1.clientWidth) {
        scrollIndicatorBar1.style.display = 'none';
        return;
    } else {
        scrollIndicatorBar1.style.display = 'block';
    }

    const thumbWidth = (buttonsContainer1.clientWidth / buttonsContainer1.scrollWidth) * scrollIndicatorBar1.clientWidth;
    scrollIndicatorThumb1.style.width = `${thumbWidth}px`;

    const maxScrollLeft = buttonsContainer1.scrollWidth - buttonsContainer1.clientWidth;
    const scrollPercentage = buttonsContainer1.scrollLeft / maxScrollLeft;
    const maxThumbLeft = scrollIndicatorBar1.clientWidth - scrollIndicatorThumb1.offsetWidth;
    const thumbLeft = scrollPercentage * maxThumbLeft;
    scrollIndicatorThumb1.style.left = `${thumbLeft}px`;
}

function initialize() {
    updateBackgroundImage();
    updateScrollThumb();
}

function updateOverlayImage() {
    const blessing = currentSelectedBlessing;
    const newImageSrc = blessingImageMap[blessing];

    if (!newImageSrc) {
        console.warn(`❗ 無對應祝福圖片：${blessing}`);
        return;
    }

    const overlayImageElements = [
        document.getElementById('overlayImage'),
        document.getElementById('overlayImage2'),
        document.getElementById('overlayImage3')
    ];

    overlayImageElements.forEach(img => {
        if (img) img.src = newImageSrc;
    });
}

function updateDisplayImage() {
    const styleNumber = currentSelectedStyle;
    const newImageSrc = styleImageMap[styleNumber];

    if (!newImageSrc) {
        console.warn(`❗ 無對應樣式圖片：${styleNumber}`);
        return;
    }

    const displayImageElements = [
        document.getElementById('displayImage0'),
        document.getElementById('displayImage1'),
        document.getElementById('displayImage2'),
        document.getElementById('displayImage3')
    ];

    displayImageElements.forEach(img => {
        if (img) img.src = newImageSrc;
    });
}


function resetBlessingToDefault() {
    currentSelectedBlessing = blessings[0];
    updateOverlayImage();

    // 清除所有按鈕的 selected 樣式
    document.querySelectorAll('.button-wrapper').forEach(btn => btn.classList.remove('selected'));
    // 為第一個按鈕加上 selected 樣式
    const firstButton = document.querySelector('.button-wrapper[data-text="地表最強"]');
    if (firstButton) firstButton.classList.add('selected');
}

function resetStyleToDefault() {
    currentSelectedStyle = 1;
    updateDisplayImage();

    // 清除所有樣式按鈕的 selected 樣式
    document.querySelectorAll('#screen0 .style-button').forEach(btn => btn.classList.remove('selected'));
    // 為第一個樣式按鈕加上 selected 樣式
    const firstStyleButton = document.querySelector('#screen0 .style-button[data-style="1"]');
    if (firstStyleButton) firstStyleButton.classList.add('selected');
}

function setupBlessingButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer1');
    if (!buttonsContainer) return;

    buttonsContainer.innerHTML = ''; // 清空舊內容
    blessings.forEach(blessing => {
        const buttonWrapper = document.createElement('button');
        buttonWrapper.classList.add('button-wrapper');
        buttonWrapper.dataset.text = blessing;
        buttonWrapper.dataset.image = blessingImageMap[blessing];

        const capTop = document.createElement('div');
        capTop.classList.add('lantern-cap');

        const textArea = document.createElement('div');
        textArea.classList.add('lantern-text-area');

        const characters = (blessing === '彰化94讚') ? ['彰', '化', '94', '讚'] : blessing.split('');
        characters.forEach(char => {
            const p = document.createElement('p');
            p.classList.add('lantern-text');
            p.textContent = char;
            textArea.appendChild(p);
        });

        const capBottom = document.createElement('div');
        capBottom.classList.add('lantern-cap');

        buttonWrapper.appendChild(capTop);
        buttonWrapper.appendChild(textArea);
        buttonWrapper.appendChild(capBottom);

        buttonsContainer.appendChild(buttonWrapper);
    });

    // 預設選中第一個按鈕
    const firstButton = document.querySelector('.button-wrapper');
    if (firstButton) firstButton.classList.add('selected');

    // 事件委派點擊按鈕
    buttonsContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.button-wrapper');
        if (!clickedButton) return;

        document.querySelectorAll('.button-wrapper').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');

        currentSelectedBlessing = clickedButton.dataset.text;
        updateOverlayImage();
    });

    const scrollIndicatorBar1 = document.getElementById('scrollIndicatorBar1');
    const scrollIndicatorThumb1 = document.getElementById('scrollIndicatorThumb1');

    // 滑動事件
    buttonsContainer.addEventListener('scroll', updateScrollThumb);

    // 滑動條拖曳
    let isDragging = false, startX, startThumbLeft;
    let isTouchDragging = false, touchStartX, touchStartThumbLeft;

    if (scrollIndicatorThumb1) {
        scrollIndicatorThumb1.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startThumbLeft = scrollIndicatorThumb1.offsetLeft;
            scrollIndicatorThumb1.style.cursor = 'grabbing';
            e.preventDefault();
        });

        scrollIndicatorThumb1.addEventListener('touchstart', (e) => {
            isTouchDragging = true;
            touchStartX = e.touches[0].clientX;
            touchStartThumbLeft = scrollIndicatorThumb1.offsetLeft;
            e.preventDefault();
        }, { passive: false });
    }

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        moveThumb(dx);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (scrollIndicatorThumb1) {
            scrollIndicatorThumb1.style.cursor = 'grab';
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (!isTouchDragging) return;
        const dx = e.touches[0].clientX - touchStartX;
        moveThumb(dx);
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', () => {
        isTouchDragging = false;
    });

    function moveThumb(dx) {
        const maxThumbLeft = scrollIndicatorBar1.clientWidth - scrollIndicatorThumb1.offsetWidth;
        let newThumbLeft = (isDragging ? startThumbLeft : touchStartThumbLeft) + dx;
        newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbLeft));
        scrollIndicatorThumb1.style.left = `${newThumbLeft}px`;
        const scrollPercentage = newThumbLeft / maxThumbLeft;
        const maxScrollLeft = buttonsContainer.scrollWidth - buttonsContainer.clientWidth;
        buttonsContainer.scrollLeft = scrollPercentage * maxScrollLeft;
    }

    scrollIndicatorBar1.addEventListener('click', (e) => {
        if (e.target === scrollIndicatorThumb1) return;
        const barRect = scrollIndicatorBar1.getBoundingClientRect();
        const clickX = e.clientX - barRect.left;
        let newThumbLeft = clickX - (scrollIndicatorThumb1.offsetWidth / 2);
        const maxThumbLeft = scrollIndicatorBar1.clientWidth - scrollIndicatorThumb1.offsetWidth;
        newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbLeft));
        scrollIndicatorThumb1.style.left = `${newThumbLeft}px`;
        const scrollPercentage = newThumbLeft / maxThumbLeft;
        const maxScrollLeft = buttonsContainer.scrollWidth - buttonsContainer.clientWidth;
        buttonsContainer.scrollLeft = scrollPercentage * maxScrollLeft;
    });
}

function setupStyleButtons() {
    const styleButtons = document.querySelectorAll('#screen0 .style-button');
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            currentSelectedStyle = parseInt(button.dataset.style);
            updateDisplayImage();
        });
    });

    // 預設選中第一個樣式
    const firstStyleButton = document.querySelector('#screen0 .style-button');
    if (firstStyleButton) firstStyleButton.classList.add('selected');
}

function switchScreen(targetId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });

    const target = document.querySelector(`#screen${targetId}`);
    if (target) {
        target.classList.add('active');
        target.style.display = 'flex';
        
        // 切換畫面時，同步更新圖片
        updateDisplayImage();
        updateOverlayImage();

        if (targetId === '0') {
            resetBlessingToDefault();
            resetStyleToDefault();
        }
    }
}

// ------------ 主邏輯：畫面載入後 ------------

document.addEventListener('DOMContentLoaded', () => {
    // 處理 vh 單位問題
    const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // 處理所有「下一步」按鈕的事件
    const allNextButtons = document.querySelectorAll('[data-target-screen]');
    allNextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetScreenId = e.currentTarget.dataset.targetScreen;
            if (targetScreenId === 'end') {
                alert('流程結束！');
                return;
            }
            switchScreen(targetScreenId);
        });
    });

    // 設定按鈕功能
    setupBlessingButtons();
    setupStyleButtons();
    
    // 初始化圖片
    updateDisplayImage();
    updateOverlayImage();

    // 初始化滑動條與背景圖
    updateScrollThumb();
    updateBackgroundImage();
});

window.addEventListener('load', initialize);
window.addEventListener('resize', initialize);