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
const styleColorsMap = {
    1: { bgColor: '#10334D', borderColor: 'linear-gradient( to right,#EBBB94,#EBBB94)', textColor: '#EBBB94' },
    2: { bgColor: 'transparent', borderColor: 'linear-gradient( to right, #EA9841, #ECB74B)', textColor: '#F7E5BE' },
    3: { bgColor: '#F6CA61', borderColor: 'linear-gradient( to right,#904b72,#904b72)', textColor: '#0C4D50' },
    4: { bgColor: 'rgba(81, 0, 0, 0.5)', borderColor: 'linear-gradient(to right, #EA9841, #ECB74B)', textColor: '#F7E5BE' },
    5: { bgColor: '#1C474E', borderColor: 'linear-gradient(to right,#EBBB94,#EBBB94)', textColor: '#EBBB94' }
};

let currentSelectedStyle = 1;
let currentSelectedBlessing = blessings[0];
let userNickname = ''; // 新增全域變數來儲存暱稱

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
    document.querySelectorAll('.button-wrapper').forEach(btn => btn.classList.remove('selected'));
    const firstButton = document.querySelector('.button-wrapper[data-text="地表最強"]');
    if (firstButton) firstButton.classList.add('selected');
}
function resetStyleToDefault() {
    currentSelectedStyle = 1;
    updateDisplayImage();
    document.querySelectorAll('#screen0 .style-button').forEach(btn => btn.classList.remove('selected'));
    const firstStyleButton = document.querySelector('#screen0 .style-button[data-style="1"]');
    if (firstStyleButton) firstStyleButton.classList.add('selected');
}
function setupBlessingButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer1');
    if (!buttonsContainer) return;
    buttonsContainer.innerHTML = '';
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
    const firstButton = document.querySelector('.button-wrapper');
    if (firstButton) firstButton.classList.add('selected');
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
    buttonsContainer.addEventListener('scroll', updateScrollThumb);
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
    const firstStyleButton = document.querySelector('#screen0 .style-button');
    if (firstStyleButton) firstStyleButton.classList.add('selected');
}
// 新增的函式：即時更新暱稱顯示區塊
function updateNicknameDisplay() {
    const nicknameInput = document.querySelector('.nickname-input');
    const nicknameDisplayContainer = document.getElementById('nicknameDisplay2'); // 注意這裡應該是 'nicknameDisplay2'
    if (!nicknameInput || !nicknameDisplayContainer) return;
    nicknameDisplayContainer.innerHTML = '';
    const currentNickname = nicknameInput.value || '';
    userNickname = currentNickname; // 同步全域變數
    for (const char of currentNickname) {
        const p = document.createElement('p');
        p.classList.add('nickname-textdisplay');
        p.textContent = char;
        nicknameDisplayContainer.appendChild(p);
    }
}
function updateScreen3Nickname() {
    const nicknameDisplayContainer = document.getElementById('nicknameDisplay');
    if (!nicknameDisplayContainer) return;
    nicknameDisplayContainer.innerHTML = '';
    const textToDisplay = userNickname || '匿名';
    for (const char of textToDisplay) {
        const p = document.createElement('p');
        p.classList.add('nickname-textdisplay');
        p.textContent = char;
        nicknameDisplayContainer.appendChild(p);
    }
}
function switchScreen(targetId) {
    const screens = document.querySelectorAll('.screen');
    const bottomContent = document.querySelector('.bottom-content-section');
    const currentScreenId = document.querySelector('.screen.active')?.id;
    let animationOutPromise;
    if (currentScreenId === 'screen1' && bottomContent) {
        bottomContent.classList.remove('show');
        animationOutPromise = new Promise(resolve => setTimeout(resolve, 500));
    } else {
        animationOutPromise = Promise.resolve();
    }
    animationOutPromise.then(() => {
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
            if (targetId === '1' && bottomContent) {
                bottomContent.offsetHeight;
                bottomContent.classList.add('show');
            }
            if (targetId === '0') {
                resetBlessingToDefault();
                resetStyleToDefault();
            } 
            if (targetId === '3') {
                updateScreen3Nickname();
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
    
    // 監聽 screen2 的暱稱輸入框，即時更新顯示
// ... (之前的程式碼不變)

// ... (之前的程式碼不變)
// Add this variable at the top of your script with your other global variables
let isComposing = false;

// ... (Rest of your global variables and functions)

// 監聽 screen2 的暱稱輸入框，即時更新顯示
const nicknameInput = document.querySelector('.nickname-input');
if (nicknameInput) {
    nicknameInput.addEventListener('compositionstart', () => {
        isComposing = true;
    });

    nicknameInput.addEventListener('compositionend', () => {
        isComposing = false;
        // After composition ends, check the length and truncate if needed.
        if (nicknameInput.value.length > 6) {
            nicknameInput.value = nicknameInput.value.slice(0, 6);
            showNicknameAlert();
        } else {
            hideNicknameAlert();
        }
        updateNicknameDisplay();
    });

    nicknameInput.addEventListener('input', () => {
        // For direct input (English, numbers, paste), check the length immediately.
        if (!isComposing) {
            if (nicknameInput.value.length > 6) {
                nicknameInput.value = nicknameInput.value.slice(0, 6);
                showNicknameAlert();
            } else {
                hideNicknameAlert();
            }
        }
        updateNicknameDisplay();
    });
}

// Reusable functions to handle the alert message
function showNicknameAlert() {
    const nicknameInputParent = document.querySelector('.nickname-input').parentNode;
    let alertMessage = nicknameInputParent.querySelector('.nickname-alert');
    if (!alertMessage) {
        alertMessage = document.createElement('p');
        alertMessage.classList.add('nickname-alert');
        alertMessage.textContent = '暱稱最多只能輸入六個字喔！';
        nicknameInputParent.insertBefore(alertMessage, nicknameInputParent.querySelector('.nickname-input').nextSibling);
    }
}

function hideNicknameAlert() {
    const nicknameInputParent = document.querySelector('.nickname-input').parentNode;
    const alertMessage = nicknameInputParent.querySelector('.nickname-alert');
    if (alertMessage) {
        alertMessage.remove();
    }
}
    // 處理「上傳」按鈕的點擊事件
    const uploadAndSwitchButton = document.getElementById('uploadAndSwitch');
    if (uploadAndSwitchButton) {
        uploadAndSwitchButton.addEventListener('click', () => {
            const nicknameInput = document.querySelector('.nickname-input');
            const finalNickname = nicknameInput.value || '匿名';
            userNickname = finalNickname;
            const colors = styleColorsMap[currentSelectedStyle];
            if (!colors) {
                console.error('無效的樣式選擇！');
                return;
            }
            const bgColor = colors.bgColor;
            const borderColor = colors.borderColor;
            const textColor = colors.textColor;
            const baseWidth = 45;
            const charHeight = 28;
            const totalHeight = finalNickname.length * charHeight + 25;
            const borderRadius = 18;
            const borderWidth = 3;
            const borderColorIsGradient = borderColor.startsWith('linear-gradient');
            const borderColorId = 'gradientBorder';
            let defs = '';
            if (borderColorIsGradient) {
                const gradientColors = borderColor.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
                defs = `
                    <defs>
                        <linearGradient id="${borderColorId}">
                            <stop offset="0%" stop-color="${gradientColors[0]}" />
                            <stop offset="100%" stop-color="${gradientColors[1]}" />
                        </linearGradient>
                    </defs>
                `;
            }
            const textToDisplay = finalNickname;
            const svgTextContent = textToDisplay.split('').map((char, index) => {
                const y = (index * charHeight) + (totalHeight / 2) - ((textToDisplay.length - 1) * charHeight / 2);
                return `<text x="50%" y="${y}" dominant-baseline="middle" text-anchor="middle" font-family="Noto Sans TC, sans-serif" font-size="20" font-weight="bold" fill="${textColor}">${char}</text>`;
            }).join('');
            const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${baseWidth}" height="${totalHeight}">
                    ${defs}
                    <rect x="0" y="0" width="${baseWidth}" height="${totalHeight}" rx="${borderRadius}" fill="${bgColor}" />
                    <rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${baseWidth - borderWidth}" height="${totalHeight - borderWidth}" rx="${borderRadius}" fill="transparent" stroke="${borderColorIsGradient ? `url(#${borderColorId})` : borderColor}" stroke-width="${borderWidth}" />
                    ${svgTextContent}
                </svg>
            `;
            const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(this, 0, 0);
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'nickname.png';
                link.click();
                URL.revokeObjectURL(svgUrl);
                switchScreen('3');
            };
            img.src = svgUrl;
        });
    }
    // 初始化圖片
    updateDisplayImage();
    updateOverlayImage();
    // 初始化滑動條與背景圖
    updateScrollThumb();
    updateBackgroundImage();
});
window.addEventListener('load', initialize);
window.addEventListener('resize', initialize);