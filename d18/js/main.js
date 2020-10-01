
$(function(){
	$('.responsive .panel-heading').click(function(){
		$(this).toggleClass('active');
	});

  $('.responsive .btn-toggle-alert').on('click', function() {        
    $('.responsive #scroll-wrap').fadeToggle('fast');
    $(this).toggleClass('inactive');
    $(this).text().indexOf('Show') != -1 ? $(this).text("Hide Alert") : $(this).text("Show Alerts");
 });

  $('.responsive .btn-report').click(function () {
    $('.responsive #map-canvas').addClass('report-mapsss');
  });
  
  var $viewportMeta = $('meta[name="viewport"]');
   $('input, select, textarea').bind('focus blur', function(event) {
    $viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' +        (event.type == 'blur' ? 10 : 1));
  });
});