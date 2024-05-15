<?php
defined('TYPO3') or die('Access denied.');
call_user_func(
    function($extKey)
    {
        //===========================================================================
        // Add fields
        //===========================================================================
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages',
            [
                'tx_klarokratie_open_modal' => [
                    'exclude' => 0,
                    'label' => 'LLL:EXT:' . $extKey . '/Resources/Private/Language/locallang_db.xlf:pages.tx_klarokratie_open_modal',
                    'config' => [
                        'type' => 'check',
                        'renderType' => 'checkboxToggle',
                    ]
                ]
            ]
        );

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
            'pages',
            'tx_klarokratie_open_modal',
            '',
            'after:php_tree_stop'
        );

    },
    'klarokratie'
);
