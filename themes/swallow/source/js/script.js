(function($){
  //Scroll
  var $viewport = $('html, body');
  $(function() {
    $(window).scroll(function() {
      $(this).scrollTop() > $(this).height() ? $('#scrollup').addClass('on') : $('#scrollup').removeClass('on');
    });
    $('#scrollup').click(function() {
      $viewport.animate({scrollTop: 0}, 600);
    });
    $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
      if(e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
        $viewport.stop();
      }
    });
  });

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#header-nav-search').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.fadeIn(1).addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  function wrapOut(){
    startSearchAnim();
    $searchWrap.fadeOut(1).removeClass('on');
    stopSearchAnim();
  }

  $('.overlayer').on('click', function(){
    wrapOut();
  });

  $(window).on('resize', function(){
    wrapOut();
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
    var options = {
      selector: '.gallery-item',
    };
    $('.post-content').each(function(i, entry) {
      lightGallery(entry, options);
    });
    lightGallery($('.article-gallery')[0], options);
  }

  // Mobile nav
  var $toggle = $('#nav-toggle'),
    $nav = $('#nav-menu'),
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

  $('#banner, #content, #footer').on('click', function(){
    toggleOff();
  });

  $(window).on('resize', function(){
    toggleOff();
  });

})(jQuery);
