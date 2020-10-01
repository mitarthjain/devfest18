function loginToSocial(data){
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/socialize/login',
        data: data,
        dataType: 'json',
        success: function(response) {
            console.log(response)
            window.location = "/"
        },
        error: function(request, status, error) {
            alert("error")
        }
    });
}

function getHashValue() {
    var location = window.location.hash;
    if(location == "")
    {
        location = undefined
    }

    return location
}

function viewThisReport(id){
    gmarker = window.data_markers[id];
    lat = !isNaN(parseFloat(gmarker.position.B));
    lng = !isNaN(parseFloat(gmarker.position.k));
    if(lat == false || lng == false){
        console.log("Invalid or No latlng");
        return
    }

    if(gmarker){
        try{
            google.maps.event.trigger(gmarker, 'click', {
                latLng: gmarker
            });

        }catch(err){
            console.log("Invalid or No latlng");
        }
    }
}

$(document).ready(function () {
     
    $('#header').scrollToFixed();

    $('#menu').menu();


    $('#popover-div').hide();
    $('.popover-btn').popover({
      html : true,
      content: function() {
        return $('#popover-div').html();
      }
    });

    /* ACCORDION */

    $('.agos-link').click(function (event){
      event.stopPropagation();
      $(this).find('.sub-item').toggle();

      $('.sub-item').on('click', function (event) {
          event.stopPropagation();
      });

    });

   /*
    $('.panel li:first-child .panel-content').show();
    $('.panel li:first-child .panel-heading').addClass('active');

    $(".panel-heading").click(function() {
        $(this).toggleClass("active").next('.panel-content').slideToggle(250).closest('li').siblings().find('.panel-heading').removeClass('active').next('.panel-content').slideUp(250);
    });
  */


    /*$('.head').each(function(){
      var $content = $(this).closest('li').find('.panel-content');

      $(this).click(function(e){
        e.preventDefault();
        $content.not(':animated').slideToggle();
      });

    });

    $('#main-nav > li > a,.switch-button-button,.switch-button-background').on("click", function () {
      $(this).closest('li').siblings().find('.sub-item, .sub-menu').hide().removeClass('checked');
      $('.switch-button-background').toggleClass('checked');
    });


    */

    $('.sub-menu').click(function (e){
      e.stopPropagation();
    });
    $('.close-btn').click(function () {
      $('.sub-item').hide();
    });

    // Flip Switch
    $('.switch-label').each(function(){
      var $content = $(this).closest('li').find('.switch-button-background');

      $(this).click(function(e){
       // e.preventDefault();
        $content.toggleClass('checked');
      });

    });

    // Random
    /*if($('.report-wrap').find('.reports-list-thumb').length > 0){
      $('.reports-list-excerpt').css('max-width','200px');
    }*/

    if($(window).width() <= 1025) {
      $("#header").after('<div style="display: block; width: 1440px; height: 40px; float: none;"></div>');
    }

   // Sidebar Reports
      //GET BROWSER WINDOW HEIGHT
    var currHeight = $(window).height();
    //SET HEIGHT OF SIDEBAR AND CONTENT ELEMENTS
    $('#sidebar-report, #map-content').css('height', currHeight);

    //ON RESIZE OF WINDOW
    $(window).resize(function() {

      //GET NEW HEIGHT
      var currHeight = $(window).height();
      //RESIZE BOTH ELEMENTS TO NEW HEIGHT
      $('#sidebar-report, #map-content').css('height', currHeight);

    });

    // Custom File Upload
    $('.image-upload input[type=file]').change(function(){
      $(this).next().find('input').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });

    if ($('#sidebar-report .panel-content').height() > 600) {
     $('#sidebar-report').css('padding-right', '15px');
    }

    $('#img-upload').customFileInput();
    $('.customfile-feedback').appendTo('.file-source');

    $('.respond-label').each(function(){
      var $content = $(this).closest('li').find('.report-respond-post');

      $(this).click(function(e){
       // e.preventDefault();
        $content.toggle();
      });
    });

    // Responder


    /*$(".comment-form textarea").keypress(function(event) {
      if (event.which == 13) {
          event.preventDefault();
          $("form").submit();
      }
    });*/
    
    $('.fancybox').fancybox();
  });

  $(document).on("click", function () {
     // $(this).find('.sub-item, .sub-menu').hide();
      //$('.switch-button-background').removeClass('checked');
  });

// Google Map

$(window).resize(function(){
    $('#map-canvas').css("height",$(window).height());
    $('#map-canvas').css("width",$(window).width());
    google.maps.event.trigger(map, 'resize');
    map.setZoom( map.getZoom() );
});

$(window).load(function () {
  /* Nice Scroll */
   $('#sidebar-report, .gm-style .gm-style-iw').niceScroll({
        //background: '#ffffff',
        cursorwidth: '8px',
        //cursorborder: '1px solid red',
        cursorcolor:"#c3c3c3",
        cursoropacitymax:1,
        cursorminheight: 10,
        railoffset: '20px',
        railalign: 'right',
        railpadding: { top:10, right:4, left:3, bottom:10 },
        //preservenativescrolling: false,
        autohidemode: true,
        scrollspeed: 100,
   });
});