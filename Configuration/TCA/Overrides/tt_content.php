<?php
defined('TYPO3') or die('Access denied.');
call_user_func(
    function (string $extKey) {

        $pluginConfig = ['tracking_code'];
        foreach ($pluginConfig as $pluginName) {

            $typo3Version = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
            $version = $typo3Version->getMajorVersion();
            /** @todo remove this if support for v10 is dropped */
            if ($version == 10) {

                // register normal plugin
                 \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
                    $extKey,
                    \TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToUpperCamelCase($pluginName),
                    'Klarokratie: Tracking Code'
                );

            } else {

                // register normal plugin
                $pluginSignature = \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
                    $extKey,
                    \TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToUpperCamelCase($pluginName),
                    'LLL:EXT:' . $extKey . '/Resources/Private/Language/locallang_db.xlf:plugin.' .
                    \TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToLowerCamelCase($pluginName) . '.title'
                );

                // add content element
                \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
                    'tt_content',
                    'CType',
                    [
                        'label' => 'LLL:EXT:' . $extKey . '/Resources/Private/Language/locallang_db.xlf:plugin.' .
                            TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToLowerCamelCase($pluginName) . '.title',
                        'value' => $pluginSignature,
                        'icon' => 'EXT:' . $extKey . '/Resources/Public/Icons/Extension.svg',
                        'group' => $extKey,
                    ]
                );

                // define TCA-fields
                // $GLOBALS['TCA']['tt_content']['types'][$pluginSignature] = $GLOBALS['TCA']['tt_content']['types']['list'];
                $GLOBALS['TCA']['tt_content']['types'][$pluginSignature]['showitem'] = '
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                    --palette--;;general,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
                    --palette--;;language,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                    --palette--;;hidden,
                    --palette--;;access,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
                    rowDescription,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,
            ';
            }
        }
    },
    'klarokratie'
);
