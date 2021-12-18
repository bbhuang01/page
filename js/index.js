//此处编写京东商品详情页交互特效JS代码
$(function () {
  var salePriceEle = $("#sale-price");
  var prodNumTextEle = $("#prod-num-text");
  var specImg = $("#spec-img");
  // 1. 实现选择颜色的单选（通过红色边框实现）
  $(".prod-color").on("click", "span", function () {
    if ($(this).hasClass("color-choosen")) return;
    $(this).addClass("color-choosen").siblings().removeClass("color-choosen");
  });

  //2. 实现选择版本的单选（通过红色边框实现），并且商品单价会变成对应的价格值
  $(".ver-mod").on("click", "span", function () {
    if ($(this).hasClass("color-choosen")) return;
    $(this).addClass("color-choosen").siblings().removeClass("color-choosen");
    salePriceEle.html($(this).attr("data-price"));
  });

  //3. 商品购买数量会根据点击加减号实现数量的变化
  $("#add-num").on("click", function () {
    // console.log("add-num", prodNumTextEle.val());
    prodNumTextEle.val(Number(prodNumTextEle.val()) + 1);
  });

  $("#min-num").on("click", function () {
    // console.log("min-num");
    if (prodNumTextEle.val() === "1") return;
    prodNumTextEle.val(Number(prodNumTextEle.val()) - 1);
  });

  //4. 商品图片的切换效果，鼠标移动到小图上，即大图切换成对应图片
  $(".spec-items").on("mouseenter", "li", function () {
    if ($(this).hasClass("img-hover")) return;
    const imgUrl = $(this).find("img").attr("src");
    specImg.attr("src", imgUrl);
    $(this).addClass("img-hover").siblings().removeClass("img-hover");
  });

  //5. 放大镜效果，移动到大图上，则会出现放大镜
  var squareEle = $("#square");
  var previewAlertEle = $(".preview-alert");
  var obj = $(".main-img")[0].getBoundingClientRect();
  // var mainImgUrl;
  var leftWrap = obj.left;
  var topWrap = obj.top;

  $(".main-img").on("mouseenter", function () {
    squareEle.show();
    previewAlertEle.show();
    var mainImgUrl = $("#spec-img").attr("src");
    previewAlertEle.css({
      backgroundImage: "url(" + mainImgUrl + ")",
    });
  });

  $(".main-img").on("mousemove", function (e) {
    // console.log("mouseenter");
    //
    var offsetX = e.clientX - leftWrap;
    var offsetY = e.clientY - topWrap;
    // console.log(offsetX, offsetY);
    // 448
    var left, top;

    // 调整X方向
    if (offsetX <= 150) {
      left = 0;
    } else if (offsetX >= 300) {
      left = 150;
    } else {
      left = offsetX - 150;
    }

    // 调整Y方向
    if (offsetY <= 150) {
      top = 0;
    } else if (offsetY >= 300) {
      top = 150;
    } else {
      top = offsetY - 150;
    }

    squareEle.css({
      left: left + "px",
      top: top + "px",
    });

    previewAlertEle.css({
      backgroundPosition: -left * 4 + "px" + " " + -top * 4 + "px",
    });
  });

  $(".main-img").on("mouseleave", function () {
    // console.log("mouseleave");
    squareEle.hide();
    previewAlertEle.hide();
  });

  //6. 扩展：点击大图上的播放器图标则会实现视频播放。
  $("#video-btn").on("click", function () {
    $(".preview-wrap .video").show();
    $(this).hide();
  });

  $("#video-close").on("click", function () {
    $(".preview-wrap .video").hide();
    $("#video-btn").show();
  });
});
