// 获取第一份数据
// 嵌套形式
$.get(URL1, (data1) => {
  console.log(data1);
  // 获取第二份数据
  $.get(URL2, (data2) => {
    console.log(data2);
    // 获取第三份数据
    $.get(URL3, (data3) => {
      console.log(data3);
      // 还可能获得更多的数据
    });
  });
});