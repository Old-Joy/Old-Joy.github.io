// 当窗口滚动时，执行 percent 函数
window.onscroll = percent;

// 页面百分比函数
function percent() {
  // --- 计算滚动百分比 ---
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
  let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - document.documentElement.clientHeight;
  let result = Math.round(scrollTop / scrollHeight * 100);

  // 直接通过 class 获取箭头元素，更可靠
  const arrow = document.querySelector("#go-up .fa-arrow-up");
  const percentEl = document.querySelector("#percent");

  // 如果找不到元素，就直接退出，防止报错
  if (!arrow || !percentEl) {
    return;
  }

  // --- 根据百分比更新显示 (这是优化过的部分) ---
  if (result >= 95) {
    arrow.style.display = 'block';
    percentEl.style.display = 'none';
  } else {
    arrow.style.display = 'none';
    percentEl.style.display = 'block';
    // 在更新数字的同时，加上 '%' 号
    percentEl.innerText = result + '%';
  }
}