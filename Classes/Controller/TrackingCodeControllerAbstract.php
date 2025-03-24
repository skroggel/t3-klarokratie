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
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamFactoryInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Http\ForwardResponse;
use TYPO3\CMS\Extbase\Mvc\View\ViewInterface;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * Class CodeControllerAbstract
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 * @deprecated since v11
 * @todo can be removed when support for v10 is dropped
 */
$typo3Version = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);
$version = $typo3Version->getMajorVersion();
if ($version <= 10) {
    abstract class TrackingCodeControllerAbstract extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
    {
        /**
         * @var \Psr\Http\Message\ResponseFactoryInterface
         * @todo can be removed when support for v10 is dropped
         */
        protected $responseFactory;


        /**
         * @var \Psr\Http\Message\StreamFactoryInterface
         * @todo can be removed when support for v10 is dropped
         */
        protected $streamFactory;


        /**
         * @param \Psr\Http\Message\ResponseFactoryInterface $responseFactory
         * @return void
         * @todo can be removed when support for v10 is dropped
         */
        public function injectResponseFactoryForV10(ResponseFactoryInterface $responseFactory)
        {
            $this->responseFactory = $responseFactory;
        }


        /**
         * @param \Psr\Http\Message\StreamFactoryInterface $streamFactory
         * @return void
         * @todo can be removed when support for v10 is dropped
         */
        public function injectStreamFactoryForV10(StreamFactoryInterface $streamFactory)
        {
            $this->streamFactory = $streamFactory;
        }
    }
} {
    abstract class TrackingCodeControllerAbstract extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {

    }
}
