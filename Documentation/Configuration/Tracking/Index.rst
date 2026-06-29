..  include:: /Includes.rst.txt

======================
Tracking with etracker or Google Analytics
======================

Tracking-code insertion
=======================

Klarokratie can optionally insert tracking code for etracker or Google Analytics.

Tracking-code insertion is configured in the site configuration:

..  code-block:: text

    config/sites/<site>/config.yaml

When enabled, Klarokratie inserts either the current etracker tracklet or the
current Google Analytics tracking code.

Google Analytics
----------------

Example configuration:

..  code-block:: yaml

    klarokratie:
        googleAnalytics:
            enable: true
            useTagManager: false
            tagId: G-XXXXXXXXXX

..  confval-menu::
    :display: table
    :type:
    :Default:

    ..  confval:: klarokratie.googleAnalytics.enable
        :type: boolean
        :Default: false

        Enables Google Analytics code insertion.

    ..  confval:: klarokratie.googleAnalytics.useTagManager
        :type: boolean
        :Default: false

        Uses Google Tag Manager instead of the Google Analytics tag directly.

    ..  confval:: klarokratie.googleAnalytics.tagId
        :type: string
        :Default: ''

        The tag ID of the Google Analytics or Google Tag Manager account.

etracker
--------

Example configuration:

..  code-block:: yaml

    klarokratie:
        etracker:
            enable: true
            secureCode: ''
            blockCookiesOnPageLoad: true
            respectDoNotTrack: true
            doNotUseSessionStorage: false

..  confval-menu::
    :display: table
    :type:
    :Default:

    ..  confval:: klarokratie.etracker.enable
        :type: boolean
        :Default: false

        Enables etracker code insertion.

    ..  confval:: klarokratie.etracker.secureCode
        :type: string
        :Default: ''

        The secure code of the etracker account.

    ..  confval:: klarokratie.etracker.blockCookiesOnPageLoad
        :type: boolean
        :Default: true

        Enables blocking cookies on page load. This should be active according
        to GDPR.

    ..  confval:: klarokratie.etracker.respectDoNotTrack
        :type: boolean
        :Default: true

        Respects the Do Not Track browser setting. This should be active
        according to GDPR.

    ..  confval:: klarokratie.etracker.doNotUseSessionStorage
        :type: boolean
        :Default: false

        Disables session storage.

        ..  warning::

            Disabling session storage has a negative impact on page and tracking
            performance.

etracker categories
===================

Klarokratie includes a TypoScript ``lib`` object that can be used to set
hierarchical etracker categories through ``et_areas``.

..  important::

    To make the override effective, use ``COA`` objects in your
    ``lib`` override TypoScript.

Example result
--------------

The following example can create an etracker category value like:

..  code-block:: text

    www.mydomain.com/myProjectName

TypoScript example
------------------

..  code-block:: typoscript

    lib {
        txKlarokratie {
            etracker {

                domain = COA
                domain {
                    10 = TEXT
                    10.data = getIndpEnv:HTTP_HOST
                }

                categoryLevel1 = COA
                categoryLevel1 {
                    30 = RECORDS
                    30 {
                        source.data = levelfield: -1 , tx_example_project, slide
                        tables = tx_example_domain_model_project
                        conf.tx_example_domain_model_project = TEXT
                        conf.tx_example_domain_model_project {
                            field = name
                            override.field = short_name
                        }

                        // Default value if empty
                        stdWrap.ifEmpty.cObject = COA
                        stdWrap.ifEmpty.cObject {
                            10 = TEXT
                            10.value = Default
                        }
                    }
                }
            }
        }
    }


Klaro! presets for tracking
===========================

The extension includes Klaro! configuration files for etracker and Google
Analytics. These files handle cookie opt-in for tracking.

etracker preset:

..  code-block:: yaml

    klarokratie:
        klaro:
            config: EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js
            includes:
              - EXT:klarokratie/Resources/Public/Config/Includes/Etracker.js

Google Analytics preset:

..  code-block:: yaml

    klarokratie:
        klaro:
            config: EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js
            includes:
              - EXT:klarokratie/Resources/Public/Config/Includes/GoogleAnalytics.js

