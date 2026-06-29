..  include:: /Includes.rst.txt

=============
Configuration
=============

Klarokratie is configured through the TYPO3 site configuration.

..  code-block:: text

    config/sites/<site>/config.yaml

..  toctree::
    :maxdepth: 2
    :titlesonly:

    AdvancedConfiguration/Index
    Tracking/Index
    Translation/Index
    CustomCss/Index

Basic Klaro! configuration
==========================

Set the JavaScript configuration and optional custom CSS:

..  code-block:: yaml

    klarokratie:
        klaro:
            config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
            customCss: EXT:site_default/Resources/Public/Css/Klaro.css

Configuration options
=====================

..  confval-menu::
    :display: table
    :type:
    :Default:

    ..  confval:: klarokratie.klaro.config
        :type: string
        :Default: ''

        Path to the Klaro! JavaScript configuration file.

    ..  confval:: klarokratie.klaro.customCss
        :type: string
        :Default: ''

        Path to a custom CSS file used to style the Klaro! overlay.

    ..  confval:: klarokratie.klaro.disable
        :type: boolean
        :Default: false

        Disables the Klaro! consent manager when set to ``true``.

    ..  confval:: klarokratie.klaro.includes
        :type: array
        :Default: []

        Additional JavaScript configuration files merged into the base
        configuration.

Default configuration
=====================

If no configuration or custom CSS is defined, Klarokratie uses a default
configuration with default styles.

