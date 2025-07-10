// [BlogRoot]\themes\butterfly\source\js\sun_moon.js

function switchNightMode() {
  // 1. 插入动画的 HTML 结构
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 延迟执行模式切换，让动画先行
  setTimeout(function() {
    // 获取当前主题模式 (通过 Butterfly 的标准方式：检查 <html> 的 data-theme)
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    // 调用 Butterfly 的原生函数进行切换
    if (nowMode === 'light') {
      activateDarkMode(); // 切换到深色模式
      saveToLocal.set('theme', 'dark', 2); // 存储状态
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    } else {
      activateLightMode(); // 切换到浅色模式
      saveToLocal.set('theme', 'light', 2); // 存储状态
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    }
    
    // 触发其他需要主题切换的插件（如评论系统）
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);

    // 3. 在模式切换后，开始让动画背景消失
    setTimeout(function() {
      const darkSky = document.querySelector('.Cuteen_DarkSky');
      if (darkSky) {
        darkSky.style.transition = 'opacity 1s';
        darkSky.style.opacity = '0';
        setTimeout(function() {
          darkSky.remove();
        }, 1000);
      }
    }, 2000); // 动画总时长
  }, 0); // 使用 setTimeout(..., 0) 确保在DOM更新后执行
}