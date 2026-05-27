<?php
namespace Madj2k\Klarokratie\Resource\Rendering;

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

use TYPO3\CMS\Core\Resource\FileInterface;

/**
 * Class YouTubeRenderer
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class YouTubeRenderer extends \TYPO3\CMS\Core\Resource\Rendering\YouTubeRenderer
{

    /**
     * Render for given File(Reference) html output
     *
     * @param \TYPO3\CMS\Core\Resource\FileInterface $file
     * @param int|string $width TYPO3 known format; examples: 220, 200m or 200c
     * @param int|string $height TYPO3 known format; examples: 220, 200m or 200c
     * @param array $options
     * @return string
    */
    public function render(FileInterface $file, $width, $height, array $options = []): string
    {
        $options = $this->collectOptions($options, $file);
        $src = $this->createYouTubeUrl($options, $file);
        if (empty($src)) {
            return '';
        }
        $attributes = $this->collectIframeAttributes($width, $height, $options);

        /**
         * For klaro consent-manager
         * @see https://klaro.org/docs/tutorials/contextual_consent
         */
        $attributes['data-name'] = 'youTube';
        return sprintf(
        '<iframe data-src="%s"%s></iframe>',
        htmlspecialchars($src, ENT_QUOTES | ENT_HTML5),
        empty($attributes) ? '' : ' ' . $this->implodeAttributes($attributes)
        );
    }

}



