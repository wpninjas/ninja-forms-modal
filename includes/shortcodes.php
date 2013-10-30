<?php

function ninja_forms_modal_form_shortcode( $atts ){
    extract( shortcode_atts( array(
        'id' => '',
        'text_link' => '',
        'image_link' => '',
    // ...etc
    ), $atts ) );
    $link = '';
    if ( $image_link ) {
        $link .= '<a href="#ninja-forms-modal-' . esc_attr( $id ) . '" rel="modal:open" class="modal-link">';
            $link .= '<img src="' . esc_attr( $image_link ) . '" />';
        $link .= '</a>';
    } elseif ( $text_link ) {
        $link .= '<a href="#ninja-forms-modal-' . esc_attr( $id ) . '" rel="modal:open" class="modal-link">';
            $link .= esc_attr( $text_link );
        $link .= '</a>';
    } else {
        return;
    }

    if ( $id ) {
        add_action( 'ninja_forms_display_js', 'ninja_forms_modal_enqueue_scripts' );
        $modal = ninja_forms_modal_get_modal( $id );
    } else {
        return;
    }

    return $link . $modal;
}
add_shortcode( 'ninja_forms_modal_form', 'ninja_forms_modal_form_shortcode' );

function ninja_forms_modal_get_modal( $form_id ) {
    $modal = '<div id="ninja-forms-modal-' . esc_attr( $form_id ) . '" class="modal" style="display: none;">';
        $modal .= '<div class="modal-content">';
            $modal .= ninja_forms_return_echo( 'ninja_forms_display_form', esc_attr( $form_id ) );
        $modal .= '</div>';
    $modal .= '</div>';
    return $modal;
}