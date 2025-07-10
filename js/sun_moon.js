// [BlogRoot]\themes\butterfly\source\js\sun_moon.js

function switchNightMode() {
  // 步骤 1: 创建动画层
  // 与原始代码一致，立即在页面上创建动画元素。
  document.body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 步骤 2: 切换博客的核心主题
  // 这是同步执行的，它会立即调用Butterfly的函数来改变站点的基础颜色和设置。
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  if (nowMode === 'light') {
    activateDarkMode();
    saveToLocal.set('theme', 'dark', 2);
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
  } else {
    activateLightMode();
    saveToLocal.set('theme', 'light', 2);
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
  }

  // 步骤 3: 切换动画效果
  // 使用 setTimeout(..., 0) 将动画的类名切换推迟到下一个事件循环。
  // 这给了浏览器一个瞬间去处理上面步骤2中的主题变化，然后再开始播放CSS过渡动画。
  // 这模仿了原始代码的结构，很可能是解决渲染问题的关键。
  setTimeout(() => {
    if (nowMode === 'light') { // 如果之前是白天，现在要切换到黑夜
      document.body.classList.add('DarkMode'); // 添加此类来触发夜空CSS动画
    } else { // 如果之前是黑夜，现在要切换到白天
      document.body.classList.remove('DarkMode'); // 移除此类来隐藏夜空
    }
  }, 0);

  // 步骤 4: 清理动画元素
  // 在CSS动画播放完毕后（您的CSS中动画时长为2秒），移除动画层，防止“卡住”。
  const animationLayer = document.querySelector('.Cuteen_DarkSky');
  if (animationLayer) {
    setTimeout(() => {
      animationLayer.style.transition = 'opacity 1s';
      animationLayer.style.opacity = '0';
      setTimeout(() => animationLayer.remove(), 1000);
    }, 2000);
  }

  // 步骤 5: 执行其他附加功能
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}