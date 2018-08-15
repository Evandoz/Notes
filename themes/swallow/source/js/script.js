(function($){

  // Header
  var $header = $('#header'),
    $banner = $('#banner');

  var scrollHeight = $banner.height();


  //Scroll
  var $viewport = $('html, body'),
    $scrollup = $('#scrollup');
  $(function() {
    $(window).scroll(function() {
      $(this).scrollTop() > scrollHeight ? $header.addClass('sticky') : $header.removeClass('sticky');
      $(this).scrollTop() > $(this).height() ? $scrollup.addClass('on') : $scrollup.removeClass('on');
    });
    $scrollup.click(function() {
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

  // Mobile nav
  var $toggle = $('#icon-toggle'),
    $nav = $('#menu-list'),
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

  $toggle.on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $toggle.toggleClass('on');
    $nav.toggleClass('on');
    stopMobileNavAnim();
  });

  function toggleOff(){
    if (isMobileNavAnim || !$toggle.hasClass('on') || !$nav.hasClass('on')) return;
    $toggle.removeClass('on');
    $nav.toggleClass('on');
  }

  $('#banner, #content, #footer', '#up-layer').on('click', function(){
    toggleOff();
  });

  $(window).on('resize', function(){
    toggleOff();
  });


  // Search
  var $searchWrap = $('#search-wrap'),
    $downLayer = $('#down-layer'),
    $input = $('#search-input'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(){
    setTimeout(function(){
      isSearchAnim = false;
    }, searchAnimDuration);
  };

  $('#icon-search').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    $downLayer.addClass('on');
    setTimeout(function() {
      $input.focus();
    }, searchAnimDuration);
  });

  function wrapOut(){
    if (!isSearchAnim || !$searchWrap.hasClass('on') || !$downLayer.hasClass('on')) return;
    $searchWrap.removeClass('on');
    $downLayer.removeClass('on');
    stopSearchAnim();
  }

  $input.on('blur', function(){
    wrapOut();
  });

  $(window).on('resize', function(){
    wrapOut();
  });

})(jQuery);
