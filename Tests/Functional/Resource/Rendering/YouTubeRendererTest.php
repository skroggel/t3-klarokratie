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

use Madj2k\Klarokratie\Resource\Rendering\YouTubeRenderer;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface;
use TYPO3\CMS\Core\Resource\Rendering\YouTubeRenderer as CoreYouTubeRenderer;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * Class YouTubeRendererTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class YouTubeRendererTest extends FunctionalTestCase
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
     * Tests that the real YouTube renderer returns Klaro-compatible iframe markup.
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
            ->willReturn('abc123');

        /**
         * @var \Madj2k\Klarokratie\Resource\Rendering\YouTubeRenderer $subject
         */
        $subject = new YouTubeRenderer();
        $this->setOnlineMediaHelper($subject, $onlineMediaHelper);

        /**
         * @var string $result
         */
        $result = $subject->render($file, 640, 360);

        self::assertStringStartsWith('<iframe ', $result);
        self::assertStringContainsString('data-src=', $result);
        self::assertStringContainsString('youtube', strtolower($result));
        self::assertStringContainsString('data-name="youTube"', $result);
        self::assertStringContainsString('width="640"', $result);
        self::assertStringContainsString('height="360"', $result);
        self::assertStringNotContainsString(' src="', $result);
    }


    /**
     * Sets the online media helper on the real renderer instance.
     *
     * @param \TYPO3\CMS\Core\Resource\Rendering\YouTubeRenderer $subject
     * @param \TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperInterface $onlineMediaHelper
     * @return void
     */
    private function setOnlineMediaHelper(CoreYouTubeRenderer $subject, OnlineMediaHelperInterface $onlineMediaHelper): void
    {
        /**
         * @var \ReflectionProperty $property
         */
        $property = new \ReflectionProperty(CoreYouTubeRenderer::class, 'onlineMediaHelper');
        $property->setValue($subject, $onlineMediaHelper);
    }
}
