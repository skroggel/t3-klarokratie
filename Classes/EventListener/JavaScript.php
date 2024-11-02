<?php
declare(strict_types=1);
namespace Madj2k\Klarokratie\EventListener;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\ApplicationType;
use TYPO3\CMS\Core\Page\Event\BeforeJavaScriptsRenderingEvent;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * Class JavaScript
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class JavaScript
{

    /**
     * @param \TYPO3\CMS\Core\Page\Event\BeforeJavaScriptsRenderingEvent $event
     * @return void
     */
    public function __invoke(BeforeJavaScriptsRenderingEvent $event): void
    {
        $request = $this->getRequest();

        if (ApplicationType::fromRequest($request)->isBackend()) {
            return;
        }

        if ($event->isInline()) {
            return;
        }

        $jsFile = 'EXT:klarokratie/Resources/Public/JavaScript/klaro-no-css.js';
        $configFile = 'EXT:klarokratie/Resources/Public/Config/klaroConfig.js';
        if (
            ($site = $request->getAttribute('site'))
            && ($siteConfiguration = $site->getConfiguration())
        ){

            $disable = (bool) ($siteConfiguration['klarokratie']['klaro']['disable'] ?? ($siteConfiguration['klaro']['disable'] ?? ($siteConfiguration['klaroDisable'] ?? false)));
            if ($disable) {
                return;
            }

            $pathFromConfig = ($siteConfiguration['klarokratie']['klaro']['config'] ?? ($siteConfiguration['klaro']['config'] ?? ($siteConfiguration['klaroConfig'] ?? '')));
            if (
                ($pathFromConfig)
                && (file_exists(GeneralUtility::getFileAbsFileName($pathFromConfig)))
            ){
                $configFile = $pathFromConfig;
            }
        }
        $files = [
            'KlaroConfig' => $configFile,
            'KlaroDefault' => $jsFile
        ];

        foreach ($files as $key => $file) {
            $asset = $event->getAssetCollector()->getJavaScripts();
            if (!($asset[$key] ?? false)) {
                $attributes = [
                    'defer' => 'defer',
                    'nonce' => $this->getNonceAttribute()
                ];
                $event->getAssetCollector()->addJavaScript(
                    $key,
                    $file,
                    $attributes,
                    ['priority' => true]
                );
            }
        }
    }


    /**
     * @return string
     */
    private function getNonceAttribute (): string
    {
        $nonceAttribute = $this->getRequest()->getAttribute('nonce');
        if ($nonceAttribute) {
            return $nonceAttribute->consume();
        }

        return '';
    }


    /**
     * @return ServerRequestInterface
     */
    private function getRequest(): ServerRequestInterface
    {
        return $GLOBALS['TYPO3_REQUEST'];
    }

}
