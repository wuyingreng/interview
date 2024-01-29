// 获取菜单和菜单项
var menu = document.getElementById('menu');
var menuItems = document.getElementsByClassName('menu-item');

// 为菜单添加捕获阶段的事件监听器
menu.addEventListener('click', function (event) {
  if (shouldDisableMenu()) {
    event.stopPropagation();
    event.preventDefault();
    alert('菜单当前不可用。');
  }
}, true); // 使用捕获阶段

// 为每个菜单项添加冒泡阶段的事件监听器
for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', function (event) {
    alert('点击了 ' + this.id);
  }, false); // 使用冒泡阶段
}

function shouldDisableMenu() {
  // 这里放置逻辑来决定是否应该禁用菜单
  // 返回true表示需要禁用菜单
  return true; // 举例说明，这里总是返回true
}