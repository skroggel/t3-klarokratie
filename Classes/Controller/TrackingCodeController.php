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
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Extbase\Http\ForwardResponse;

/**
 * Class TrackingCodeController
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class TrackingCodeController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{

    /**
     * Constructor.
     *
     * @param \Madj2k\Klarokratie\MetaTag\CanonicalGenerator $canonicalGenerator
     */
    public function __construct(
        protected readonly CanonicalGenerator $canonicalGenerator,
    ) {
    }


    /**
     * Load tracking settings from site configuration.
     *
     * @return void
     */
    protected function initializeAction(): void
    {
        $this->settings['etracker'] = $this->getTrackingSettingsFromSiteConfiguration('etracker');
        $this->settings['googleAnalytics'] = $this->getTrackingSettingsFromSiteConfiguration('googleAnalytics');
    }


    /**
     * Returns tracking settings from the site configuration.
     *
     * @param string $type
     * @return array<string, mixed>
     */
    private function getTrackingSettingsFromSiteConfiguration(string $type): array
    {
        /**
         * @var mixed $site
         */
        $site = $this->getRequest()->getAttribute('site');

        if (!$site instanceof \TYPO3\CMS\Core\Site\Entity\Site) {
            return [];
        }

        /**
         * @var array<string|int, mixed> $siteConfiguration
         */
        $siteConfiguration = $site->getConfiguration();

        /**
         * @var mixed $settings
         */
        $settings = $siteConfiguration['klarokratie'][$type]
            ?? ($siteConfiguration['klaro'][$type]
                ?? ($siteConfiguration['klaro' . ucfirst($type)] ?? []));

        if (is_array($settings)) {
            return $settings;
        }

        return [];
    }


    /**
     * action loader
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function loaderAction(): ResponseInterface
    {
        if ($this->settings['etracker']['enable']) {
            return new ForwardResponse('etracker');
        }

        if ($this->settings['googleAnalytics']['enable']) {
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
        $this->view->assignMultiple([
            'url' => $this->canonicalGenerator->getPath($this->request),
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
        $this->view->assignMultiple([
            'url' => $this->canonicalGenerator->getPath($this->request),
            'domain' => getenv('HTTP_HOST')
        ]);

        return $this->htmlResponse();
    }


    /**
     * @return \Psr\Http\Message\ServerRequestInterface
     */
    protected function getRequest(): ServerRequestInterface
    {
        return $this->request;
    }
}
