<?php
declare(strict_types=1);

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

namespace Madj2k\Klarokratie\Tests\Unit\ViewHelpers;

use Madj2k\Klarokratie\ViewHelpers\ImplodeCategoriesViewHelper;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

/**
 * Class ImplodeCategoriesViewHelperTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class ImplodeCategoriesViewHelperTest extends TestCase
{
    /**
     * Tests that the ViewHelper delegates category rendering to the utility.
     *
     * @return void
     */
    #[Test]
    public function renderReturnsImplodedCategoryPath(): void
    {
        /** @var ImplodeCategoriesViewHelper $subject */
        $subject = new ImplodeCategoriesViewHelper();
        $subject->initializeArguments();
        $subject->setArguments([
            'domain' => 'WWW.EXAMPLE.ORG',
            'category1' => 'marketing',
            'category2' => '',
            'category3' => 'checkout',
            'category4' => '',
            'category5' => '',
        ]);

        self::assertSame(
            'www.example.org/Marketing/Default/Checkout',
            $subject->render()
        );
    }


    /**
     * Tests that trailing empty category arguments are removed.
     *
     * @return void
     */
    #[Test]
    public function renderRemovesTrailingDefaultCategories(): void
    {
        /** @var ImplodeCategoriesViewHelper $subject */
        $subject = new ImplodeCategoriesViewHelper();
        $subject->initializeArguments();
        $subject->setArguments([
            'domain' => 'www.example.org',
            'category1' => 'marketing',
            'category2' => '',
            'category3' => '',
            'category4' => '',
            'category5' => '',
        ]);

        self::assertSame(
            'www.example.org/Marketing',
            $subject->render()
        );
    }
}
