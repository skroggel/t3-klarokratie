<?php

$EM_CONF[$_EXTKEY] = [
	'title' => 'Klaro!kratie',
	'description' => 'Includes Klaro! Consent-Manager into TYPO3. Completely file-based configuration for versioning without having to take care of database-entries. This extension automatically adds a consent-overlay to embedded YouTube- and Vimeo-Videos.',
	'category' => 'plugin',
	'author' => 'Steffen Kroggel',
	'author_email' => 'developer@steffenkroggel.de',
	'state' => 'stable',
	'internal' => '',
	'uploadfolder' => '0',
	'clearCacheOnLoad' => 0,
	'version' => '12.4.17',
	'constraints' => [
		'depends' => [
            'typo3' => '10.4.0-12.4.99',
        ],
		'conflicts' => [
		],
		'suggests' => [
        ],
	],
];
