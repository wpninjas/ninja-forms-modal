jQuery( document ).ready(function($) {

  var wheight = $(window).height();
  var mheight = $(".modal").outerHeight();

  $('a.modal-link').on( "click", function() {
    $(this).modal({
      closeText: '&times;',
      fadeDuration: 250
    });

    return false;
  });

  if(mheight > wheight) {
    var height = $(window).height() - 150;
    $(".modal").height(height);
  }

  $( window ).resize(function() {

    var content = jQuery(".modal").find(".modal-content");
    var page_height = jQuery(content).height();
    var page_width = jQuery(content).width();

    var window_height = $(window).height();
    var window_width = $(window).width();

    var modal_width = page_width;
    console.log( window_width );
    var modal_height = page_height + 220;

    if ( modal_height > ( window_height / 1.2 ) ) {
      modal_height = window_height / 1.2;
      $(".modal").height( modal_height );
      var marginTop = - ( modal_height / 2 );
      $(".modal").css( "margin-top", marginTop );
    }

    if ( modal_width > ( window_width / 1.2 ) ) {
      modal_width = window_width / 1.2;
      var marginLeft = - ( modal_width / 2 );
      $(".modal").css( "margin-left", marginLeft );
    }
  });

  $(document).on($.modal.OPEN, function(event, modal) {
    $(document).off( 'mp_page_change.scroll' );
    $('html').css('overflow', 'hidden');
  });

  $(document).on($.modal.CLOSE, function(event, modal) {
    $('html').css('overflow', 'auto');
      jQuery(document).on( 'mp_page_change.scroll', function( e, form_id, new_page, old_page ) {
        ninja_forms_scroll_to_top( form_id );
      });
  });

  $(document).on( 'mp_page_change.modal_resize', function( e, form_id, new_page, old_page ) {
      var content = jQuery("#ninja_forms_form_" + form_id + "_mp_page_" + new_page);
      var page_height = jQuery(content).innerHeight();
      var window_height = jQuery(window).innerHeight();
      var modal_height = page_height + 220;

      if ( modal_height > ( window_height / 1.2 ) ) {
        modal_height = window_height / 1.2;
      }
      var marginTop = - ( modal_height / 2 );

      jQuery(".modal").animate({
        "margin-top": marginTop,
        "height": modal_height
      });
  });

  $(".modal-content").on('change', function(e) {
    var current_height = $(this).height();
    var content = $(this).find(".ninja-forms-form-wrap");
    var page_height = jQuery(content).height();
    if ( page_height > current_height ) {
      var window_height = $(window).height();
      var window_width = $(window).width();
      var modal_height = page_height + 220;

      if ( modal_height > ( window_height / 1.2 ) ) {
        modal_height = window_height / 1.2;
      }

      var marginTop = - ( modal_height / 2 );
        
      $(this).parent().css( "margin-top", marginTop );
      $(this).parent().height( modal_height );      
    }

  });

});
