<?php
defined('TYPO3_MODE') || defined('TYPO3') ||die('Access denied.');

call_user_func(
    function($extKey)
    {

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
