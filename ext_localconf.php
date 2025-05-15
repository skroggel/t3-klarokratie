<?php
defined('TYPO3_MODE') || defined('TYPO3') ||die('Access denied.');

call_user_func(
    function($extKey)
    {

        //=================================================================
        // Configure Plugins
        //=================================================================
        $typo3Version = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
        $version = $typo3Version->getMajorVersion();
        /** @todo remove this if support for v10 is dropped */
        if ($version == 10) {

            \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
                'Madj2k.Klarokratie',
                'TrackingCode',
                ['TrackingCode' => 'loader, etracker, googleAnalytics'],

                // non-cacheable actions
                [],

            );

        } else {
            \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
                $extKey,
                'TrackingCode',
                [\Madj2k\Klarokratie\Controller\TrackingCodeController::class => 'loader, etracker, googleAnalytics'],

                // non-cacheable actions
                [],
                \TYPO3\CMS\Extbase\Utility\ExtensionUtility::PLUGIN_TYPE_CONTENT_ELEMENT
            );
        }

        //=================================================================
        // XClasses
        //=================================================================
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Core\Resource\Rendering\YouTubeRenderer::class] = [
            'className' => \Madj2k\Klarokratie\Resource\Rendering\YouTubeRenderer::class
        ];
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Core\Resource\Rendering\VimeoRenderer::class] = [
            'className' =>\Madj2k\Klarokratie\Resource\Rendering\VimeoRenderer::class
        ];

    },
    'klarokratie'
);
