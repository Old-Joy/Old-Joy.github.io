// [BlogRoot]\themes\butterfly\source\js\sun_moon.js

function switchNightMode() {
  // 1. 插入动画所需的HTML元素
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

  // 2. 使用一个短暂的延时来确保动画元素已创建，然后执行核心切换逻辑
  setTimeout(function() {
    // 获取当前的主题状态，这是Butterfly主题的判断方式
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    if (nowMode === 'light') {
      // 从白天切换到黑夜
      activateDarkMode(); // 使用Butterfly的函数切换到暗色模式
      saveToLocal.set('theme', 'dark', 2); // 保存用户选择
      document.querySelector('body').classList.add('DarkMode'); // 为你的动画添加DarkMode类
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun'); // 切换图标为太阳
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    } else {
      // 从黑夜切换到白天
      activateLightMode(); // 使用Butterfly的函数切换到亮色模式
      saveToLocal.set('theme', 'light', 2); // 保存用户选择
      document.querySelector('body').classList.remove('DarkMode'); // 为你的动画移除DarkMode类
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon'); // 切换图标为月亮
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    }

    // 统一处理其他需要根据主题切换而变化的内容
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);

    // 3. 在主题切换完成后，开始处理动画元素的退场
    setTimeout(function() {
      const darkSky = document.getElementsByClassName('Cuteen_DarkSky')[0];
      if (darkSky) {
        darkSky.style.transition = 'opacity 3s';
        darkSky.style.opacity = '0';
        // 在透明度动画结束后移除元素
        setTimeout(function() {
          darkSky.remove();
        }, 1000);
      }
    }, 2000);
  }, 10); // 短暂延时10毫秒
}