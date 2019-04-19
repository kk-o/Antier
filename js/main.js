$(function() {
  $("body").addClass("loaded");

  /*------------------------------------------------------------------------------*/
  /* Mobile header
	/*------------------------------------------------------------------------------*/
  $(".mobnav").on("click", function() {
    $(this).toggleClass("active");

    if ($(".mobnav").hasClass("active")) {
      $("nav").toggleClass("is-active");
      $("body").toggleClass("nav-active");
    } else {
      $("nav").toggleClass("is-active");
      $("body").toggleClass("nav-active");
    }
  });

  $(window)
    .on("resize", function() {
      if ($(window).width() > 992) {
        $(".mobnav").hide();
        $("nav").removeClass("is-active");
        $("body").removeClass("nav-active");
        $(".mobnav").removeClass("active");
      } else {
        $(".mobnav").show();
      }
    })
    .resize();

  /*------------------------------------------------------------------------------*/
  /* Header Scroll
	/*------------------------------------------------------------------------------*/
  if ($(window).width() > 992) {
    var prev = 0;
    var header = $("header");

    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop >= 1) {
        $("header").addClass("fixed");
      } else {
        $("header").removeClass("fixed");
      }

      header.toggleClass("hide", scrollTop > prev);
      prev = scrollTop;
    });
  } else {
    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop >= 1) {
        $("header").addClass("fixed");
      } else {
        $("header").removeClass("fixed");
      }
    });
  }

  /*------------------------------------------------------------------------------*/
  /* Header Scroll
	/*------------------------------------------------------------------------------*/
  if ($("#home").length > 0) {
    $(window).scroll(function(i) {
      var scrollVar = $(window).scrollTop();
      $(".photo-bg").css({ opacity: (500 - scrollVar) / 500 });
    });
  }

  /*------------------------------------------------------------------------------*/
  /* Select Dropdown
	/*------------------------------------------------------------------------------*/
  $("select.styled").each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children("option").length;

    $this.addClass("select-hidden");
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next("div.select-styled");
    $styledSelect.text(
      $this
        .children("option")
        .eq(0)
        .text()
    );

    var $list = $("<ul />", {
      class: "select-options"
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $("<li />", {
        text: $this
          .children("option")
          .eq(i)
          .text(),
        rel: $this
          .children("option")
          .eq(i)
          .val()
      }).appendTo($list);
    }

    var $listItems = $list.children("li");

    $styledSelect.click(function(e) {
      e.stopPropagation();
      $("div.select-styled.active")
        .not(this)
        .each(function() {
          $(this)
            .removeClass("active")
            .next("ul.select-options")
            .hide();
        });
      $(this)
        .toggleClass("active")
        .next("ul.select-options")
        .toggle();
    });

    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass("active");
      $this.val($(this).attr("rel"));
      $list.hide();
      //console.log($this.val());
    });

    $(document).click(function() {
      $styledSelect.removeClass("active");
      $list.hide();
    });
  });
});

/*------------------------------------------------------------------------------*/
/* 60 FPS Parallax
/*------------------------------------------------------------------------------*/
function draw() {
  requestAnimationFrame(draw);
  // Drawing code goes here
  scrollEvent();
}
draw();

/*------------------------------------------------------------------------------*/
/* Parallax From Above
/*------------------------------------------------------------------------------*/
function scrollEvent() {
  if (!is_touch_device()) {
    viewportTop = jQuery(window).scrollTop();
    windowHeight = jQuery(window).height();
    viewportBottom = windowHeight + viewportTop;

    if (jQuery(window).width())
      jQuery('[data-parallax="true"]').each(function() {
        distance = viewportTop * jQuery(this).attr("data-speed");
        if (jQuery(this).attr("data-direction") === "up") {
          sym = "-";
        } else {
          sym = "";
        }
        jQuery(this).css(
          "transform",
          "translate3d(0, " + sym + distance + "px,0)"
        );
      });
  }
}

function is_touch_device() {
  return (
    "ontouchstart" in window || "onmsgesturechange" in window // works on most browsers
  ); // works on ie10
}
