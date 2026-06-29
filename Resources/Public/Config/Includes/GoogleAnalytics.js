(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
      name: "google-analytics",
      purposes: ["statistics"],
      cookies: [
        /^_ga(_.*)?/, // we delete the Google cookies if the user declines its use
        /^_gid/,
      ],
      translations: {
        zz: {
          title: 'Google Analytics'
        },
        en: {
          description: 'We use Google Analytics, a web analytics service provided by Google Ireland Limited. Google Analytics may be technically integrated through Google Tag Manager. Google Analytics is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Analytics is used to analyse the use of our website, measure reach and improve our services. Cookies may be set and personal data may be processed, in particular usage data, device and browser information, IP address and interaction data.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Google LLC in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly. According to its own information, Google LLC is certified under the EU-US Data Privacy Framework.' +
            klarokratieGetTableHtml('Cookie:', '_ga', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '_gid', 'Duration:', '24 hours') +
            klarokratieGetTableHtml('Cookie:', '_gat', 'Duration:', '1 minute') +
            klarokratieGetTableHtml('Cookie:', '_gac_*', 'Duration:', '90 days')
        },
        de: {
          description: 'Wir verwenden Google Analytics, einen Webanalysedienst des Anbieters Google Ireland Limited. Die technische Einbindung von Google Analytics kann über den Google Tag Manager erfolgen. Google Analytics wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Analytics dient der Analyse der Nutzung unserer Website, der Reichweitenmessung und der Verbesserung unseres Angebots. Hierbei können Cookies gesetzt und personenbezogene Daten, insbesondere Nutzungsdaten, Geräte- und Browserinformationen, IP-Adresse sowie Interaktionsdaten, verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Google LLC in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist. Google LLC ist nach eigener Angabe nach dem EU-US Data Privacy Framework zertifiziert.' +
            klarokratieGetTableHtml('Cookie:', '_ga', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', '_ga_*', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', '_gid', 'Dauer:', '24 Stunden') +
            klarokratieGetTableHtml('Cookie:', '_gat', 'Dauer:', '1 Minute') +
            klarokratieGetTableHtml('Cookie:', '_gac_*', 'Dauer:', '90 Tage')
        },
      },
      onInit: `
      `,
      onAccept: `

        klarokratieInjectGoogleTagManager();

        // we notify the tag manager about all services that were accepted. You can define
        // a custom event in GTM to load the service if consent was given.
        for(let k of Object.keys(opts.consents)){
          if (opts.consents[k]){
            let eventName = 'klaro-'+k+'-accepted';
            dataLayer.push({'event': eventName});
            // console.log('Event "' + eventName + '" fired');
          }
        }

        // we grant data storage
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
        });
        // console.log('Google Analytics allowed! Thank you!');
      `,
      onDecline: `
        // we again explicitly deny data storage
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
        });
        // console.log('Google Analytics denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
