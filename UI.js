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
// ... (其他全域變數) ...

const styleColorsMap = {
    1: { bgColor: '#10334D', borderColor: 'linear-gradient( to right,#EBBB94,#EBBB94)', textColor: '#EBBB94' },
    2: { bgColor: 'transparent', borderColor: 'linear-gradient( to right, #EA9841, #ECB74B)', textColor: '#F7E5BE' },
    3: { bgColor: '#F6CA61', borderColor: 'linear-gradient( to right,#904b72,#904b72)', textColor: '#0C4D50' },
    4: { bgColor: 'rgba(81, 0, 0, 0.5)', borderColor: 'linear-gradient(to right, #EA9841, #ECB74B)', textColor: '#F7E5BE' },
    5: { bgColor: '#1C474E', borderColor: 'linear-gradient(to right,#EBBB94,#EBBB94)', textColor: '#EBBB94' }
};
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

    // --- 新增的程式碼：根據樣式更新顏色 ---
    const colors = styleColorsMap[styleNumber];
    if (colors) {
        document.documentElement.style.setProperty('--nickname-bg-color', colors.bgColor);
        document.documentElement.style.setProperty('--nickname-border-color', colors.borderColor);
        document.documentElement.style.setProperty('--nickname-text-color', colors.textColor);
    }

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




// ... (其他函式) ...

function switchScreen(targetId) {
    const screens = document.querySelectorAll('.screen');
    const bottomContent = document.querySelector('.bottom-content-section');
    const currentScreenId = document.querySelector('.screen.active')?.id;

    // 如果從 screen1 離開，先執行滑出動畫
    let animationOutPromise;
    if (currentScreenId === 'screen1' && bottomContent) {
        bottomContent.classList.remove('show');
        animationOutPromise = new Promise(resolve => setTimeout(resolve, 500));
    } else {
        animationOutPromise = Promise.resolve();
    }

    animationOutPromise.then(() => {
        // 隱藏所有畫面，並顯示目標畫面
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });

        const target = document.querySelector(`#screen${targetId}`);
        if (target) {
            target.classList.add('active');
            target.style.display = 'flex';

            updateDisplayImage();
            updateOverlayImage();

            // 如果目標畫面是 screen1，則執行滑入動畫
            if (targetId === '1' && bottomContent) {
                // 在新增 .show class 之前，強制瀏覽器重繪，以確保初始狀態被正確渲染
                bottomContent.offsetHeight;
                bottomContent.classList.add('show');
            }

            // 如果切回 screen0，重設所有狀態
            if (targetId === '0') {
                resetBlessingToDefault();
                resetStyleToDefault();
            }
            // Handle nickname transfer and display

            // 處理從 screen2 到 screen3 的暱稱傳輸
            if (currentScreenId === 'screen2' && targetId === '3') {
                const nicknameInput = document.querySelector('.nickname-input');
                if (nicknameInput) {
                    userNickname = nicknameInput.value || '匿名';
                }
            }

            // 如果目標畫面是 screen3，動態產生並顯示暱稱
            if (targetId === '3') {
                const nicknameDisplayContainer = document.getElementById('nicknameDisplay');
                if (nicknameDisplayContainer) {
                    // 清空舊的內容
                    nicknameDisplayContainer.innerHTML = '';

                    // 迴圈遍歷暱稱的每個字元，並創建一個 <p> 標籤
                    for (const char of userNickname) {
                        const p = document.createElement('p');
                        p.classList.add('nickname-textdisplay');
                        p.textContent = char;
                        nicknameDisplayContainer.appendChild(p);
                    }
                }
            }

        }
    });
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
// 在 DOMContentLoaded 事件監聽器內加入這段程式碼
document.getElementById('downloadNicknameButton').addEventListener('click', () => {
    const nicknameBar = document.querySelector('.nickname-bar');

    if (!nicknameBar) {
        console.error('找不到 .nickname-bar 元素');
        return;
    }

    // 使用 html2canvas 將 nickname-bar 轉換為圖片
    html2canvas(nicknameBar, {
        backgroundColor: null, // 設定背景為透明
        scale: 2 // 提高解析度，讓圖片更清晰
    }).then(canvas => {
        // 將 Canvas 轉換為圖片數據 URL
        const image = canvas.toDataURL('image/png');

        // 創建一個虛擬的 a 元素來下載圖片
        const link = document.createElement('a');
        link.href = image;
        link.download = '我的燈籠暱稱.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});