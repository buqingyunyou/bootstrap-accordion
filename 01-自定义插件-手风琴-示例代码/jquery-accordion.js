// 1.在jQuery函数的原型上扩展方法
$.fn.accordion1 = function (obj) {

  // 根据最小宽度, 决定最大宽度 (最小宽度, 可以在调用时, 通过obj传进来, 如果没有传, 则给一个默认值)
  // 最小宽度处理
  obj.minWidth = obj.minWidth || 100; //(此处不使用变量保存, 而是直接在对象上扩展属性, 使用属性进行保存, 因为该值可能直接通过obj传递进来)
  // 最大宽度处理
  var $lis = $(this).find('li');
  // obj.maxWidth = this.width() - (obj.minWidth * ?)
  obj.maxWidth = this.width() - (obj.minWidth * ($lis.length - 1))

  // console.log(obj.maxWidth);
  // 设置默认情况下平均宽度
  obj.avgWidth = this.width() / $lis.length;

  // console.log(obj.avgWidth);
  // (1)先得设置初始css样式
  // 因为每个li设置的宽度一样, 所以直接隐式迭代设置即可
  $lis.css({
    width: obj.avgWidth
  })

  // console.log(obj.colors);
  // 因为需要给每个li设置不同颜色, 所以需要使用each()方法
  $lis.each(function (index, element) {
    $(element).css({
      backgroundColor: obj.colors[index]
    })
  })

  // (2) 鼠标移入li, 则让当前li的宽度变大, 让其他li的宽度变小
  // 注册事件
  $lis.on('mouseenter', function () {
    // a.让当前li宽度变宽
    $(this).stop(true).animate({
      width: obj.maxWidth
    }).siblings().stop(true).animate({
      width: obj.minWidth
    })
  })


  // (3) 鼠标移出box, 则让所有li的宽度恢复到平均宽度
  $(this).on('mouseleave', function () {
    /* 
      css({})是直接设置, 没有动画效果
      animate({})是以动画效果形式设置
    */
    $lis.stop(true).animate({
      width: obj.avgWidth
    })
  })



}