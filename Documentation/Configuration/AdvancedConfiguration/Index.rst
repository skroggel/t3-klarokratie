..  include:: /Includes.rst.txt

=====================
Advanced configuration
=====================

Klarokratie supports modular configuration through include files.

A base configuration file can be combined with one or more additional
configuration files. This keeps reusable service definitions separate from the
base configuration.

Example
=======

..  code-block:: yaml

    klarokratie:
      klaro:
        config: EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js
        includes:
          - EXT:klarokratie/Resources/Public/Config/Includes/HCaptcha.js
          - EXT:klarokratie/Resources/Public/Config/Includes/YouTube.js
          - EXT:klarokratie/Resources/Public/Config/Includes/Vimeo.js
          - EXT:klarokratie/Resources/Public/Config/Includes/GoogleAnalytics.js

All configuration scripts are delivered as one combined JavaScript file to
reduce HTTP requests.

If no includes are defined, only the base configuration is loaded without
merging. This is the default behavior.

Included service configurations
===============================

The extension ships with include files for common services:

* etracker
* etracker cookieless and consent-free
* Meta Pixel / Facebook Pixel
* Google Ads
* Google Analytics
* Google Analytics cookieless (Consent Mode)
* Google Maps
* HCaptcha
* LinkedIn
* Vimeo
* YouTube

..  warning::

    While the cookieless version of etracker can be used in compliance with the GDPR even without explicit consent (see: https://www.etracker.com/en/consent-free-and-legally-compliant/),
    the use of the cookieless version of Google Analytics (aka Consent Mode) without consent is NOT GDPR-compliant! If you decide to use it anyway, you’ll be operating in a legal gray area, at the very least.

The files are located in:

..  code-block:: text

    EXT:klarokratie/Resources/Public/Config/Includes/

They can be used directly or copied and customized in a site package.

..  note::

    If includes are used, ``EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js``
    is used instead of ``EXT:klarokratie/Resources/Public/Config/KlaroConfig.js``.

