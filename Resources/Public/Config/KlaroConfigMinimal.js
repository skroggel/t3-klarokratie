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
      privacyPolicyUrl: "/datenschutzerklaerung",
    },
    // If you erase the "consentModal" translations, Klaro will use the
    // bundled translations.
    de: {
      privacyPolicyUrl: "/datenschutzerklaerung",
      consentModal: {
        title: "Hat jemand \"Cookies\" gesagt?!",
        description:
          'Wir würden gerne einige Dienste verwenden, um Ihnen ein bestmögliches Nutzungserlebnis auf unserer Website zu bieten. Entscheiden Sie selbst, welche Dienste Sie zulassen möchten.',
        privacyPolicy: {name: "Datenschutzerklärung"},
      },
      consentNotice: {
        description:
          "Hallo! Könnten wir bitte einige zusätzliche Dienste für {purposes} aktivieren? Sie können Ihre Zustimmung später jederzeit ändern oder widerrufen.",
        imprint: {name: "Impressum"},
        learnMore: "Ich möchte einzeln auswählen",
        privacyPolicy: {name: "Datenschutzerklärung"},
        testing: "Testmodus!",
      },
      privacyPolicy: {name: "Datenschutzerklärung"},
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
        imprint: {name: "Imprint"},
        learnMore: "Let me choose",
        privacyPolicy: {name: "Data protection declaration"},
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
          title: 'PHP-Session'
        },
        en: {
          description: 'This cookie is specific to PHP applications. It is set to maintain your current session and ensures that you can use all functions of the website without restriction.' +
            klarokratieGetTableHtml('Cookie:', 'PHPSESSID', 'Duration:', 'Session')
        },
        de: {
          description: 'Dieses Cookie ist spezifisch für PHP-Anwendungen. Es wird gesetzt, um Ihre aktuelle Sitzung aufrechtzuerhalten und gewährleistet so dass Sie alle Funktionen der Website uneingeschränkt nutzen können.' +
            klarokratieGetTableHtml('Cookie:', 'PHPSESSID', 'Dauer:', 'Sitzung')
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
          title: 'TYPO3'
        },
        en: {
          description: 'This cookie is set by the TYPO3 content management system used by us to identify a user. It is a prerequisite for user-specific feedback on forms, for example, but also enables login to our site.' +
            klarokratieGetTableHtml('Cookie:', 'fe_typo_user', 'Duration:', 'Session')
        },
        de: {
          description: 'Dieses Cookie wird vom durch uns eingesetzten Content Management System TYPO3 für die Identifizierung eines Anwenders gesetzt. Es ist Voraussetzung für z. B. nutzerspezifische Rückmeldungen bei Formularen, ermöglicht aber auch den Login auf unserer Seite.' +
            klarokratieGetTableHtml('Cookie:', 'fe_typo_user', 'Dauer:', 'Sitzung')
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
          title: 'Klaro!'
        },
        en: {
          description: 'This cookie saves the data protection settings selected by the user.' +
            klarokratieGetTableHtml('Cookie:', 'klaro', 'Duration:', '1 year')
        },
        de: {
          description: 'Dieses Cookie speichert die durch Nutzenden gewählten Datenschutzeinstellungen.' +
            klarokratieGetTableHtml('Cookie:', 'klaro', 'Dauer:', '1 Jahr')
        },
      },
    },
  ],
};

function klarokratieGetTableHtml(
  cookieLabel = '', cookie = '',
  liveTimeLabel = '', liveTime = '',
  linkLabel = '', link = '',
) {

  return '<table class="klaro-table">' +
    (cookieLabel ? '<tr><th>' + cookieLabel + '</th><td>' + cookie + '</td></tr>' : '') +
    (liveTimeLabel ? '<tr><th>' + liveTimeLabel + '</th><td>' + liveTime + '</td></tr>' : '') +
    (linkLabel ? '<tr><th>' + linkLabel + '</th><td><a href="' + link + '" target="_blank">' + link + '</a></td></tr>' : '') +
    '</table>';
}
