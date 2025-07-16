/**
 * 昼夜切换功能 (最终修复版 - 遵循原始逻辑)
 * 修复思路：
 * 1. 尊重原创：完全保留用户原始代码的“动画层”和“主题层”分离处理的意图。
 * 2. 修复冲突：将两个并行的操作放入一个有序的执行流程中，根除“竞态条件”这个核心bug。
 * 3. 修复动画Bug：
 * - 恢复用户设定的 3 秒淡出时长 (opacity 3s)。
 * - 修正了原代码中“淡出3秒但1秒后就移除元素”的bug，现在会等待完整的3秒。
 * 4. 无外部依赖：不再需要修改 custom.css，撤销上个版本的修改。
 */
function switchNightMode() {
  // 1. 创建动画元素 (来自您的原始代码)
  document.body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 将所有操作放入一个统一的、有序的执行队列中，以解决冲突
  setTimeout(() => {
    // 首先，执行核心的主题切换逻辑 (来自您的原始代码)
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      // 当前是深色，切换至浅色
      activateLightMode();
      btf.saveToLocal.set('theme', 'light', 2);
    } else {
      // 当前是浅色，切换至深色
      activateDarkMode();
      btf.saveToLocal.set('theme', 'dark', 2);
      if (typeof GLOBAL_CONFIG.Snackbar !== 'undefined' && GLOBAL_CONFIG.Snackbar.day_to_night) {
        btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      }
    }

    // 然后，执行独立的动画层逻辑 (来自您的原始代码)
    // 通过切换 body 上的 .DarkMode 类来控制动画表现
    if (document.body.classList.contains('DarkMode')) {
      document.body.classList.remove('DarkMode');
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    } else {
      document.body.classList.add('DarkMode');
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    }

    // 更新评论区等（来自您的原始代码）
    if (typeof utterancesTheme === 'function') utterancesTheme();
    if (window.DISQUS) setTimeout(() => window.disqusReset(), 200);

    // 最后，处理动画清理 (来自您的原始代码，但已修复bug)
    // 整个星球旋转动画持续2秒
    setTimeout(() => {
      const darkSky = document.querySelector('.Cuteen_DarkSky');
      if (darkSky) {
        // 【关键】完全按照您的设定，恢复3秒的淡出动画
        darkSky.style.transition = 'opacity 3s ease';
        darkSky.style.opacity = '0';

        // 【关键】修复了原代码的bug，现在会等待完整的3秒再移除元素
        setTimeout(() => {
          darkSky.remove();
        }, 3000);
      }
    }, 2000); // 2秒后开始执行淡出

  }, 100); // 给予一个微小的延迟，确保动画元素创建完成
}