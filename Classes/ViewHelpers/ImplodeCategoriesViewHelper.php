<?php
declare(strict_types=1);
namespace Madj2k\Klarokratie\ViewHelpers;

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

use Madj2k\Klarokratie\Utilities\CategoryUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Class ImplodeCategoriesViewHelper
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class ImplodeCategoriesViewHelper extends AbstractViewHelper
{

    /**
     * Initialize arguments
     */
    public function initializeArguments(): void
    {
        parent::initializeArguments();
        $this->registerArgument('domain', 'string', 'The domain prefix.');
        $this->registerArgument('category1', 'string', 'First category for implode.');
        $this->registerArgument('category2', 'string', 'Second category for implode.');
        $this->registerArgument('category3', 'string', 'Third category for implode.');
        $this->registerArgument('category4', 'string', 'Fourth category for implode.');
        $this->registerArgument('category5', 'string', 'Fifth category for implode.');
    }


    /**
     * Returns the filtered and combined categories
     *
     * @return string
     */
    public function render(): string
    {
        $domain = $this->arguments['domain'];
        unset($this->arguments['domain']);
        return CategoryUtility::implodeCategories($domain, $this->arguments);
    }

}
