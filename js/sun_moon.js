// [BlogRoot]\themes\butterfly\source\js\sun_moon.js

function switchNightMode() {
  // 1. 插入动画的 HTML 结构，确保它已存在
  if (document.querySelector('.Cuteen_DarkSky')) {
    return; // 如果动画正在进行，则不重复触发
  }
  document.body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 立即执行主题切换逻辑
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  if (nowMode === 'light') {
    activateDarkMode();
    saveToLocal.set('theme', 'dark', 2);
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
  } else {
    activateLightMode();
    saveToLocal.set('theme', 'light', 2);
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
  }

  // 触发其他需要主题切换的插件
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);

  // 3. 在2秒后（等待星球旋转动画播放得差不多），开始处理覆盖层的消失
  setTimeout(() => {
    const darkSky = document.querySelector('.Cuteen_DarkSky');
    if (darkSky) {
      // 添加 .fade-out class 来触发 CSS 中定义的淡出动画
      darkSky.classList.add('fade-out');

      // 监听 animationend 事件，即 CSS 动画播放结束时
      // { once: true } 表示这个监听器在触发一次后会自动移除，非常方便
      darkSky.addEventListener('animationend', function() {
        // 当淡出动画结束时，才安全地移除这个元素
        darkSky.remove();
      }, { once: true });
    }
  }, 2000); // 这个 2000ms (2秒) 是星球旋转动画的持续时间
}