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

/**
 * Class CanonicalGenerator
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class CanonicalGenerator extends \TYPO3\CMS\Seo\Canonical\CanonicalGenerator
{

    /**
     * @return string
     */
    public function getPath(): string
    {
        $canonicalTag = $this->generate();
        preg_match('/href="([^"]+)"/i', $canonicalTag, $pregMatch);

        return $pregMatch[1] ?? '';
    }
}
