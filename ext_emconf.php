<?php

$EM_CONF[$_EXTKEY] = [
	'title' => 'Klaro!kratie',
	'description' => 'Includes Klaro! Consent-Manager into TYPO3. Completely file-based configuration for versioning without having to take care of database-entries. This extension automatically adds a consent-overlay to embedded YouTube- and Vimeo-Videos. It also comes with a ready-to-use integration for Google Analytics / Google Tag Manager and etracker.',
	'category' => 'plugin',
	'author' => 'Steffen Kroggel',
	'author_email' => 'developer@steffenkroggel.de',
	'state' => 'stable',
	'internal' => '',
	'uploadfolder' => '0',
	'clearCacheOnLoad' => 0,
	'version' => '13.4.11',
	'constraints' => [
		'depends' => [
            'typo3' => '10.4.0-13.4.99',
        ],
		'conflicts' => [
		],
		'suggests' => [
        ],
	],
];
