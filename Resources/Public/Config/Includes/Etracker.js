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
          description: 'We use etracker Analytics with cookies and comparable technologies for the extended statistical analysis of the use of our website. The provider is etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Germany, website: <a href="https://www.etracker.com/" target="_blank" rel="noopener noreferrer">https://www.etracker.com/</a>.<br><br>' +
            'The processing is used to analyse visits, page views, downloads and interactions on our website, so that we can continuously develop and improve our online offering. If you consent, you allow us to collect information about your usage behaviour on this website also by means of cookies or comparable technologies.<br><br>' +
            'The analysis is not carried out for the purpose of providing personalised content or advertising and is not used for direct communication with a specific person, but for the statistical analysis of website usage. According to etracker, the data generated with etracker is processed and stored exclusively in Germany. The data is not passed on to third parties.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.' +
            klarokratieGetTableHtml('Cookie:', 'et_allow_cookies', 'Duration:', 'max. 480 days') +
            klarokratieGetTableHtml('Cookie:', 'et_oi_v2', 'Duration:', '480 day - 50 years') +
            klarokratieGetTableHtml('Cookie:', 'et_scroll_depth', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'isSdEnabled', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', 'et_cssSelectors', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerEntries', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'et_tagManagerVarss', 'Duration:', 'Session')
        },
        de: {
          description: 'Wir verwenden etracker Analytics mit Cookies und vergleichbaren Technologien zur erweiterten statistischen Auswertung der Nutzung unserer Website. Anbieter ist die etracker GmbH, Erste Brunnenstraße 1, 20459 Hamburg, Deutschland, Website: <a href="https://www.etracker.com/" target="_blank" rel="noopener noreferrer">https://www.etracker.com/</a>.<br><br>' +
            'Die Verarbeitung dient der Analyse von Besuchen, Seitenaufrufen, Downloads und Interaktionen auf unserer Website, damit wir unser Webangebot kontinuierlich weiterentwickeln und verbessern können. Wenn Sie einwilligen, erlauben Sie uns, Ihr Nutzungsverhalten auf dieser Website auch mithilfe von Cookies oder vergleichbaren Technologien zu erfassen.<br><br>' +
            'Die Auswertung erfolgt nicht zum Zweck der Bereitstellung personalisierter Inhalte oder Werbung und nicht zur direkten Kommunikation mit einer bestimmten Person, sondern zur statistischen Auswertung der Website-Nutzung. Die mit etracker erzeugten Daten werden nach Angaben von etracker ausschließlich in Deutschland verarbeitet und gespeichert. Eine Weitergabe der Daten an Dritte erfolgt nicht.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.' +
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
