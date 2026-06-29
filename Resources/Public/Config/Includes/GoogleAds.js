(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      // In GTM, you should define a custom event trigger named `klaro-google-ads-accepted` which should trigger the Google Ads integration.
      name: "google-ads",
      purposes: ["marketing"],
      cookies: [
        /^__gads/, // we delete the cookies if the user declines its use
        /^NID/,
        /^ANID/,
        /^IDE/,
        /^test_cookie/,
      ],
      translations: {
        zz: {
          title: 'Google Ads'
        },
        en: {
          description: 'We use Google Ads, an advertising and conversion measurement service provided by Google Ireland Limited. Google Ads may be technically integrated through Google Tag Manager. Google Ads is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Ads is used to measure the success of our advertisements, attribute conversions and, where applicable, display interest-based advertising. Cookies may be set and personal data may be processed, in particular usage data, device and browser information, IP address, interaction data and information about ad clicks and conversions.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Google LLC in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly. According to its own information, Google LLC is certified under the EU-US Data Privacy Framework.' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Duration:', '1 year') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Duration:', '15 minutes') +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Duration:', '13 months (in the EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Duration:', '13 months')
        },
        de: {
          description: 'Wir verwenden Google Ads, einen Werbe- und Conversion-Messdienst des Anbieters Google Ireland Limited. Die technische Einbindung von Google Ads kann über den Google Tag Manager erfolgen. Google Ads wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Ads dient der Messung des Erfolgs unserer Werbeanzeigen, der Zuordnung von Conversions und, soweit eingesetzt, der Ausspielung interessenbezogener Werbung. Hierbei können Cookies gesetzt und personenbezogene Daten, insbesondere Nutzungsdaten, Geräte- und Browserinformationen, IP-Adresse, Interaktionsdaten sowie Informationen zu Anzeigenklicks und Conversions, verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Google LLC in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist. Google LLC ist nach eigener Angabe nach dem EU-US Data Privacy Framework zertifiziert.' +
            klarokratieGetTableHtml('Cookie:', 'IDE', 'Dauer:', '1 Jahr') +
            klarokratieGetTableHtml('Cookie:', 'test_cookie', 'Dauer:', '15 Minuten', ) +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'ANID', 'Dauer:', '13 Monate (in der EU)') +
            klarokratieGetTableHtml('Cookie:', '__gads', 'Dauer:', '13 Monate')
        },
      },
      onInit: ``,
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
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        // console.log('Google Ads allowed! Thank you!');
      `,
      onDecline: `

        // we again explicitly deny data storage
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        // console.log('Google Ads denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
