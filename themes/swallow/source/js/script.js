(function($){

  // Header
  var $header = $('#header'),
    $banner = $('#banner');

  var scrollHeight = $banner.height();


  //Scroll
  var $viewport = $('html, body'),
    $topAnchor = $('#top-anchor');
  $(function() {
    $(window).scroll(function() {
      $(this).scrollTop() > scrollHeight ? $header.addClass('sticky') : $header.removeClass('sticky');
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
  var $toggle = $('#menu-icon'),
    $mobileNav = $('#mobile-nav'),
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
    $mobileNav.toggleClass('on');
    stopMobileNavAnim();
  });

  function toggleOff(){
    if (isMobileNavAnim || !$toggle.hasClass('on') || !$mobileNav.hasClass('on')) return;
    $toggle.removeClass('on');
    $mobileNav.removeClass('on');
  }

  $mobileNav.on('click', function(){
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
