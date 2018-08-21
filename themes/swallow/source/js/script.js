(function($){

  // Header
  var $header = $('#header'),
    $pageTitle = $('#page-title');

  var headerHeight = $header.outerHeight();

  //Scroll
  var $viewport = $('html, body'),
    $topAnchor = $('#top-anchor');
  $(function() {
    $(window).scroll(function() {
      $(this).scrollTop() > headerHeight ? $header.addClass('sticky') : $header.removeClass('sticky');
      $(this).scrollTop() > $(this).height() ? $topAnchor.addClass('on') : $topAnchor.removeClass('on');
    });
    $topAnchor.click(function() {
      $viewport.animate({scrollTop: 0}, 600);
    });
    $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
      if(e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
        $viewport.stop();
      }
    });
  });


  //Fit Vids
  $("body").fitVids();

  // Caption-justified
  $('.post-content').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().prop("tagName") !== 'a') {
        $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
      }
    });
  });
  if (lightGallery) {
    var option = {
      selector: '.gallery-item',
    };
    $('.post-content').each(function(i, entry) {
      lightGallery(entry, option);
    });
    lightGallery($('.article-gallery')[0], option);
  }


  var $content = $('#content');

  // Mobile nav
  var $menuIcon = $('#menu-icon'),
    $mobileNav = $('#mobile-nav'),
    $overLayer = $('#over-layer'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  var locateCenter = function(){
    var winHeight = $(window).height();
    var navHeight = $mobileNav.outerHeight();
    var margin = (winHeight - navHeight) / 2;
    $mobileNav.css('margin-top', margin + 'px');
  }

  $menuIcon.on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    locateCenter();
    $menuIcon.toggleClass('on');
    $mobileNav.fadeToggle(200);
    $overLayer.fadeToggle(400);
    stopMobileNavAnim();
  });

  function toggleOff(){
    if (isMobileNavAnim) return;
    $menuIcon.removeClass('on');
    $mobileNav.fadeOut(200);
    $overLayer.fadeOut(200);
  }

  $overLayer.on('click', function(){
    toggleOff();
  });

  $(window).on('resize', function(){
    toggleOff();
  });


  var $category = $('#category');
  if ($category) {
    var sumWidth = $category.outerWidth()
    var $item = $category.find('a:first-child');
    var eachWidth = $item.outerWidth()
    var number = Math.floor(sumWidth / eachWidth);
    var width = (sumWidth - eachWidth * number) / (number);
    $category.children('a').css('margin-bottom', width + 'px');
  }


})(jQuery);
