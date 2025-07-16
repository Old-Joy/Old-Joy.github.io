/**
 * 已修复的昼夜切换功能
 * 修复思路：
 * 1. 统一逻辑：将原有的两套冲突逻辑合并为一套。
 * 2. 主题优先：以 Butterfly 主题的 activateDarkMode/activateLightMode 函数为准，确保网站主题正确切换。
 * 3. 动画同步：在切换主题的同时，手动为 <body> 元素添加或移除 .DarkMode 类，以触发你的自定义CSS动画。
 * 4. 动画流程：保留了先显示动画、再切换主题、最后移除动画元素的完整流程。
 */
function switchNightMode() {
  // 1. 立刻插入动画元素，让动画开始播放
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 判断当前的主题状态
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // 3. 延迟执行核心切换逻辑，让动画有时间渲染
  setTimeout(function() {
    if (isDark) {
      // 当前是深色模式，需要切换到->浅色模式
      activateLightMode(); // 使用 Butterfly 原生函数
      btf.saveToLocal.set('theme', 'light', 2); // 使用 Butterfly 原生方法存储状态
      document.querySelector('body').classList.remove('DarkMode'); // 移除动画触发类
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    } else {
      // 当前是浅色模式，需要切换到->深色模式
      activateDarkMode(); // 使用 Butterfly 原生函数
      btf.saveToLocal.set('theme', 'dark', 2); // 使用 Butterfly 原生方法存储状态
      document.querySelector('body').classList.add('DarkMode'); // 添加动画触发类
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
      
      // 显示提示（从你的旧代码中保留）
      if (typeof GLOBAL_CONFIG.Snackbar !== 'undefined' && GLOBAL_CONFIG.Snackbar.day_to_night) {
        btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      }
    }

    // 4. 更新可能存在的评论区主题（从你的旧代码中保留，是良好实践）
    if (typeof utterancesTheme === 'function') utterancesTheme();
    if (typeof FB === 'object') window.loadFBComment();
    if (window.DISQUS && document.getElementById('disqus_thread').children.length) {
      setTimeout(() => window.disqusReset(), 200);
    }

    // 5. 在主题切换后，开始准备移除动画效果
    setTimeout(function() {
      const darkSky = document.getElementsByClassName('Cuteen_DarkSky')[0];
      if (darkSky) {
        darkSky.style.transition = 'opacity 1s';
        darkSky.style.opacity = '0';
        setTimeout(function() {
          darkSky.remove();
        }, 1000);
      }
    }, 2000); // 动画持续2秒后开始淡出

  }, 100); // 延迟100毫秒执行，确保动画元素已创建
}