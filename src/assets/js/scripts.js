$(document).ready(function() {

    $('.gallery-colorbox').colorbox({
        // rel: 'album',
        fixed: true,
        maxWidth: '90%',
        maxHeight: '90%',
        current: '',
        title: function(){
            var el = $(this);
            if (el.data('title')) {
                return "<div class='title-wrapper'><div class='title'>"+ el.data('title') +"</div><div class='description'>" + el.data('description') + "</div></div>";
            } else {
                return "";
            }
        }
    });
    $('.highlight-colorbox').colorbox({
        rel: 'album',
        fixed: true,
        maxWidth: '90%',
        maxHeight: '90%',
        current: '',
        className: 'no-title'
    });

    $('a.disabled').click(function(e){
        e.preventDefault();
    });

    $('.page-nav').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - 80}, 500);

        if ($(window).width() > 991) {
        } else {
            closeMenu();
        }
    });

    $('.menu-trigger').click(function(e){
        e.preventDefault();
        if (!$(this).is('.show')){
            openMenu();
        } else {
            closeMenu();
        }
    });

    $(window).trigger('resize');
    $(window).trigger('scroll');


});

$(window).resize(function() {

    if ($(window).width() > 991) {
        showMenu();
    } else {
        hideMenu();
    }


});

var toogleLogo = (function () {
    var $logo = $('.logo-wrapper'),
     $wrapper = $('#bs-example-navbar-collapse-1');

    $wrapper.on('shown.bs.collapse', function () {
      console.log('shown')
      return $logo.animate({'opacity':.3})
    })
    $wrapper.on('hidden.bs.collapse', function () {
      console.log('hidden')
      return $logo.animate({'opacity':1})
    })
}());
$(window).load(function() {

    $(window).trigger('resize');



});

$(window).scroll( function(){
});

function showMenu(){
}
function hideMenu(){
    $('#mainnav').removeClass('show');
    $('.menu-trigger').removeClass('show');
}

function openMenu(){
    $('#mainnav').addClass('show');
    $('.menu-trigger').addClass('show');
}
function closeMenu(){
    $('#mainnav').removeClass('show');
    $('.menu-trigger').removeClass('show');
}

$("#example_id").ionRangeSlider();
