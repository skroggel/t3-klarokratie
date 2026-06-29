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

namespace Madj2k\Klarokratie\Tests\Functional\Controller;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Cache\CacheManager;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\TestingFramework\Core\Functional\Framework\Frontend\InternalRequest;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * Class TrackingCodeControllerTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class TrackingCodeControllerTest extends FunctionalTestCase
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
     * Sets up the functional test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->importCSVDataSet(__DIR__ . '/../Fixtures/Database/pages.csv');
        $this->writeSiteConfiguration();
        $this->setUpFrontendRootPage(
            1,
            [
                'EXT:klarokratie/Tests/Functional/Fixtures/Frontend/TrackingCode.typoscript',
            ]
        );
    }


    /**
     * Tests that the Google Analytics action renders the configured tag ID.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestRendersConfiguredGoogleAnalyticsTagId(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'etracker' => [
                    'enable' => false,
                ],
                'googleAnalytics' => [
                    'enable' => true,
                    'useTagManager' => false,
                    'tagId' => 'G-TEST123456',
                ],
            ],
        ]);

        /**
         * @var string $html
         */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie tracking fixture', $html);
        self::assertStringContainsString('https://www.googletagmanager.com/gtag/js?id=G-TEST123456', $html);
        self::assertStringContainsString("gtag('config', 'G-TEST123456');", $html);
        self::assertStringNotContainsString('{settings.googleAnalytics.tagId}', $html);
    }


    /**
     * Tests that the Google Tag Manager action renders the configured tag ID.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestRendersConfiguredGoogleTagManagerId(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'etracker' => [
                    'enable' => false,
                ],
                'googleAnalytics' => [
                    'enable' => true,
                    'useTagManager' => true,
                    'tagId' => 'GTM-TEST123',
                ],
            ],
        ]);

        /**
         * @var string $html
         */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie tracking fixture', $html);
        self::assertStringContainsString("'GTM-TEST123'", $html);
        self::assertStringContainsString('data-klarokratie-name="google-tagmanager"', $html);
        self::assertStringNotContainsString('{settings.googleAnalytics.tagId}', $html);
    }


    /**
     * Tests that the etracker action renders the configured secure code.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestRendersConfiguredEtrackerSecureCode(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'etracker' => [
                    'enable' => true,
                    'secureCode' => 'secure-code-123',
                    'blockCookiesOnPageLoad' => true,
                    'respectDoNotTrack' => true,
                    'doNotUseSessionStorage' => false,
                ],
                'googleAnalytics' => [
                    'enable' => false,
                ],
            ],
        ]);

        /**
         * @var string $html
         */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie tracking fixture', $html);
        self::assertStringContainsString('data-name="etracker"', $html);
        self::assertStringContainsString('data-secure-code="secure-code-123"', $html);
        self::assertStringContainsString('data-block-cookies="true"', $html);
        self::assertStringContainsString('data-respect-dnt="true"', $html);
        self::assertStringNotContainsString('{settings.etracker.secureCode}', $html);
    }


    /**
     * Writes a site configuration for the frontend test request.
     *
     * @param array<string, mixed> $additionalConfiguration
     * @return void
     */
    private function writeSiteConfiguration(array $additionalConfiguration = []): void
    {
        /**
         * @var string $siteConfigurationDirectory
         */
        $siteConfigurationDirectory = Environment::getConfigPath() . '/sites/klarokratie-test';

        if (!is_dir($siteConfigurationDirectory)) {
            mkdir($siteConfigurationDirectory, 0777, true);
        }

        /**
         * @var array<string, mixed> $configuration
         */
        $configuration = array_replace_recursive([
            'base' => 'https://example.org/',
            'rootPageId' => 1,
            'websiteTitle' => 'Klarokratie Test',
            'languages' => [
                [
                    'title' => 'English',
                    'enabled' => true,
                    'languageId' => 0,
                    'base' => '/',
                    'typo3Language' => 'default',
                    'locale' => 'en_US.UTF-8',
                    'iso-639-1' => 'en',
                    'navigationTitle' => 'English',
                    'hreflang' => 'en-US',
                    'direction' => 'ltr',
                    'flag' => 'us',
                ],
            ],
            'errorHandling' => [],
            'routes' => [],
        ], $additionalConfiguration);

        file_put_contents(
            $siteConfigurationDirectory . '/config.yaml',
            $this->arrayToYaml($configuration)
        );

        /**
         * @var \TYPO3\CMS\Core\Cache\CacheManager $cacheManager
         */
        $cacheManager = $this->get(CacheManager::class);
        $cacheManager->flushCaches();
    }


    /**
     * Executes a frontend request and returns the response body.
     *
     * @return string
     */
    private function executeFrontendRequestAndReturnBody(): string
    {
        /**
         * @var \TYPO3\TestingFramework\Core\Functional\Framework\Frontend\InternalRequest $request
         */
        $request = new InternalRequest('https://example.org/');

        /**
         * @var \Psr\Http\Message\ResponseInterface $response
         */
        $response = $this->executeFrontendSubRequest($request->withPageId(1));

        return (string)$response->getBody();
    }


    /**
     * Converts a small nested array to YAML.
     *
     * @param array<string, mixed> $data
     * @param int $level
     * @return string
     */
    private function arrayToYaml(array $data, int $level = 0): string
    {
        /**
         * @var string $yaml
         */
        $yaml = '';

        foreach ($data as $key => $value) {
            /**
             * @var string $indent
             */
            $indent = str_repeat('  ', $level);

            if (is_array($value)) {
                if (array_is_list($value)) {
                    $yaml .= $indent . $key . ":\n";
                    foreach ($value as $item) {
                        if (is_array($item)) {
                            $yaml .= $indent . "  -\n" . $this->arrayToYaml($item, $level + 2);
                        } else {
                            $yaml .= $indent . '  - ' . $this->yamlScalar($item) . "\n";
                        }
                    }
                } else {
                    $yaml .= $indent . $key . ":\n" . $this->arrayToYaml($value, $level + 1);
                }
            } else {
                $yaml .= $indent . $key . ': ' . $this->yamlScalar($value) . "\n";
            }
        }

        return $yaml;
    }


    /**
     * Converts a scalar value to YAML.
     *
     * @param mixed $value
     * @return string
     */
    private function yamlScalar(mixed $value): string
    {
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        if (is_int($value) || is_float($value)) {
            return (string)$value;
        }

        if ($value === null) {
            return 'null';
        }

        return "'" . str_replace("'", "''", (string)$value) . "'";
    }
}
