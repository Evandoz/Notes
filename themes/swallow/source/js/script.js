(function($){

  // Animation
  var $content = $('.content');
  $content.velocity("transition.slideDownIn", { duration: 1000, tagger: 300 });

  // Header
  var $header = $('#header'),
    $pageTitle = $('#page-title');

  var headerHeight = $header.outerHeight() + 50;

  var $qrcode = $('#qrcode');
  if ($qrcode) {
    $qrcode.on('click', function(){
      if ($qrcode.hasClass('on')) {
        $('#qr').fadeToggle(300);
      } else {
        $qrcode.addClass('on')
        $('#qr').qrcode({ size: 120, text: location.href}).fadeToggle(300);
      }
    });
  }

  //Scroll
  var $viewport = $('html, body'),
    $topAnchor = $('#top-anchor');
  $(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() <= 0) { $('#qr').fadeOut(100); }
      if ($pageTitle) { $(this).scrollTop() > headerHeight ? $header.addClass('sticky') : $header.removeClass('sticky'); }
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
  $('#post-content').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().prop("tagName") !== 'a') {
        $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
      }
    });
  });

  breakpoints({
    xlarge:  [ '1200px',  '1920px' ],
    large:   [ '992px',   '1199px' ],
    medium:  [ '768px',   '991px'  ],
    small:   [ '436px',   '767px'  ],
    xsmall:  [ null,      '480px'  ]
  });

  var option = {
    selector: 'a.gallery-item',
    popupWidth: 150,
    popupHeight: 150,
    popupCloserText: '',
    popupLoaderText: '',
    usePopupNav: true,
    usePopupDefaultStyling: false,
    windowMargin: 50
  };

  breakpoints.on('<=small', function() {
    option.windowMargin = 0;
  });

  breakpoints.on('>small', function() {
    option.windowMargin = 50;
  });

  $('#post-content').poptrox(option);
  // lightGallery($('.post-content')[0], option);
  // lightGallery($('.article-gallery')[0], option);



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

})(jQuery);
