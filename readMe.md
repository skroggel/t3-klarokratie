# Klarokratie
Includes Klaro! consent-manager into TYPO3.
Completely file-based configuration for versioning without having to take care of database-entries.

This extension automatically adds a consent-overlay to embedded YouTube- and Vimeo-Videos.

More information on Klaro! can be found here:
* https://klaro.org/docs/getting-started
* https://github.com/klaro-org/klaro-js
## Installation & Configuration
Simply install the extension.

After that you have to define the path to your Klaro!-configuration in your website-setup (YAML).
You can also use extension-paths if you use a site-package.
```
klaro:
    config: EXT:site_default/Resources/Public/Config/KlaroConfig.js
    customCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
Alternatively you can use this notation (working, but discouraged for the sake of having clear namespaces):
```
klaroConfig: EXT:site_default/Resources/Public/Config/KlaroConfig.js
klaroCustomCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
If you do not define any configuration or custom CSS a default configuration with the default styles is used.
However, you can explicitly disable the klaro! consent manager by using the following setting:
```
klaro:
    disable: true
```
or - accordingly -
```
klaroDisable: true
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
