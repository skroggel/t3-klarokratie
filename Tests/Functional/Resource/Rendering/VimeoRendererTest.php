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

namespace Madj2k\Klarokratie\Tests\Functional\Resource\Rendering;

use Madj2k\Klarokratie\Resource\Rendering\VimeoRenderer;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface;
use TYPO3\CMS\Core\Resource\Rendering\VimeoRenderer as CoreVimeoRenderer;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * Class VimeoRendererTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class VimeoRendererTest extends FunctionalTestCase
{
    /**
     * Extensions loaded for functional test execution.
     *
     * @var array<int, string>
     */
    protected array $testExtensionsToLoad = [
        'typo3conf/ext/klarokratie',
    ];


    /**
     * Tests that the real Vimeo renderer returns Klaro-compatible iframe markup.
     *
     * @return void
     */
    #[Test]
    public function renderReturnsIframeWithKlaroAttributes(): void
    {
        /**
         * @var \TYPO3\CMS\Core\Resource\File $file
         */
        $file = $this->createStub(File::class);

        /**
         * @var \TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface&\PHPUnit\Framework\MockObject\MockObject $onlineMediaHelper
         */
        $onlineMediaHelper = $this->createMock(OnlineMediaHelperInterface::class);
        $onlineMediaHelper
            ->expects(self::once())
            ->method('getOnlineMediaId')
            ->with($file)
            ->willReturn('987654321');

        /**
         * @var \Madj2k\Klarokratie\Resource\Rendering\VimeoRenderer $subject
         */
        $subject = new VimeoRenderer();
        $this->setOnlineMediaHelper($subject, $onlineMediaHelper);

        /**
         * @var string $result
         */
        $result = $subject->render($file, 640, 360);

        self::assertStringStartsWith('<iframe ', $result);
        self::assertStringContainsString('data-src=', $result);
        self::assertStringContainsString('vimeo', strtolower($result));
        self::assertStringContainsString('data-name="vimeo"', $result);
        self::assertStringContainsString('width="640"', $result);
        self::assertStringContainsString('height="360"', $result);
        self::assertStringNotContainsString(' src="', $result);
    }


    /**
     * Sets the online media helper on the real renderer instance.
     *
     * @param \TYPO3\CMS\Core\Resource\Rendering\VimeoRenderer $subject
     * @param \TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface $onlineMediaHelper
     * @return void
     */
    private function setOnlineMediaHelper(CoreVimeoRenderer $subject, OnlineMediaHelperInterface $onlineMediaHelper): void
    {
        /**
         * @var \ReflectionProperty $property
         */
        $property = new \ReflectionProperty(CoreVimeoRenderer::class, 'onlineMediaHelper');
        $property->setValue($subject, $onlineMediaHelper);
    }
}
