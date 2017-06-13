$(document).ready(function() {


    $('#fotorama').fotorama({
        arrowPrev: '<img src="../images/icon-phone.png" width="30" height="30" >',
        arrowNext: '<img src="/path-to-image/Next.png" width="30" height="30" >'
    });

  $('.gallery-colorbox').colorbox({
    // rel: 'album',
    fixed: true,
    maxWidth: '90%',
    maxHeight: '90%',
    current: '',
    title: function() {
      var el = $(this);
      if (el.data('title')) {
        return "<div class='title-wrapper'><div class='title'>" + el.data('title') + "</div><div class='description'>" + el.data('description') + "</div></div>";
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

  $(document).on('cbox_open', function() {
    $(document.body).css('overflow', 'hidden');
  }).on('cbox_closed', function() {
    $(document.body).css('overflow', '');
  });

  $('.preaty-select').each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

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
      $('div.select-styled.active').not(this).each(function() {
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



var proximityMap = (function() {
  if (document.getElementById('js-proximity-map')) {
    var layer;
    var mapMinZoom = 4;
    var mapMaxZoom = 4;
    var map = L.map('js-proximity-map', {
      maxZoom: mapMaxZoom,
      minZoom: mapMinZoom,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomSnap: 1
      // zoomControl:false
    }).setView([0, 0], mapMaxZoom);

    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 1175], mapMaxZoom),
        map.unproject([2266, 0], mapMaxZoom));

    map.fitBounds(mapBounds);

    layer = L.tileLayer('/data/proximity/{z}/{x}/{y}.jpg', {
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      continuousWorld: 'false',
      bounds: mapBounds,
    }).addTo(map);
  } else {
    return
  }
}())

var glanceMap = (function() {
  if (document.getElementById('mapid')) {
    var layer;
    var mapMinZoom = 4;
    var mapMaxZoom = 4;
    var map = L.map('mapid', {
      maxZoom: mapMaxZoom,
      minZoom: mapMinZoom,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomSnap: 1,
      crs: L.CRS.Simple,
      // zoomControl:false
    }).setView([0, 0], mapMaxZoom);

    var mapBounds = new L.LatLngBounds(
        map.unproject([0, 1175], mapMaxZoom),
        map.unproject([2266, 0], mapMaxZoom));

    map.fitBounds(mapBounds);

    layer = L.tileLayer('/data/glance/{z}/{x}/{y}.jpg', {
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      continuousWorld: 'false',
      bounds: mapBounds,
    }).addTo(map);
  }
}())

var welcomeCarousel = (function() {
  $('.owl-carousel').owlCarousel({
    items: 1,
    nav: true
  });
}())


$("#example_id").ionRangeSlider();
// Elements
var scene = document.querySelector('.section-hero');
var input = document.querySelector('.section-hero');

// Pretty simple huh?
var parallax = new Parallax(scene, {
  hoverOnly: true,
  relativeInput: true,
  inputElement: input,
  scaleX: 3,
  scaleY: 12
});

$(document).ready(function() {
  $('.bxslider').bxSlider({
    pagerCustom: '#bx-pager'
  });
});
