<?php
/*
Plugin Name: Ninja Forms - Modal
Plugin URI: http://ninjaforms.com/downloads/modal
Description: Allows Ninja Forms to open in a modal window.
Version: 1.0.2
Author: The WP Ninjas
Author URI: http://ninjaforms.com
Text Domain: ninja-forms-modal
Domain Path: /lang/
*/

define("NINJA_FORMS_MODAL_DIR", WP_PLUGIN_DIR."/".basename( dirname( __FILE__ ) ) );
define("NINJA_FORMS_MODAL_URL", plugins_url()."/".basename( dirname( __FILE__ ) ) );
define("NINJA_FORMS_MODAL_VERSION", "1.0.2");

function ninja_forms_modal_setup_license() {
  if ( class_exists( 'NF_Extension_Updater' ) ) {
    $NF_Extension_Updater = new NF_Extension_Updater( 'Modal', NINJA_FORMS_MODAL_VERSION, 'WP Ninjas', __FILE__ );
  }
}

//add_action( 'admin_init', 'ninja_forms_modal_setup_license' );

function ninja_forms_modal_load_lang() {

  /** Set our unique textdomain string */
  $textdomain = 'ninja-forms-modal';

  /** The 'plugin_locale' filter is also used by default in load_plugin_textdomain() */
  $locale = apply_filters( 'plugin_locale', get_locale(), $textdomain );

  /** Set filter for WordPress languages directory */
  $wp_lang_dir = apply_filters(
    'ninja_forms_wp_lang_dir',
    WP_LANG_DIR . '/'.basename( dirname( __FILE__ ) ).'/' . $textdomain . '-' . $locale . '.mo'
  );

  /** Translations: First, look in WordPress' "languages" folder = custom & update-secure! */
  load_textdomain( $textdomain, $wp_lang_dir );

  /** Translations: Secondly, look in plugin's "lang" folder = default */
  $plugin_dir = basename( dirname( __FILE__ ) );
  $lang_dir = apply_filters( 'ninja_forms_modal_lang_dir', $plugin_dir . '/lang/' );
  load_plugin_textdomain( $textdomain, FALSE, $lang_dir );

}
add_action('plugins_loaded', 'ninja_forms_modal_load_lang');

// register_activation_hook( __FILE__, 'ninja_forms_modal_activation' );

function ninja_forms_modal_enqueue_scripts() {

  wp_enqueue_script( 'jquery-modal',
    NINJA_FORMS_MODAL_URL .'/js/jquery.modal.min.js',
    array( 'jquery' ) );

  wp_enqueue_script( 'jquery-modal-options',
    NINJA_FORMS_MODAL_URL .'/js/jquery.modal.options.js',
    array( 'jquery', 'jquery-modal' ) );

  wp_enqueue_style( 'jquery-modal-css',
    NINJA_FORMS_MODAL_URL .'/css/ninja-forms-modal-display.css' );

}
//add_action( 'wp_enqueue_scripts', 'ninja_forms_modal_enqueue_scripts' );

// require_once( NINJA_FORMS_MODAL_DIR.'/includes/functions.php' );
// require_once( NINJA_FORMS_MODAL_DIR.'/includes/activation.php' );
require_once( NINJA_FORMS_MODAL_DIR.'/includes/shortcodes.php' );
