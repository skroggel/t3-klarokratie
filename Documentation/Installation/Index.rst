..  include:: /Includes.rst.txt

============
Installation
============

Install the extension
=====================

Install the extension in your TYPO3 project.

Composer installation
---------------------

If your project uses Composer, install the package with:

..  code-block:: bash

    composer require madj2k/t3-klarokratie

TYPO3 extension installation
----------------------------

After installation, make sure the extension is active in TYPO3.

Basic configuration
===================

Define the path to your Klaro! configuration in the site configuration:

..  code-block:: text

    config/sites/<site>/config.yaml

Example:

..  code-block:: yaml

    klarokratie:
        klaro:
            config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
            customCss: EXT:site_default/Resources/Public/Css/Klaro.css

Extension paths can be used when the files are stored in a site package.

Default behavior
================

If no Klaro! configuration or custom CSS is defined, the default configuration
and the default styles are used.

Disable the consent manager
===========================

The Klaro! consent manager can be explicitly disabled:

..  code-block:: yaml

    klarokratie:
        klaro:
            disable: true


Older configuration keys
========================

Older configuration keys are still supported, but discouraged. New projects
should use the ``klarokratie`` namespace.

Older notation:

..  code-block:: yaml

    klaro:
        config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
        customCss: EXT:site_default/Resources/Public/Css/Klaro.css

Alternative older notation:

..  code-block:: yaml

    klaroConfig: EXT:site_default/Resources/Public/Config/KlaroConfig.js
    klaroCustomCss: EXT:site_default/Resources/Public/Css/Klaro.css

Older disable notation:

..  code-block:: yaml

    klaro:
        disable: true

..  code-block:: yaml

    klaroDisable: true

