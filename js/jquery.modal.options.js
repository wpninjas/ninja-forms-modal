jQuery( document ).ready(function($) {

  var wheight = $(window).height();
  var mheight = $(".nf-modal").outerHeight();

  $('a.nf-modal-link').on( "click", function() {
    $(this).modal({
      closeText: '&times;',
      fadeDuration: 250
    });

    return false;
  });

  if(mheight > wheight) {
    var height = $(window).height() - 150;
    $(".nf-modal").height(height);
  }

  $(document).on($.modal.OPEN, function(event, modal) {
    $(document).off( 'mp_page_change.scroll' );
    $('html').css('overflow', 'hidden');

    ninja_forms_resize_modal();
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
    var content = jQuery(".nf-modal.modal.current").children(".nf-modal-content").children(".ninja-forms-cont");
    var page_height = jQuery(content).outerHeight(true);
    var current_modal_height = jQuery(".nf-modal.current").height();

    var window_height = jQuery(window).height();

    var modal_height = page_height + 30;

    if ( modal_height > ( window_height / 1.2 ) ) {
      modal_height = window_height / 1.2;
    }

    if ( current_modal_height != modal_height ) {
      jQuery(".nf-modal.current").height( modal_height );
      jQuery(".nf-modal.current").children(".nf-modal-content").height(modal_height - 30);
      jQuery(".nf-modal.current").children(".nf-modal-content").css("padding", 15);      
    }

    jQuery.modal.resize();
}