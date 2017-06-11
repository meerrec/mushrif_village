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

    $('.preaty-select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });




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
}())

var welcomeCarousel = (function () {
  $('.owl-carousel').owlCarousel({
    items: 1,
    nav: true
  });
}())


$("#example_id").ionRangeSlider();
