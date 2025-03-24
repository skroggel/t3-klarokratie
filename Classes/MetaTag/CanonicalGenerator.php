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

use Psr\Http\Message\ServerRequestInterface;

/**
 * Class CanonicalGenerator
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 * @todo replace CanonicalGeneratorAbstract with \TYPO3\CMS\Seo\Canonical\CanonicalGenerator when support for v12 an below is dropped
 */
final class CanonicalGenerator extends CanonicalGeneratorAbstract
{

    /**
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @return string
     * @see \TYPO3\CMS\Seo\Canonical\CanonicalGenerator::generate()
     */
    public function getPath(ServerRequestInterface $request): string
    {

        // 1) Check if page has canonical URL set
        $href = $this->checkForCanonicalLink($request);

        if (empty($href)) {

            // 2) Check if page show content from other page
            $href = $this->checkContentFromPid($request);
        }
        if (empty($href)) {

            // 3) Fallback, create canonical URL
            $href = $this->checkDefaultCanonical($request);
        }


        return $href;
    }
}
