(function() {
  console.log(klaroConfig.translations);
  if (
    klaroConfig.translations &&
    klaroConfig.translations.constructor === Object
  ) {
    const translations = {
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
    };

    Object.keys(translations).forEach(lang => {
      klaroConfig.translations[lang] = {
        ...(klaroConfig.translations[lang] || {}),
        ...translations[lang],
      };
    });
  }
})();
