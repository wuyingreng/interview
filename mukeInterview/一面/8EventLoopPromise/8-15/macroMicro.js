const $p1 = $('<p>一段文字</p>');
const $p2=$('<p>一段文字</p>');
const $p3= $('<p>一段文字</p>');
$ ('#container')
.append ($p1)
.append ($p2)
.append ($p3)


console.log ('length', $ ('#container').children ().length );

// alert会阻断DOM渲染和JS执行，便于查看效果
alert('本次call stack结束，DOM结构已经更新，但尚未触发渲染')

