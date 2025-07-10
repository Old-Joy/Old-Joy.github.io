// [BlogRoot]\themes\butterfly\source\js\sun_moon.js

function switchNightMode() {
  // 1. 插入动画所需的HTML元素
  // 这一步与您的教程代码完全一致
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 统一的切换逻辑
  // 获取当前主题状态，这是Butterfly主题最可靠的判断方式
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  if (nowMode === 'light') {
    // ---- 从白天切换到黑夜 ----
    activateDarkMode(); // 使用Butterfly官方函数，切换整个博客的主题
    saveToLocal.set('theme', 'dark', 2);
    // 关键：为body添加 .DarkMode 类，这是触发您教程中“夜空”样式(Cuteen_DarkSky:before)的关键
    document.body.classList.add('DarkMode'); 
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
  } else {
    // ---- 从黑夜切换到白天 ----
    activateLightMode(); // 使用Butterfly官方函数
    saveToLocal.set('theme', 'light', 2);
    // 关键：移除 .DarkMode 类，让“夜空”消失
    document.body.classList.remove('DarkMode');
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
  }

  // 3. 执行其他必要的附加功能（例如评论区主题切换）
  // 这部分也来自您教程代码的后半段
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);

  // 4. 动画元素的清理
  // 您的CSS中，背景和星球的动画时长都是2秒
  // 因此，我们在2秒后开始让整个动画层淡出，以避免“卡住”
  const animationLayer = document.querySelector('.Cuteen_DarkSky');
  if (animationLayer) {
    setTimeout(() => {
      animationLayer.style.transition = 'opacity 1s';
      animationLayer.style.opacity = '0';
      // 在淡出动画（1秒）结束后，彻底移除该元素
      setTimeout(() => animationLayer.remove(), 1000);
    }, 2000); // 2秒后开始清理
  }
}