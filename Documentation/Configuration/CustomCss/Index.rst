..  include:: /Includes.rst.txt

==========
Custom CSS
==========

A custom CSS file can be included to adapt the Klaro! overlay.

Add the CSS file in the site configuration:

..  code-block:: yaml

    klarokratie:
        klaro:
            customCss: EXT:site_default/Resources/Public/Css/Klaro.css

Plain CSS example
=================

..  code-block:: css

    body .klaro {
        --green1: #d63f11;
        --green2: #d63f11;
        --green3: #d63f11;
        --font-family: Helvetica, Arial, sans-serif;
    }

    body .klaro .context-notice {
        background-color: #f2f2f2;
        font-size: 1.2em;
    }

    body .klaro label {
        margin: 0;
    }

    body .klaro .purposes {
        display: none;
    }

    body .klaro .cookie-modal .cm-btn,
    body .klaro .context-notice .cm-btn,
    body .klaro .cookie-notice .cm-btn {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        display: inline-block;
        border: 2px solid #d63f11;
        cursor: pointer;
        letter-spacing: 0.01em;
        transition: all 0.2s ease-out;
        line-height: 1.2;
        text-align: center;
        padding: 12px;
    }

    body .klaro .cookie-modal .cm-btn:hover,
    body .klaro .context-notice .cm-btn:hover,
    body .klaro .cookie-notice .cm-btn:hover {
        background-color: #fff;
        color: #d63f11;
    }

    body .klaro .klaro-table + .klaro-table {
        margin-top: 1em;
    }

    body .klaro .klaro-table th {
        padding-right: 1em;
    }

Sass and Bootstrap example
==========================

..  code-block:: scss

    // We need at least the mixins
    @import "../../node_modules/bootstrap/scss/mixins";

    @import "default/00_mixins/_import";
    @import "default/10_config/_variables";
    @import "default/10_config/_maps";
    @import "default/20_basics/_cta";

    body .klaro {
        --green1: #{$color-primary};
        --green2: #{$color-primary};
        --green3: #{$color-primary};
        --font-family: #{$font-family-sans-serif};

        &.cm-as-context-notice {
            padding: 0;
        }

        .context-notice {
            @include copy;
            background-color: $color-secondary-200;
            border-color: $color-secondary;
            border-radius: 0;
        }

        label {
            margin: 0;
        }

        .purposes {
            display: none;
        }

        .cookie-modal .cm-btn,
        .context-notice .cm-btn,
        .cookie-notice .cm-btn {
            border-radius: 0;
            @extend .cta;
            @extend .cta-small;
        }

        .cookie-modal .cm-footer-buttons {
            margin-top: 1rem;
        }

        .klaro-table + .klaro-table {
            margin-top: 1em;
        }

        .klaro-table th {
            padding-right: 1em;
        }
    }

