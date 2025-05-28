// 当DOM内容加载完成后执行指定的函数
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const files = [
            '常用',
            '程序员',
            '资源',
            '路由器'
        ];
        const secretFiles = [
            '色色'
        ];

        const jsonFiles = [];
        files.forEach(file => jsonFiles.push(`static/json/${file}.json`));
        secretFiles.forEach(file => jsonFiles.push(`static/json/secret/${file}.json`));

        // 使用Promise.all并行获取所有分类的数据
        const categories = await Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())));
        // 调用renderCategories函数渲染分类数据
        renderCategories(categories);
    } catch (error) {
        // 捕获数据加载过程中出现的错误
        console.error('数据加载失败:', error);
        // 向用户显示数据加载失败的提示信息
        alert('页面数据加载失败，请稍后刷新重试');
    }
});

// 渲染分类
function renderCategories(categories) {
    const app = document.getElementById('app');

    categories.forEach(data => {
        const section = createCategorySection(data);
        app.appendChild(section);
    });
}

// 创建分类区块
function createCategorySection(data) {
    const section = document.createElement('section');
    if (data.secret) {
        section.className = 'category-section hidden-category';
    } else {
        section.className = 'category-section';
    }

    section.innerHTML = `
                <h2 class="category-title" ondblclick="showSecretCategory()">${data.className}</h2>
                <div class="nav-grid">
                    ${data.items.map(createNavItem).join('')}
                </div>
            `;

    return section;
}

// 创建导航项
function createNavItem(item) {
    return `
                <a href="${item.url}" class="nav-item" target="_blank">
                    <img src="${getFavicon(item)}" class="nav-icon">
                    <span class="nav-text">${item.name}</span>
                    ${item.desc ? `
                        <div class="tooltip">
                            <strong>${item.name}</strong><br>
                            ${item.desc}
                        </div>
                    ` : ''}
                </a>
            `;
}

// 获取网站favicon
function getFavicon(item) {
    if (item.icon) {
        return item.icon;
    }
    try {
        const domain = new URL(item.url).origin;
        return `${domain}/favicon.ico`;
    } catch {
        return 'data:image/png;base64,...'; // 默认图标
    }
}

// 展示隐藏私密导航
function showSecretCategory() {
    document.querySelectorAll('.hidden-category').forEach(
        el => el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none'
    );
}
