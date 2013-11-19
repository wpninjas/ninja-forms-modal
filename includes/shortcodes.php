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
        $link .= '<a href="#ninja-forms-modal-' . esc_attr( $id ) . '" rel="nf-modal:open" class="nf-modal-link">';
            $link .= '<img src="' . esc_attr( $image_link ) . '" />';
        $link .= '</a>';
    } elseif ( $text_link ) {
        $link .= '<a href="#ninja-forms-modal-' . esc_attr( $id ) . '" rel="nf-modal:open" class="nf-modal-link">';
            $link .= esc_attr( $text_link );
        $link .= '</a>';
    } else {
        return;
    }

    if ( $id ) {
        global $ninja_forms_modal;
        if ( !isset ( $ninja_forms_modal ) ) {
            $ninja_forms_modal = array();
        }
        $ninja_forms_modal[] = $id;
        add_action( 'ninja_forms_display_js', 'ninja_forms_modal_enqueue_scripts' );
        add_action( 'wp_footer', 'ninja_forms_modal_output_modal' );
        //$modal = ninja_forms_modal_get_modal( $id );
    } else {
        return;
    }

    return $link;
}
add_shortcode( 'ninja_forms_modal_form', 'ninja_forms_modal_form_shortcode' );

function ninja_forms_modal_output_modal() {
    global $ninja_forms_modal;
    if ( is_array ( $ninja_forms_modal ) ) {
        foreach ( $ninja_forms_modal as $form_id ) {
            $modal = '<div id="ninja-forms-modal-' . esc_attr( $form_id ) . '" class="nf-modal" style="display: none;">';
                $modal .= '<div class="nf-modal-content">';
                    $modal .= ninja_forms_return_echo( 'ninja_forms_display_form', esc_attr( $form_id ) );
                $modal .= '</div>';
            $modal .= '</div>';
            echo $modal;
        }
    }
}