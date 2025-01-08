# Klarokratie
Includes Klaro! consent-manager into TYPO3.
Completely file-based configuration for versioning without having to take care of database-entries.

This extension automatically adds a consent-overlay to embedded YouTube- and Vimeo-Videos.

More information on Klaro! can be found here:
* https://klaro.org/docs/getting-started
* https://github.com/klaro-org/klaro-js

## Installation & Basic Configuration
Simply install the extension.

If you want to use the available tracking-code-insertion for etracker or Google Analytics also include the TypoScript in your Rootpage (see below).
Otherwise you don't need the TypoScript.

After installation you have to define the path to your Klaro!-configuration in your website-setup (YAML).
You can also use extension-paths if you use a site-package.
```
klarokratie:
    klaro:
        config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
        customCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
Alternatively you can use this older notations (working, but discouraged for the sake of having clear namespaces):
```
klaro:
    config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
    customCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
```
klaroConfig: EXT:site_default/Resources/Public/Config/KlaroConfig.js
klaroCustomCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
If you do not define any configuration or custom CSS a default configuration with the default styles is used.
However, you can explicitly disable the klaro! Consent Manager by using the following setting:
```
klarokratie:
    klaro:
        disable: true
```
or - accordingly the discouraged (!!!) older versions -
```
klaro:
    disable: true
```
```
klaroDisable: true
```

## Advanced Configuration
### Optional: Use Tracking-Code insertion for etracker or Google Analytics
If you want to use the available tracking-code-insertion for etracker or Google Analytics also include the TypoScript in your Rootpage.
Otherwise you don't need the TypoScript.

**An enabled tracking-code-insertion would either include the current etracker-tracklet or the current Google Analytics tracking code.**

In the TypoScript you will find the following configuration options that should be self-explaining:
```
plugin.tx_klarokratie {
    settings {

        etracker {

            # cat=plugin.tx_klarokratie/etracker; type=bool; label=Enable etracker code insertion
            enable = 0

            # cat=plugin.tx_klarokratie/etracker; type=string; label=The secure code of your etracker account
            secureCode =

            # cat=plugin.tx_klarokratie/etracker; type=bool; label=Enable blocking cookies on page load (should be active according to GDPR)
            blockCookiesOnPageLoad = 1

            # cat=plugin.tx_klarokratie/etracker; type=bool; label=Respect DoNotTrack in browser (should be active according to GDPR)
            respectDoNotTrack = 1

            # cat=plugin.tx_klarokratie/etracker; type=bool; label=Block tracking script before consent
            blockScriptBeforeConsent = 0
        }

        googleAnalytics {

            # cat=plugin.tx_klarokratie/googleAnalytics; type=bool; label=Enable Google Analytics code insertion
            enable = 0

            # cat=plugin.tx_klarokratie/googleAnalytics; type=bool; label=Use Google Tag Manager
            useTagManager = 0

            # cat=plugin.tx_klarokratie/googleAnalytics; type=string; label=The Tag-ID of your Google Analytics account
            tagId =

            # cat=plugin.tx_klarokratie/googleAnalytic; type=bool; label=Block tracking script before consent
            blockScriptBeforeConsent = 0
        }
    }
}
```
There are also Klaro!-configuration-files for etracker and Google Analytics included.
This files handle the cookie-opt-in for your tracking according to GDPR.
You can use them by setting the desired file in your configuration:
```
klarokratie:
    klaro:
        config: EXT:site_default/Resources/Public/Config/KlaroConfigEtracker.js
```
or
```
klarokratie:
    klaro:
        config: EXT:site_default/Resources/Public/Config/KlaroConfigGoogleAnalytics.js
```
If you have a multi-site setup you can either define different tracking-options in each rootpage - or use the site-configuration (YAML).
Using the site-configuration is the preferred way. **Please note: settings in the site-configuration always override TypoScript-settings.**
```
klarokratie:
    googleAnalytics:
        enable: 1
        tagId: 123456
```

**IMORTANT:** to ensure that the tracking code is only executed if consent is given, set blockScriptBeforeConsent = 1.
For reasons of backwards-compatibility the default value currently is 0.

### Optional: Categories for etracker (et_areas)
If you use etracker there is a lib-object included which you can use to set hierarchical categories.

**IMPORTANT: In order to take effect, you have to use COA-objects in your lib-override-TypoScript!**

Below you find a hypothetical example that sets the current domain as first category and
as category of the second level the project-name is used that is fetched from the page-properties of the current page
via the field "tx_example_project" as reference to table "tx_example_domain_model_project".
The example below would result in the following category-value (et_areas) for etracker:
```
www.mydomain.com/myProjectName
```

```
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
```

## Re-Open Modal
If you want to show a menu-item on your website to re-open the modal, this extension
adds a field tx_klarokratie_open_modal to the pages-table including the corresponding TCA-configuration for convenient switching using the page properties in the backend.
You can use this field to render your menu accordingly and add the required JS to re-open the modal
instead of a normal link to the page.

Example:
```
<a class="nav-link {f:if(condition:'{menuItem.active}', then:'active')}"
   href="{f:if(condition:'{menuItem.data.tx_klarokratie_open_modal}', then:'#', else:'{menuItem.link}')}"
   {f:if(condition:'{menuItem.data.tx_klarokratie_open_modal}', then:'onclick="javascript:klaro.show(undefined, true);return false;"')}
   target="{menuItem.target}"
   title="{menuItem.title}"
   role="menuitem">
    <span>{title}</span>
</a>
```

## Custom CSS
It is possible to include a custom CSS-file for adaption the Klaro! overlay to your needs (see second line above).
The CSS partly uses variables which you can override in your custom CSS:
### Plain CSS
```
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
    margin:0;
}

body .klaro .cookie-modal .cm-btn,
body .klaro .context-notice .cm-btn,
body .klaro .cookie-notice .cm-btn {
    text-transform: uppercase;
    font-size:14px;
    font-weight: 600;
    border-radius: 8px;
    display: inline-block;
    border: 0px;
    cursor: pointer;
    letter-spacing: 0.01em;
    border: 2px solid #d63f11;
    transition: all 0.2s ease-out;
    line-height: 1.2;
    text-align:center;
    padding: 12px;
}

body .klaro .cookie-modal .cm-btn:hover,
body .klaro .context-notice .cm-btn:hover,
body .klaro .cookie-notice .cm-btn:hover {
    background-color:#fff;
    color: #d63f11;
}

body .klaro .context-notice .cm-btn.cm-btn-success-var,
body .klaro .cookie-notice .cm-btn.cm-btn-success-var,
body .klaro .cookie-modal .cm-btn.cm-btn-success-var,
body .klaro .cookie-modal .cm-btn.cm-btn-accept,
body .klaro .cookie-modal .cm-btn.cm-btn-decline {
    background-color: #505050;
    border: 2px solid #505050;
}

body .klaro .context-notice .cm-btn.cm-btn-success-var:hover,
body .klaro .cookie-notice .cm-btn.cm-btn-success-var:hover,
body .klaro .cookie-modal .cm-btn.cm-btn-success-var:hover,
body .klaro .cookie-modal .cm-btn.cm-btn-accept:hover,
body .klaro .cookie-modal .cm-btn.cm-btn-decline:hover {
    background-color:#fff;
    color: #505050;
}

body .klaro .context-notice .cm-list-label .slider,
body .klaro .cookie-notice .cm-list-label .slider,
 body .klaro .cookie-modal .cm-list-label .slider {
    background-color: #676767;
}

body .klaro .cookie-modal .cm-caret,
body .klaro .cookie-modal .cm-list-description {
    font-size: 0.8em ;
}

body .klaro .cookie-modal .cm-modal .cm-header,
body .klaro .cookie-modal .cm-list-title {
    font-size: 1.2em;
}
```
### Example with SASS and Bootstrap
```
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
        padding:0;
    }

    .context-notice {
        @include copy;
        background-color: $color-secondary-200;
        border-color: $color-secondary;
        border-radius:0;
    }

    label {
        margin:0;
    }

    .cookie-modal .cm-btn,
    .context-notice .cm-btn,
    .cookie-notice .cm-btn {
        border-radius: 0;
        @extend .cta;
        @extend .cta-small;
    }

    .context-notice .cm-btn.cm-btn-success-var,
    .cookie-notice .cm-btn.cm-btn-success-var,
    .cookie-modal .cm-btn.cm-btn-success-var,
    .cookie-modal .cm-btn.cm-btn-accept,
    .cookie-modal .cm-btn.cm-btn-decline {
        color: $color-white;
        background-color: $color-secondary;

        &:hover {
            background-color: $color-secondary-600;
        }
    }

    .context-notice .cm-list-label .slider,
    .cookie-notice .cm-list-label .slider,
    .cookie-modal .cm-list-label .slider {
        background-color: #676767;
    }

    .cookie-modal .cm-caret,
    .cookie-modal .cm-list-description {
        @include copy-small;
    }

    .cookie-modal .cm-header{
        @include copy;
        .title {
            @include h2;
        }
    }

    .cookie-modal .cm-list-title {
        @include h6;
        margin-bottom: 0
    }

    .cookie-modal .cm-footer-buttons {
        margin-top: 1rem;
    }
}
```
