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

namespace Madj2k\Klarokratie\Tests\Unit\Utilities;

use Madj2k\Klarokratie\Utilities\CategoryUtility;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

/**
 * Class CategoryUtilityTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class CategoryUtilityTest extends TestCase
{
    /**
     * Provides category names with expected cleaned output.
     *
     * @return array<string, array{0: string, 1: string}>
     */
    public static function cleanUpCategoryNameDataProvider(): array
    {
        return [
            'keeps alphanumeric characters' => ['marketing', 'Marketing'],
            'removes invalid characters' => ['marke ting!?#', 'MarkeTing'],
            'keeps umlauts' => ['münchen öl', 'Münchenöl'],
            'replaces slashes by hyphens' => ['video/youtube', 'Video-youtube'],
        ];
    }


    /**
     * Tests cleanup of category names.
     *
     * @param string $input
     * @param string $expected
     * @return void
     */
    #[DataProvider('cleanUpCategoryNameDataProvider')]
    #[Test]
    public function cleanUpCategoryNameReturnsSanitizedCategoryName(string $input, string $expected): void
    {
        self::assertSame($expected, CategoryUtility::cleanUpCategoryName($input));
    }


    /**
     * Provides domain names with expected cleaned output.
     *
     * @return array<string, array{0: string, 1: string}>
     */
    public static function cleanUpDomainNameDataProvider(): array
    {
        return [
            'lowercases domain' => ['WWW.EXAMPLE.ORG', 'www.example.org'],
            'keeps ports' => ['example.org:8080', 'example.org:8080'],
            'removes protocols and paths' => ['https://www.example.org/path', 'https:www.example.orgpath'],
            'keeps umlauts' => ['MÜNCHEN.example', 'mÜnchen.example'],
        ];
    }


    /**
     * Tests cleanup of domain names.
     *
     * @param string $input
     * @param string $expected
     * @return void
     */
    #[DataProvider('cleanUpDomainNameDataProvider')]
    #[Test]
    public function cleanUpDomainNameReturnsSanitizedDomainName(string $input, string $expected): void
    {
        self::assertSame($expected, CategoryUtility::cleanUpDomainName($input));
    }


    /**
     * Tests imploding categories with domain prefix.
     *
     * @return void
     */
    #[Test]
    public function implodeCategoriesReturnsCleanedPathWithDomain(): void
    {
        self::assertSame(
            'www.example.org/Marketing/Video-youtube',
            CategoryUtility::implodeCategories(
                'WWW.EXAMPLE.ORG',
                ['marketing', 'video/youtube']
            )
        );
    }


    /**
     * Tests default categories are removed from the end.
     *
     * @return void
     */
    #[Test]
    public function implodeCategoriesRemovesDefaultCategoriesFromEnd(): void
    {
        self::assertSame(
            'example.org/Marketing',
            CategoryUtility::implodeCategories(
                'example.org',
                ['Marketing', '', '']
            )
        );
    }


    /**
     * Tests empty categories in between are kept as default categories.
     *
     * @return void
     */
    #[Test]
    public function implodeCategoriesKeepsDefaultCategoriesInsidePath(): void
    {
        self::assertSame(
            'example.org/Marketing/Default/Checkout',
            CategoryUtility::implodeCategories(
                'example.org',
                ['Marketing', '', 'Checkout']
            )
        );
    }


    /**
     * Tests unsanitized default category value.
     *
     * @return void
     */
    #[Test]
    public function implodeCategoriesCanUseUnsanitizedDefaultValue(): void
    {
        self::assertSame(
            'example.org/Marketing/custom default/Checkout',
            CategoryUtility::implodeCategories(
                'example.org',
                ['marketing', '', 'checkout'],
                'custom default',
                false
            )
        );
    }
}
