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
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Http\ApplicationType;
use TYPO3\CMS\Core\Page\Event\BeforeJavaScriptsRenderingEvent;
use TYPO3\CMS\Core\Site\Entity\Site;
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

    public function __invoke(BeforeJavaScriptsRenderingEvent $event): void
    {
        $request = $this->getRequest();

        if (ApplicationType::fromRequest($request)->isBackend() || $event->isInline()) {
            return;
        }

        $jsFile = 'EXT:klarokratie/Resources/Public/JavaScript/klaro-no-css.js';
        $defaultConfigFile = 'EXT:klarokratie/Resources/Public/Config/KlaroConfig.js';
        $minimalConfigFile = 'EXT:klarokratie/Resources/Public/Config/KlaroConfigMinimal.js';
        $configFile = $defaultConfigFile;
        $includes = [];

        $site = $request->getAttribute('site');
        $siteConfiguration = ($site instanceof Site) ? $site->getConfiguration() : null;

        if ($siteConfiguration) {
            $disable = (bool) ($siteConfiguration['klarokratie']['klaro']['disable']
                ?? ($siteConfiguration['klaro']['disable']
                    ?? ($siteConfiguration['klaroDisable'] ?? false)));
            if ($disable) {
                return;
            }

            // check for includes
            $includes = $siteConfiguration['klarokratie']['klaro']['includes'] ?? [];
            if (count($includes) > 0) {
                $configFile = $minimalConfigFile;
            }

            // check for custom base-config
            $pathFromConfig = ($siteConfiguration['klarokratie']['klaro']['config']
                ?? ($siteConfiguration['klaro']['config']
                    ?? ($siteConfiguration['klaroConfig'] ?? '')));
            if ($pathFromConfig) {
                $configFile = $pathFromConfig;
            }
        }

        $finalConfigFile = $this->combineConfigAndIncludes($configFile, $includes);
        if ($finalConfigFile) {
            $event->getAssetCollector()->addJavaScript(
                'KlaroConfig',
                $finalConfigFile,
                ['defer' => 'defer', 'nonce' => $this->getNonceAttribute()],
                ['priority' => true]
            );
        }

        $event->getAssetCollector()->addJavaScript(
            'KlaroLoader',
            $jsFile,
            ['defer' => 'defer', 'nonce' => $this->getNonceAttribute()],
            ['priority' => true]
        );
    }


    /**
     * Combines the configuration file and includes into a temporary file,
     * or returns the original file if no includes are present.
     * Returns an empty string if no valid file exists.
     *
     * @param string $configFile
     * @param array $includes
     * @return string
     */
    private function combineConfigAndIncludes(string $configFile, array $includes): string
    {
        $configPath = GeneralUtility::getFileAbsFileName($configFile);
        if (!file_exists($configPath)) {
            return '';
        }

        if (count($includes) < 1) {
            return $configFile;
        }

        $combinedJs = file_get_contents($configPath);
        foreach ($includes as $includeFile) {
            $absPath = GeneralUtility::getFileAbsFileName($includeFile);
            if (file_exists($absPath)) {
                $combinedJs .= "\n" . file_get_contents($absPath);
            }
        }

        if (trim($combinedJs)) {
            $fileName = 'klaro-combined-' . md5($combinedJs) . '.js';
            $relativePath = 'typo3temp/assets/' . $fileName;
            $absolutePath = Environment::getPublicPath() . '/' . $relativePath;

            GeneralUtility::writeFileToTypo3tempDir($absolutePath, $combinedJs);
            return $relativePath;
        }

        return '';
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
