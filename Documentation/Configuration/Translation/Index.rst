..  include:: /Includes.rst.txt

======================
Translation
======================

Default translations can be overridden with an override file.

Example files are located in:

..  code-block:: text

    EXT:klarokratie/Resources/Public/Config/Overrides/

Copy the override file to your site package and add it as an include:

..  code-block:: yaml

    klarokratie:
      klaro:
        config: EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js
        includes:
          - EXT:site_default/Resources/Public/Config/Overrides/Translations.js
