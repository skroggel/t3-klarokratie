<?php
declare(strict_types=1);
namespace Madj2k\Klarokratie\Controller;

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

use Madj2k\Klarokratie\MetaTag\CanonicalGenerator;
use Madj2k\Klarokratie\MetaTag\CanonicalGeneratorLegacy;
use Madj2k\Klarokratie\MetaTag\CanonicalGeneratorLegacy10;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamFactoryInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Http\ForwardResponse;
use TYPO3\CMS\Extbase\Mvc\View\ViewInterface;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * Class CodeController
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 * @todo AbstractTrackingCodeController can be replaced \TYPO3\CMS\Extbase\Mvc\Controller\ActionController when support for v10 is dropped
 */
class TrackingCodeController extends AbstractTrackingCodeController
{

    /**
     * Load tracking-settings from site-configuration.
     * This overrides the typoscript-settings
     *
     * @return void
     */
    protected function initializeAction(): void
    {
        if (
            ($site = $this->getRequest()->getAttribute('site'))
            && ($siteConfiguration = $site->getConfiguration())
        ) {
            foreach (['googleAnalytics', 'etracker'] as $type) {
                if (
                    ($settings = ($siteConfiguration['klarokratie'][$type] ?? ($siteConfiguration['klaro'][$type] ?? ($siteConfiguration['klaro' . ucfirst($type)] ?? []))))
                    && (is_array($settings))
                ) {
                    foreach ($settings as $key => $value) {
                        $this->settings[$type][$key] = $value;
                    }
                }
            }
        }

    }


    /**
     * action loader
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function loaderAction(): ResponseInterface
    {
        if ($this->settings['etracker']['enable']) {

            /** @todo remove when support for version 10 is dropped */
            if (method_exists(self::class, 'forward')) {
                $this->forward('etracker');
            }
            return new ForwardResponse('etracker');
        }

        if ($this->settings['googleAnalytics']['enable']) {

            /** @todo remove when support for version 10 is dropped */
            if (method_exists(self::class, 'forward')) {
                $this->forward('googleAnalytics');
            }
            return new ForwardResponse('googleAnalytics');
        }

        return $this->htmlResponse();
    }


    /**
     * action etracker
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function etrackerAction(): ResponseInterface
    {
        /**
         * @var \Madj2k\Klarokratie\MetaTag\CanonicalGenerator $canonicalGenerator
         */

        /** @todo can be removed if support for v12 is dropped */
        $typo3Version = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
        if ($typo3Version->getMajorVersion() <= 10) {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGeneratorLegacy10::class);
        } else if ($typo3Version->getMajorVersion() <= 12) {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGeneratorLegacy::class);
        } else {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGenerator::class);
        }

        $this->view->assignMultiple([
            'url' => $canonicalGenerator->getPath($this->request),
            'domain' => getenv('HTTP_HOST')
        ]);

        return $this->htmlResponse();
    }


    /**
     * action googleAnalytics
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function googleAnalyticsAction(): ResponseInterface
    {
        /**
         * @var \Madj2k\Klarokratie\MetaTag\CanonicalGenerator $canonicalGenerator
         */
        /** @todo can be removed if support for v12 is dropped */
        $typo3Version = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
        if ($typo3Version->getMajorVersion() <= 10) {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGeneratorLegacy10::class);
        } else if ($typo3Version->getMajorVersion() <= 12) {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGeneratorLegacy::class);
        } else {
            $canonicalGenerator = GeneralUtility::makeInstance(CanonicalGenerator::class);
        }

        $this->view->assignMultiple([
            'url' => $canonicalGenerator->getPath($this->request),
            'domain' => getenv('HTTP_HOST')
        ]);

        return $this->htmlResponse();
    }



    /**
     * Returns a response object with either the given html string or the current rendered view as content.
     *
     * @param string|null $html
     * @todo can be removed when support for v10 is dropped
     */
    protected function htmlResponse(string $html = null): ResponseInterface
    {
        $typo3Version = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
        if ($typo3Version->getMajorVersion() < 11) {
            if ($this->view instanceof ViewInterface) {
                $this->response->appendContent($this->view->render());
            }
        }

        return $this->responseFactory->createResponse()
            ->withHeader('Content-Type', 'text/html; charset=utf-8')
            ->withBody($this->streamFactory->createStream((string)($html ?? $this->view->render())));
    }


    /**
     * @return \TYPO3\CMS\Extbase\Mvc\Request|\Psr\Http\Message\ServerRequestInterface
     */
    protected function getRequest() {

        $typo3Version = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
        if ($typo3Version->getMajorVersion() >= 11) {
            return $this->request;
        }

        return $GLOBALS['TYPO3_REQUEST'];
    }
}
