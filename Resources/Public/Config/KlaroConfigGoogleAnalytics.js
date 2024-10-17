// By default, Klaro will load the config from  a global "klaroConfig" variable.
// You can change this by specifying the "data-config" attribute on your
// script take, e.g. like this:
// <script src="klaro.js" data-config="myConfigVariableName" />
var klaroConfig = {
	// With the 0.7.0 release we introduce a 'version' paramter that will make
	// it easier for us to keep configuration files backwards-compatible in the future.
	version: 1,

	// You can customize the ID of the DIV element that Klaro will create
	// when starting up. If undefined, Klaro will use 'klaro'.
	elementID: "klaro",

	// You can override CSS style variables here. For IE11, Klaro will
	// dynamically inject the variables into the CSS. If you still consider
	// supporting IE9-10 (which you probably shouldn't) you need to use Klaro
	// with an external stylesheet as the dynamic replacement won't work there.
	styling: {
		theme: ["light", "top", "wide"],
	},

	// Setting this to true will keep Klaro from automatically loading itself
	// when the page is being loaded.
	noAutoLoad: false,

	// Setting this to true will render the descriptions of the consent
	// modal and consent notice are HTML. Use with care.
	htmlTexts: true,

	// Setting 'embedded' to true will render the Klaro modal and notice without
	// the modal background, allowing you to e.g. embed them into a specific element
	// of your website, such as your privacy notice.
	embedded: false,

	// You can group services by their purpose in the modal. This is advisable
	// if you have a large number of services. Users can then enable or disable
	// entire groups of services instead of having to enable or disable every service.
	groupByPurpose: true,

	// How Klaro should store the user's preferences. It can be either 'cookie'
	// (the default) or 'localStorage'.
	storageMethod: "cookie",

	// You can customize the name of the cookie that Klaro uses for storing
	// user consent decisions. If undefined, Klaro will use 'klaro'.
	cookieName: "klaro",

	// You can also set a custom expiration time for the Klaro cookie.
	// By default, it will expire after 120 days.
	cookieExpiresAfterDays: 365,

	// You can change to cookie domain for the consent manager itself.
	// Use this if you want to get consent once for multiple matching domains.
	// If undefined, Klaro will use the current domain.
	//cookieDomain: '.github.com',

	// You can change to cookie path for the consent manager itself.
	// Use this to restrict the cookie visibility to a specific path.
	// If undefined, Klaro will use '/' as cookie path.
	//cookiePath: '/',

	// Defines the default state for services (true=enabled by default).
	default: false,

	// If "mustConsent" is set to true, Klaro will directly display the consent
	// manager modal and not allow the user to close it before having actively
	// consented or declines the use of third-party services.
	mustConsent: true,

	// Show "accept all" to accept all services instead of "ok" that only accepts
	// required and "default: true" services
	acceptAll: true,

	// replace "decline" with cookie manager modal
	hideDeclineAll: false,

	// hide "learnMore" link
	hideLearnMore: false,

	// show cookie notice as modal
	noticeAsModal: false,

	// You can also remove the 'Realized with Klaro!' text in the consent modal.
	// Please don't do this! We provide Klaro as a free open source tool.
	// Placing a link to our website helps us spread the word about it,
	// which ultimately enables us to make Klaro! better for everyone.
	// So please be fair and keep the link enabled. Thanks :)
	disablePoweredBy: false,

	// you can specify an additional class (or classes) that will be added to the Klaro `div`
	additionalClass: 'klaro',

	// You can define the UI language directly here. If undefined, Klaro will
	// use the value given in the global "lang" variable. If that does
	// not exist, it will use the value given in the "lang" attribute of your
	// HTML tag. If that also doesn't exist, it will use 'en'.
	// lang: 'en',

	// You can overwrite existing translations and add translations for your
	// service descriptions and purposes. See `src/translations/` for a full
	// list of translations that can be overwritten:
	// https://github.com/KIProtect/klaro/tree/master/src/translations
	// Example config that shows how to overwrite translations:
	// https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
	translations: {
		// translationsed defined under the 'zz' language code act as default
		// translations.
		zz: {
			privacyPolicyUrl: "/datenschutz",
		},
		// If you erase the "consentModal" translations, Klaro will use the
		// bundled translations.
		de: {
			privacyPolicyUrl: "/datenschutz",
			consentModal: {
        title: "Hat jemand \"Cookies\" gesagt?!",
				description:
					'Wir würden gerne einige Dienste verwenden, um Ihnen ein bestmögliches Nutzungserlebnis auf unserer Website zu bieten. Entscheiden Sie selbst, welche Dienste Sie zulassen möchten.',
			},
			consentNotice: {
				description:
					"Hallo! Könnten wir bitte einige zusätzliche Dienste für {purposes} aktivieren? Sie können Ihre Zustimmung später jederzeit ändern oder widerrufen.",
				imprint: { name: "Impressum" },
				learnMore: "Ich möchte einzeln auswählen",
				privacyPolicy: { name: "Datenschutzerklärung" },
				testing: "Testmodus!",
			},
			purposes: {
        functional: {
          title: "Funktional",
          description: "Für das Funktionieren der Website notwendige Dienste"
        },
        statistics: {
          title: "Statistiken",
          description: "Dienste zur Weiterentwicklung und Verbesserung unseres Webangebotes"
        },
        marketing: {
          title: "Marketing",
          description: "Dienste, um Ihnen relevante Inhalte, interessante Produkte, Dienstleistungen oder Themen anzuzeigen"
        },
        multimedia: {
          title: "Multimedia",
          description: "Multimediale Inhalte von externen Plattformen"
        },
			},
		},

		en: {
      consentModal: {
        title: 'Did someone say \"cookies\"?!',
        description:
          'We would like to use some services to provide you with the best possible user experience on our website. Decide for yourself which services you would like to allow.',
      },
      consentNotice: {
        description:
          "Hello, could we please enable some additional services for {purposes}? You can change or withdraw your consent later at any time.",
        imprint: { name: "Imprint" },
        learnMore: "Let me choose",
        privacyPolicy: { name: "Data protection declaration" },
        testing: "Testmodus!",
      },
			purposes: {
        functional: {
          title: "Functional",
          description: "Services necessary for the functioning of the websites"
        },
        statistics: {
          title: "Statistics",
          description: "Services for the further development and improvement of our website"
        },
        marketing: {
          title: "Marketing",
          description: "Services to show you relevant content, interesting products, services or topics"
        },
				multimedia: {
          title: "Multimedia",
          description: "Multimedia content from external platforms"
        },
			},
		},
	},
	// This is a list of third-party services that Klaro will manage for you.
	services: [
    {
      name: 'php',
      default: true,
      required: true,
      purposes: ['functional'],
      translations: {
        zz: {
          title: 'PHP-Session (PHPSESSID)'
        },
        en: {
          description: 'This cookie is specific to PHP applications. It is set to maintain your current session and ensures that you can use all functions of the website without restriction.'
        },
        de: {
          description: 'Dieses Cookie ist spezifisch für PHP-Anwendungen. Es wird gesetzt, um Ihre aktuelle Sitzung aufrechtzuerhalten und gewährleistet so dass Sie alle Funktionen der Website uneingeschränkt nutzen können.'
        },
      },
    },
    {
      name: 'typo3',
      default: true,
      required: true,
      purposes: ['functional'],
      translations: {
        zz: {
          title: 'TYPO3 (fe_typo_user)'
        },
        en: {
          description: 'This cookie is set by the TYPO3 content management system used by us to identify a user. It is a prerequisite for user-specific feedback on forms, for example, but also enables login to our site.'
        },
        de: {
          description: 'Dieses Cookie wird vom durch uns eingesetzten Content Management System TYPO3 für die Identifizierung eines Anwenders gesetzt. Es ist Voraussetzung für z. B. nutzerspezifische Rückmeldungen bei Formularen, ermöglicht aber auch den Login auf unserer Seite.'
        },
      },
    },
    {
      name: 'captcha',
      default: true,
      required: true,
      purposes: ['functional'],
      translations: {
        zz: {
          title: 'Captcha (tx_srfreecap)'
        },
        en: {
          description: 'The cookie ensures the functionality of the spam protection (captcha).'
        },
        de: {
          description: 'Das Cookie stellt die Funktionsfähigkeit des Spam-Schutzes (Captcha) sicher.'
        },
      },
    },
    {
      name: 'klaro',
      default: true,
      required: true,
      purposes: ['functional'],
      translations: {
        zz: {
          title: 'Klaro! (klaro)'
        },
        en: {
          description: 'This cookie stores the selection of cookies permitted by the user.'
        },
        de: {
          description: 'Dieses Cookie speichert die getroffene Auswahl der durch die Nutzenden zugelassenen Cookies.'
        },
      },
    },
    {
      purposes: ['statistics'],
      name: "etracker",
      translations: {
        zz: {
          title: 'eTracker'
        },
        en: {
          description: 'In order to continuously develop and improve our website, we record visits and downloads on our website. We use etracker Analytics from the provider etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Germany. The data collected is not passed on to third parties and does not allow any conclusions to be drawn about your person. The data collection is also not used for the purpose of processing for the provision of personalized content and advertising, i.e. for direct communication with a specific person, but for the aggregated statistical evaluation of website usage.  The data generated with etracker is processed and stored by etracker on behalf of the provider of this website exclusively in Germany and is therefore subject to the strict German and European data protection laws and standards. etracker has been independently audited, certified and awarded the ePrivacyseal data protection seal of approval in this respect. If you agree, you allow us to record your usage behavior on this website using cookies, among other things. If you do not agree to the setting of cookies, the recording of user behavior on this website is carried out exclusively without cookies (cookie-less). You can find more information on cookie-less tracking in our privacy policy.'
        },
        de: {
          description: 'Um unser Webangebot kontinuierlich weiterentwickeln und verbessern zu können, erfassen wir die Besuche und Downloads auf unserer Website. Wir setzen etracker Analytics des Anbieters etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Deutschland, ein. Die erfassten Daten werden nicht an Dritte weitergegeben und erlauben keinen Rückschluss auf Ihre Person. Auch dient die Datenerfassung nicht dem Zweck der Verarbeitung für die Bereitstellung personalisierter Inhalte und Werbung, d.h. zur direkten Kommunikation mit einer bestimmten Person, sondern der aggregierten statistischen Auswertung der Website-Nutzung.  Die mit etracker erzeugten Daten werden im Auftrag des Anbieters dieser Website von etracker ausschließlich in Deutschland verarbeitet und gespeichert und unterliegen damit den strengen deutschen und europäischen Datenschutzgesetzen und -standards. etracker wurde diesbezüglich unabhängig geprüft, zertifiziert und mit dem Datenschutz-Gütesiegel ePrivacyseal ausgezeichnet. Wenn Sie zustimmen, erlauben Sie es uns, Ihr Nutzungsverhalten auf dieser Website u. a. durch Cookies zu erfassen. Stimmen Sie dem Setzen von Cookies nicht zu, erfolgt die Erfassung des Nutzungsverhaltens auf dieser Website ausschließlich ohne Cookies (Cookie-less). Nähere Informationen zum Cookie-less-Tracking finden Sie in unserer Datenschutzerklärung.'
        },
      },
    },
    {
      name: "youTube",
      purposes: ['multimedia'],
      contextualConsentOnly: true,
      translations: {
        zz: {
          title: 'YouTube'
        },
        en: {
          description: 'We embed videos from the "YouTube" platform of the provider Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, on our website. YouTube is integrated by embedding the service on our website by means of a so-called iFrame. When loading this iFrame, YouTube or Google may collect and process information (including personal data). It cannot be ruled out that YouTube or Google may also transmit the information to a server in a third country.'
        },
        de: {
          description: 'Wir binden auf unserer Website Videos der Plattform "YouTube" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Die Einbindung von YouTube erfolgt durch das Einbetten des Service auf unserer Webseite mittels eines sog. iFrames. Beim Laden dieses iFrames erheben YouTube bzw. Google unter Umständen Informationen (auch personenbezogene Daten) und verarbeiten diese. Dabei kann nicht ausgeschlossen werden, dass YouTube bzw. Google die Informationen auch an einen Server in einem Drittland übermittelt.'
        },
      }
    },
    {
      name: "vimeo",
      purposes: ['multimedia'],
      contextualConsentOnly: true,
      translations: {
        zz: {
          title: 'Vimeo'
        },
        en: {
          description: 'We embed videos from the "Vimeo" platform of the provider Vimeo Inc., 330 W 34th St, Suite 5, New York, NY, USA, on our website. Vimeo is integrated by embedding the service on our website by means of a so-called iFrame. When loading this iFrame, Vimeo may collect and process information (including personal data). It cannot be ruled out that Vimeo may also transmit the information to a server in a third country.'
        },
        de: {
          description: 'Wir binden auf unserer Website Videos der Plattform "Vimeo" des Anbieters Vimeo Inc., 330 W 34th St, Suite 5, New York, NY, USA, ein. Die Einbindung von Vimeo erfolgt durch das Einbetten des Service auf unserer Webseite mittels eines sog. iFrames. Beim Laden dieses iFrames erhebt Vimeo unter Umständen Informationen (auch personenbezogene Daten) und verarbeiten diese. Dabei kann nicht ausgeschlossen werden, dass Vimeo die Informationen auch an einen Server in einem Drittland übermittelt.'
        },
      },
    },
    {
      // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
      name: "google-analytics",
      purposes: ["statistics"],
      cookies: [
        /^_ga(_.*)?/, // we delete the Google Analytics cookies if the user declines its use
      ],
      translations: {
        zz: {
          title: 'Google Analytics'
        },
        en: {
          description: 'We use the "Google Analytics" of the provider Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, on our website. Google may collect and process information (including personal data). It cannot be ruled out that YGoogle may also transmit the information to a server in a third country.'
        },
        de: {
          description: 'Wir setzen auf unserer Website den "Google Analytics" des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Google kann unter Umständen Informationen (auch personenbezogene Daten) erfassen und verarbeiten. Dabei kann nicht ausgeschlossen werden, dass Google die Informationen auch an einen Server in einem Drittland übermittelt.'
        },
      },
      onAccept: `
        // we grant analytics storage
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
        });
        console.log('Google Analytics allowed! Thank you!');
      `,
      onDecline: `
        // we again explicitly deny analytics storage
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
        });
        console.log('Google Analytics denied! You are welcome!');
      `,
    },
	],
};
