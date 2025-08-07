(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "etracker",
      purposes: ['statistics'],
      cookies: [
        /^(_)?et_(.*)?/, // we delete the cookies if the user declines its use
        'isSdEnabled',
        'cookiesAvailable'
      ],
      translations: {
        zz: {
          title: 'eTracker'
        },
        en: {
          description: 'In order to continuously develop and improve our website, we record visits and downloads on our website. We use etracker Analytics from the provider etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Germany. The data collected is not passed on to third parties and does not allow any conclusions to be drawn about your person. The data collection is also not used for the purpose of processing for the provision of personalized content and advertising, i.e. for direct communication with a specific person, but for the aggregated statistical evaluation of website usage.  The data generated with etracker is processed and stored by etracker on behalf of the provider of this website exclusively in Germany and is therefore subject to the strict German and European data protection laws and standards. etracker has been independently audited, certified and awarded the ePrivacyseal data protection seal of approval in this respect. If you agree, you allow us to record your usage behavior on this website using cookies, among other things. If you do not agree to the setting of cookies, the recording of user behavior on this website is carried out exclusively without cookies (cookie-less). You can find more information on cookie-less tracking in our privacy policy.'+
            klarokratieGetTableHtml('Cookie:', 'et_allow_cookies', 'Duration:', 'max. 480 days') +
            klarokratieGetTableHtml('Cookie:', 'et_oi_v2', 'Duration:', '480 day - 50 years') +
            klarokratieGetTableHtml('Cookie:', 'et_scroll_depth', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'isSdEnabled', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', 'et_cssSelectors', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerEntries', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerVarss', 'Duration:', 'Session')
        },
        de: {
          description: 'Um unser Webangebot kontinuierlich weiterentwickeln und verbessern zu können, erfassen wir die Besuche und Downloads auf unserer Website. Wir setzen etracker Analytics des Anbieters etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Deutschland, ein. Die erfassten Daten werden nicht an Dritte weitergegeben und erlauben keinen Rückschluss auf Ihre Person. Auch dient die Datenerfassung nicht dem Zweck der Verarbeitung für die Bereitstellung personalisierter Inhalte und Werbung, d.h. zur direkten Kommunikation mit einer bestimmten Person, sondern der aggregierten statistischen Auswertung der Website-Nutzung.  Die mit etracker erzeugten Daten werden im Auftrag des Anbieters dieser Website von etracker ausschließlich in Deutschland verarbeitet und gespeichert und unterliegen damit den strengen deutschen und europäischen Datenschutzgesetzen und -standards. etracker wurde diesbezüglich unabhängig geprüft, zertifiziert und mit dem Datenschutz-Gütesiegel ePrivacyseal ausgezeichnet. Wenn Sie zustimmen, erlauben Sie es uns, Ihr Nutzungsverhalten auf dieser Website u. a. durch Cookies zu erfassen. Stimmen Sie dem Setzen von Cookies nicht zu, erfolgt die Erfassung des Nutzungsverhaltens auf dieser Website ausschließlich ohne Cookies (Cookie-less). Nähere Informationen zum Cookie-less-Tracking finden Sie in unserer Datenschutzerklärung.' +
            klarokratieGetTableHtml('Cookie:', 'et_allow_cookies', 'Duration:', 'max. 480 Tage') +
            klarokratieGetTableHtml('Cookie:', 'et_oi_v2', 'Duration:', '480 Tage - 50 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'et_scroll_depth', 'Duration:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'isSdEnabled', 'Duration:', '24 Stunden') +
            klarokratieGetTableHtml('Cookie:', 'et_cssSelectors', 'Duration:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerEntries', 'Duration:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerVarss', 'Duration:', 'Sitzung')
        },
      },
      onAccept: `

        let intervalEtracker = null;
        function updateEtracker() {
          if (typeof window._etracker == 'object'
              && typeof _etracker.enableCookies == 'function'
              && typeof _etracker.disableCookies == 'function'
          ) {

            let domain = window.location.hostname;
            _etracker.enableCookies(domain);

            window.clearInterval(intervalEtracker);
            intervalEtracker = null;
            // console.log('etracker with cookies allowed! Thank you!');
          }
        }
        intervalEtracker = window.setInterval(updateEtracker, 200);
      `,
      onDecline: `

        if (typeof window._etracker == 'object'
            && typeof _etracker.enableCookies == 'function'
            && typeof _etracker.disableCookies == 'function'
        ) {

          let domain = window.location.hostname;
          _etracker.disableCookies(domain);
          // console.log('etracker with cookies disabled! You are welcome!');
        }
			`,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
