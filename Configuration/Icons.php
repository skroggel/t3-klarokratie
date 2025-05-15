<?php
declare(strict_types=1);
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

$iconList = [];
foreach (
    [
        'klarokratie-plugin-trackingcode' => 'Extension.svg',
    ] as $identifier => $path) {
    $iconList[$identifier] = [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:klarokratie/Resources/Public/Icons/' . $path,
    ];
}

return $iconList;
