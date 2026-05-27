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

namespace Madj2k\Klarokratie\Tests\Functional\Frontend;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Cache\CacheManager;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\TestingFramework\Core\Functional\Framework\Frontend\InternalRequest;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * Class FrontendAssetsTest
 *
 * @author Steffen Kroggel <developer@steffenkroggel.de>
 * @copyright Steffen Kroggel <developer@steffenkroggel.de>
 * @package Madj2k_Klarokratie
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
final class FrontendAssetsTest extends FunctionalTestCase
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
                'EXT:klarokratie/Tests/Functional/Fixtures/Frontend/Basic.typoscript',
            ]
        );
    }


    /**
     * Tests that a real frontend request includes Klaro CSS and JavaScript assets.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestIncludesKlaroCssAndJavaScriptAssets(): void
    {
        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie frontend fixture', $html);
        self::assertStringContainsString('klaro.min.css', $html);
        self::assertStringContainsString('klaro-no-css.js', $html);
        self::assertStringContainsString('KlaroConfig.js', $html);
    }


    /**
     * Tests that a real frontend request skips all Klaro assets when Klaro is disabled.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestDoesNotIncludeKlaroAssetsWhenKlaroIsDisabled(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'disable' => true,
                ],
            ],
        ]);

        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie frontend fixture', $html);
        self::assertStringNotContainsString('klaro.min.css', $html);
        self::assertStringNotContainsString('klaro-no-css.js', $html);
        self::assertStringNotContainsString('KlaroConfig.js', $html);
    }


    /**
     * Tests that a real frontend request skips all Klaro assets when Klaro is disabled through the nested site configuration.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestDoesNotIncludeKlaroAssetsWhenKlaroIsDisabledInNestedSiteConfiguration(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'disable' => true,
                ],
            ],
        ]);

        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('Klarokratie frontend fixture', $html);
        self::assertStringNotContainsString('klaro.min.css', $html);
        self::assertStringNotContainsString('klaro-no-css.js', $html);
        self::assertStringNotContainsString('KlaroConfig.js', $html);
    }


    /**
     * Tests that configured include files are merged into the frontend Klaro configuration.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestUsesCombinedKlaroConfigWhenIncludesAreConfiguredAsArray(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'includes' => [
                        'EXT:klarokratie/Tests/Functional/Fixtures/JavaScript/IncludeOne.js',
                        'EXT:klarokratie/Tests/Functional/Fixtures/JavaScript/IncludeTwo.js',
                    ],
                ],
            ],
        ]);

        $this->assertCombinedKlaroConfigContainsConfiguredIncludes();
    }


    /**
     * Tests that comma-separated include files are merged into the frontend Klaro configuration.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestUsesCombinedKlaroConfigWhenIncludesAreConfiguredAsCommaSeparatedList(): void
    {
        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'includes' => 'EXT:klarokratie/Tests/Functional/Fixtures/JavaScript/IncludeOne.js, EXT:klarokratie/Tests/Functional/Fixtures/JavaScript/IncludeTwo.js',
                ],
            ],
        ]);

        $this->assertCombinedKlaroConfigContainsConfiguredIncludes();
    }


    /**
     * Tests that configured custom CSS replaces the default custom CSS slot.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestIncludesCustomCssWhenConfigured(): void
    {
        /** @var string $customCssFile */
        $customCssFile = Environment::getPublicPath() . '/typo3temp/assets/klarokratie-custom-test.css';

        GeneralUtility::writeFileToTypo3tempDir($customCssFile, '.klarokratie-custom-test{display:block;}');

        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'customCss' => 'typo3temp/assets/klarokratie-custom-test.css',
                ],
            ],
        ]);

        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('klaro.min.css', $html);
        self::assertStringContainsString('klarokratie-custom-test.css', $html);
    }


    /**
     * Tests that configured custom CSS from nested site configuration replaces the default custom CSS slot.
     *
     * @return void
     */
    #[Test]
    public function frontendRequestIncludesCustomCssWhenConfiguredByNestedSiteConfiguration(): void
    {
        /** @var string $customCssFile */
        $customCssFile = Environment::getPublicPath() . '/typo3temp/assets/klarokratie-custom-backend-field-test.css';

        GeneralUtility::writeFileToTypo3tempDir($customCssFile, '.klarokratie-custom-backend-field-test{display:block;}');

        $this->writeSiteConfiguration([
            'klarokratie' => [
                'klaro' => [
                    'customCss' => 'typo3temp/assets/klarokratie-custom-backend-field-test.css',
                ],
            ],
        ]);

        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('klaro.min.css', $html);
        self::assertStringContainsString('klarokratie-custom-backend-field-test.css', $html);
    }


    /**
     * Asserts that a frontend request uses a combined Klaro configuration with configured includes.
     *
     * @return void
     */
    private function assertCombinedKlaroConfigContainsConfiguredIncludes(): void
    {
        /** @var string $html */
        $html = $this->executeFrontendRequestAndReturnBody();

        self::assertStringContainsString('klaro-no-css.js', $html);
        self::assertMatchesRegularExpression('#typo3temp/assets/klaro-combined-[a-f0-9]{32}\.js#', $html);

        /** @var array<int, string> $matches */
        $matches = [];
        preg_match('#typo3temp/assets/klaro-combined-[a-f0-9]{32}\.js#', $html, $matches);

        /** @var string $combinedConfigFile */
        $combinedConfigFile = Environment::getPublicPath() . '/' . $matches[0];

        self::assertFileExists($combinedConfigFile);
        self::assertStringContainsString('var klaroConfig', file_get_contents($combinedConfigFile) ?: '');
        self::assertStringContainsString('klaroTestIncludeOne', file_get_contents($combinedConfigFile) ?: '');
        self::assertStringContainsString('klaroTestIncludeTwo', file_get_contents($combinedConfigFile) ?: '');
    }


    /**
     * Writes a site configuration for the frontend test request.
     *
     * @param array<string, mixed> $additionalConfiguration
     * @return void
     */
    private function writeSiteConfiguration(array $additionalConfiguration = []): void
    {
        /** @var string $siteConfigurationDirectory */
        $siteConfigurationDirectory = Environment::getConfigPath() . '/sites/klarokratie-test';

        if (!is_dir($siteConfigurationDirectory)) {
            mkdir($siteConfigurationDirectory, 0777, true);
        }

        /** @var array<string, mixed> $configuration */
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

        /** @var CacheManager $cacheManager */
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
        /** @var InternalRequest $request */
        $request = new InternalRequest('https://example.org/');

        /** @var \Psr\Http\Message\ResponseInterface $response */
        $response = $this->executeFrontendSubRequest($request->withPageId(1));

        return (string) $response->getBody();
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
        /** @var string $yaml */
        $yaml = '';

        foreach ($data as $key => $value) {
            /** @var string $indent */
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
            return (string) $value;
        }

        if ($value === null) {
            return 'null';
        }

        return "'" . str_replace("'", "''", (string) $value) . "'";
    }
}
