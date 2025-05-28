// 当DOM内容加载完成后执行指定的函数
window.addEventListener('DOMContentLoaded', async () => {
    // 气泡的动态方向调整（需要JavaScript配合）
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('mouseover', function(e) {
            const tooltip = this.querySelector('.tooltip');
            const rect = tooltip.getBoundingClientRect();

            // 如果超出视窗顶部
            if (rect.top < 0) {
                tooltip.style.bottom = 'auto';
                tooltip.style.top = '120%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.querySelector('.tooltip::after').style.borderColor =
                    'transparent transparent rgba(0,0,0,0.8) transparent';
            }
        });
    });
});