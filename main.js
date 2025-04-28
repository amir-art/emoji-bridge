document.addEventListener('DOMContentLoaded', function() {
    const homePage = document.getElementById('home-page');
    const emojiPage = document.getElementById('emoji-page');
    const exploreBtn = document.getElementById('explore-btn');
    const backBtn = document.getElementById('back-btn');
    const emojiGrid = document.getElementById('emoji-grid');
    const categoriesContainer = document.getElementById('categories');
    const loader = document.getElementById('loader');

    const allCategories = [
        'smileys-and-people',
        'animals-and-nature',
        'food-and-drink',
        'travel-and-places',
        'activities',
        'objects',
        'symbols'
    ];

    let emojiCache = null;

    function initCategories() {
        categoriesContainer.innerHTML = '';
        const allBtn = document.createElement('button');
        allBtn.className = 'category-btn active';
        allBtn.textContent = 'All';
        allBtn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            allBtn.classList.add('active');
            displayEmojis(emojiCache);
        });
        categoriesContainer.appendChild(allBtn);
        
        allCategories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = formatCategoryName(category);
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                filterEmojisByCategory(category);
            });
            categoriesContainer.appendChild(btn);
        });
    }

    function formatCategoryName(category) {
        return category.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    async function loadAllEmojis() {
        try {
            loader.style.display = 'block';
            
            if (!emojiCache) {
                const response = await fetch('https://emojihub.yurace.pro/api/all');
                if (!response.ok) throw new Error('Emoji loading error');
                emojiCache = await response.json();
            }
            
            displayEmojis(emojiCache);
        } catch (error) {
            console.error('Error:', error);
            emojiGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Error no emoji</p>`;
        } finally {
            loader.style.display = 'none';
        }
    }

    function filterEmojisByCategory(category) {
        if (!emojiCache) return;
        
        if (category === 'all') {
            displayEmojis(emojiCache);
            return;
        }
        
        const filtered = emojiCache.filter(emoji => {
            const emojiCategory = emoji.category.toLowerCase().replace(/\s+/g, '-');
            return emojiCategory === category;
        });
        
        if (filtered.length === 0) {
            emojiGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No emoji in that categories</p>`;
        } else {
            displayEmojis(filtered);
        }
    }

    function displayEmojis(emojis) {
        emojiGrid.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiCard = document.createElement('div');
            emojiCard.className = 'emoji-card';
            emojiCard.innerHTML = `
                <div class="emoji">${emoji.htmlCode?.[0] || emoji.char}</div>
                <div class="emoji-name">${emoji.name}</div>
            `;
            emojiGrid.appendChild(emojiCard);
        });
    }

   
    function createRandomBubbles() {
        const hero = document.querySelector('.hero');
        const bubbleCount = 16;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 200 + 50;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            bubble.style.animationDelay = `${Math.random() * 10}s`;
            
            hero.appendChild(bubble);
        }
    }

    exploreBtn.addEventListener('click', function() {
        homePage.style.display = 'none';
        emojiPage.style.display = 'block';
        initCategories();
        loadAllEmojis();
        window.scrollTo(0, 0);
    });

    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        emojiPage.style.display = 'none';
        homePage.style.display = 'flex';
        window.scrollTo(0, 0);
    });
    createRandomBubbles();
});