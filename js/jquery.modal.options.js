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

  $( window ).resize(function() {
    ninja_forms_resize_modal();
  });

  $(document).on( 'mp_page_change.modal_resize', function( e, form_id, new_page, old_page ) {
    ninja_forms_resize_modal();
  });

  $(document).on( 'ninja_forms_conditional_show', function(e) {
    ninja_forms_resize_modal();
  });  

  $(document).on( 'ninja_forms_conditional_hide', function(e) {
    ninja_forms_resize_modal();
  });

});

function ninja_forms_resize_modal() {
    var content = jQuery(".modal").find(".modal-content").find(".ninja-forms-form-wrap");
    var page_height = jQuery(content).height();
    var page_width = jQuery(content).width();

    var window_height = jQuery(window).height();
    var window_width = jQuery(window).width();

    var modal_width = page_width;
    var modal_height = page_height + 26;

    if ( modal_height > ( window_height / 1.2 ) ) {
      modal_height = window_height / 1.2;
    }

    jQuery(".modal").height( modal_height );
    jQuery(".modal-content").css("padding", 15);
    jQuery.modal.resize();    
}
