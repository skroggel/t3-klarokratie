..  include:: /Includes.rst.txt

============
Migration
============

Breaking Changes v14
=====================

The option ``etracker.blockScriptBeforeConsent`` is no longer available.

By default, etracker scripts are only loaded when consent is explicitly given.

To track users with etracker's cookieless mode regardless of consent, include:

..  code-block:: text

    EXT:klarokratie/Resources/Public/Config/Includes/EtrackerCookieless.js

According to etracker, this consent-free mode can be used in a GDPR-compliant
way. See:

* https://www.etracker.com/en/consent-free-and-legally-compliant/
