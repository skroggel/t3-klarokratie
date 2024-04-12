# Klarokratie
Includes Klaro! consent-manager into TYPO3.
Completely file-based configuration for versioning without having to take care of database-entries.

This extension automatically adds a consent-overlay to embedded YouTube- and Vimeo-Videos.

More information on Klaro! can be found here:
* https://klaro.org/docs/getting-started
* https://github.com/klaro-org/klaro-js
## Installation
Simply install the extension.

After that you have to define the path to your Klaro!-configuration in your website-setup (YAML).
You can also use extension-paths if you use a site-package.
```
klaroConfig: EXT:site_default/Resources/Public/Config/KlaroConfig.js
klaroCustomCss: EXT:site_default/Resources/Public/Css/Klaro.css
```
It is possible to include a custom CSS-file for adaption the Klaro! overlay to your needs (see second line above).
The CSS partly uses variables which you can override in your custom CSS:
```
.klaro {
    --green1: #d63f11;
    --green2: #d63f11;
    --green3: #d63f11;
    --font-family: Helvetica, Arial, sans-serif;
}
.klaro .context-notice {
    background-color: #f2f2f2;
    font-size: 1.2em;
}

.klaro label {
    margin:0;
}

.klaro .cookie-modal .cm-btn,
.klaro .context-notice .cm-btn,
.klaro .cookie-notice .cm-btn {
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

.klaro .cookie-modal .cm-btn:hover {
    background-color:#fff;
    color: #d63f11;
}

.klaro .context-notice .cm-btn.cm-btn-success-var,
.klaro .cookie-notice .cm-btn.cm-btn-success-var,
.klaro .cookie-modal .cm-btn.cm-btn-success-var,
.klaro .cookie-modal .cm-btn.cm-btn-accept,
.klaro .cookie-modal .cm-btn.cm-btn-decline {
    background-color: #505050;
    border: 2px solid #505050;
}

.klaro .context-notice .cm-btn.cm-btn-success-var:hover,
.klaro .cookie-notice .cm-btn.cm-btn-success-var:hover,
.klaro .cookie-modal .cm-btn.cm-btn-success-var:hover,
.klaro .cookie-modal .cm-btn.cm-btn-accept:hover,
.klaro .cookie-modal .cm-btn.cm-btn-decline:hover {
    background-color:#fff;
    color: #505050;
}

.klaro .context-notice .cm-list-label .slider,
.klaro .cookie-notice .cm-list-label .slider,
 .klaro .cookie-modal .cm-list-label .slider {
    background-color: #676767;
}

.klaro .cookie-modal .cm-caret,
.klaro .cookie-modal .cm-list-description {
    font-size: 0.8em ;
}

.klaro .cookie-modal .cm-modal .cm-header,
.klaro .cookie-modal .cm-list-title {
    font-size: 1.2em;
}
```
