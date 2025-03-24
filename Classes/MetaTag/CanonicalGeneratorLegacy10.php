<?php
declare(strict_types=1);
namespace Madj2k\Klarokratie\MetaTag;

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

use Psr\EventDispatcher\EventDispatcherInterface;
use TYPO3\CMS\Core\Domain\Repository\PageRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Mvc\Request;


/**
 * Class CanonicalGenerator
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 * @todo can be removed if support for v12 is dropped
 * @deprecated since v12
 */
final class CanonicalGeneratorLegacy10 extends \TYPO3\CMS\Seo\Canonical\CanonicalGenerator
{

    /**
     * @param \TYPO3\CMS\Extbase\Mvc\Web\Request $request
     * @return string
     * @see \TYPO3\CMS\Seo\Canonical\CanonicalGenerator::generate()
     */
    public function getPath(Request $request): string
    {

        // 1) Check if page has canonical URL set
        $href = $this->checkForCanonicalLink();

        if (empty($href)) {

            // 2) Check if page show content from other page
            $href = $this->checkContentFromPid();
        }
        if (empty($href)) {

            // 3) Fallback, create canonical URL
            $href = $this->checkDefaultCanonical();
        }

        return $href;
    }
}
