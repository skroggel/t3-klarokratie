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
use TYPO3\CMS\Core\Page\Event\BeforeStylesheetsRenderingEvent;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class Stylesheet
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class Stylesheet
{
    /**
     * @param BeforeStylesheetsRenderingEvent $event
     * @return void
     */
    public function __invoke(BeforeStylesheetsRenderingEvent $event): void
    {
        $request = $this->getRequest();
        if (ApplicationType::fromRequest($request)->isBackend()) {
            return;
        }

        if ($event->isInline()) {
            return;
        }

        $cssFile = 'EXT:klarokratie/Resources/Public/Css/klaro.min.css';
        $customCssFile = '';
        if (
            ($site = $request->getAttribute('site'))
            && ($siteConfiguration = $site->getConfiguration())
        ){
            if (file_exists(GeneralUtility::getFileAbsFileName($siteConfiguration['klaroCustomCss']))) {
                $customCssFile = $siteConfiguration['klaroCustomCss'];
            }
        }

        $files = [
            'KlaroDefault' => $cssFile,
            'KlaroCustom' => $customCssFile,
        ];

        foreach ($files as $key => $file) {
            $asset = $event->getAssetCollector()->getStyleSheets();
            if (!($asset[$key] ?? false)) {
                $attributes = [
                    'defer' => 'defer',
                    'nonce' => $this->getNonceAttribute()
                ];
                $event->getAssetCollector()->addStyleSheet(
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
