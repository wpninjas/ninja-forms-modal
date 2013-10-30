jQuery( document ).ready(function($) {

  // $('.modal') {
  //     overlay: "#000",        // Overlay color
  //     opacity: 0.75,          // Overlay opacity
  //     zIndex: 1,              // Overlay z-index.
  //     escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  //     clickClose: true,       // Allows the user to close the modal by clicking the overlay
  //     closeText: '\00d7',     // Text content for the close <a> tag.
  //     showClose: true,        // Shows a (X) icon/link in the top-right corner
  //     modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  //     spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  //     showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  //     fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  //     fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  //   };
  //

  var wheight = $(window).height();
  var mheight = $(".modal").outerHeight();

  $('a.modal-link').on( "click", function() {
    $(this).modal({
      closeText: '&times;',
      fadeDuration: 250
    });

    // if(mheight > wheight) {
    //   var height = $(window).height() - 150;
    //   $(".modal").height(height);
    // }
    // if(mheight < wheight) {
    //   $(".modal").height(mheight);
    // }

    return false;
  });

  if(mheight > wheight) {
    var height = $(window).height() - 150;
    $(".modal").height(height);
  }

  $( window ).resize(function() {
    // $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
    var nh = $(window).height()
    $.modal.resize();
    if(nh != wheight && (mheight + 150) > nh) {
      var height = $(window).height() - 150;
      $(".modal").height(height);
    }

  });

  $( ".modal" ).resize(function() {
    // $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
    var nh = $(".modal").height()
    $.modal.resize();
    if(nh != wheight && (mheight + 150) > nh) {
      var height = $(window).height() - 150;
      $(".modal").height(height);
    }

  });

  $(document).on($.modal.OPEN, function(event, modal) {
    console.log( "Open Modal Event" );
    $('html').css('overflow', 'hidden');

    // $.ajax({
    //   // url: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname,
    //   context: document.body
    // }).done(function() {
    //   console.log( "AJAX" );
    //   $( this ).addClass( "done" );
    // });

  });

  $(document).on($.modal.CLOSE, function(event, modal) {
    $('html').css('overflow', 'auto');
  });

});
