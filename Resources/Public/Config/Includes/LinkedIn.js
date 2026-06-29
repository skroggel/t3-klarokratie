(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "linkedin",
      purposes: ['statistics'],
      cookies: [
        /^_li_(fat_id|ses\..*|giant)$/,
        /^UserMatchHistory$/,
        /^AnalyticsSyncHistory$/,
        /^(b|bs)cookie$/,
        /^li_gc$/,
        /^lidc$/,
        /^lang$/
      ],
      translations: {
        zz: {
          title: 'LinkedIn'
        },
        en: {
          description: 'We use LinkedIn Insight Tag, an analytics and marketing service provided by LinkedIn Ireland Unlimited Company. LinkedIn Insight Tag is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Ireland, email: <a href="mailto:info_impressum@cs.linkedin.com">[info_impressum@cs.linkedin.com](mailto:info_impressum@cs.linkedin.com)</a>, website: <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/</a>.<br><br>' +
            'LinkedIn Insight Tag is used to measure and analyse website activities, evaluate conversions, create target audiences and improve and display advertising campaigns on LinkedIn. Cookies may be set and personal data may be transmitted to LinkedIn and processed by LinkedIn for measurement, analytics, advertising and profiling purposes, in particular IP address, device and browser information, visited pages, interaction data, event data and cookie or device identifiers.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to LinkedIn Corporation in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly.' +
            klarokratieGetTableHtml('Cookie:', '_li_fat_id', 'Duration:', '30 days' ) +
            klarokratieGetTableHtml('Cookie:', '_li_ses.*', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '_li_giant', 'Duration:', '7 days') +
            klarokratieGetTableHtml('Cookie:', 'UserMatchHistory', 'Duration:', '30 days') +
            klarokratieGetTableHtml('Cookie:', 'AnalyticsSyncHistory', 'Duration:', '30 days') +
            klarokratieGetTableHtml('Cookie:', 'bcookie', 'Duration:', '2 years' ) +
            klarokratieGetTableHtml('Cookie:', 'bscookie', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'li_gc', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'lidc', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', 'lang', 'Duration:', 'Session')
        },
        de: {
          description: 'Wir verwenden LinkedIn Insight Tag, einen Analyse- und Marketingdienst des Anbieters LinkedIn Ireland Unlimited Company. LinkedIn Insight Tag wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Irland, E-Mail: <a href="mailto:info_impressum@cs.linkedin.com">[info_impressum@cs.linkedin.com](mailto:info_impressum@cs.linkedin.com)</a>, Website: <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/</a>.<br><br>' +
            'LinkedIn Insight Tag dient der Messung und Analyse von Website-Aktivitäten, der Auswertung von Conversions, der Bildung von Zielgruppen und der Verbesserung sowie Ausspielung von Werbekampagnen auf LinkedIn. Hierbei können Cookies gesetzt und personenbezogene Daten, insbesondere IP-Adresse, Geräte- und Browserinformationen, besuchte Seiten, Interaktionsdaten, Ereignisdaten sowie Cookie- oder Gerätekennungen, an LinkedIn übermittelt und von LinkedIn zu Mess-, Analyse-, Werbe- und Profilingzwecken verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an LinkedIn Corporation in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist.' +
            klarokratieGetTableHtml('Cookie:', '_li_fat_id', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', '_li_ses.*', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '_li_giant', 'Dauer:', '7 Tage') +
            klarokratieGetTableHtml('Cookie:', 'UserMatchHistory', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', 'AnalyticsSyncHistory', 'Dauer:', '30 Tage') +
            klarokratieGetTableHtml('Cookie:', 'bcookie', 'Dauer:', '2 Jahre' ) +
            klarokratieGetTableHtml('Cookie:', 'bscookie', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'li_gc', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'lidc', 'Dauer:', '24 Stunden') +
            klarokratieGetTableHtml('Cookie:', 'lang', 'Dauer:', 'Sitzung')
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
