(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
      name: "google-analytics",
      purposes: ["statistics"],
      default: true,
      required: true,
      cookies: [

      ],
      translations: {
        zz: {
          title: 'Google Analytics Cookieless'
        },
        en: {
          description: 'We use Google Analytics for the statistical analysis of the use of our website. The provider is Google Ireland Limited. Google Analytics may be technically integrated through Google Tag Manager.<br><br>' +
            'Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Analytics is used for the aggregated statistical analysis of the use of our website, reach measurement and the improvement of our services. In the restricted basic configuration used here, no analytics or marketing cookies are set and no information is stored on or accessed from your device that would require consent. The analysis is not carried out for the purpose of providing personalised content or advertising and is not used for direct communication with a specific person.<br><br>' +
            'The legal basis for the use of Google Analytics in this restricted basic configuration is Section 25(2) no. 2 TDDDG, insofar as the use is strictly necessary for providing the website and for consent-free reach measurement without cookies or comparable identifiers. Where personal data is processed, the processing is carried out on the basis of Article 6(1)(f) GDPR. Our legitimate interest lies in the privacy-friendly statistical analysis, stabilisation and optimisation of our online offering.<br><br>' +
            'The transfer of personal data to Google LLC in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly. According to its own information, Google LLC is certified under the EU-US Data Privacy Framework.'
        },
        de: {
          description: 'Wir verwenden Google Analytics zur statistischen Analyse der Nutzung unserer Website. Anbieter ist Google Ireland Limited. Die technische Einbindung von Google Analytics kann über den Google Tag Manager erfolgen.<br><br>' +
            'Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Analytics dient der aggregierten statistischen Auswertung der Nutzung unserer Website, der Reichweitenmessung und der Verbesserung unseres Angebots. In der hier verwendeten Grundkonfiguration werden keine Analyse- oder Marketing-Cookies gesetzt und keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen, die einer Einwilligung bedürfen. Die Auswertung erfolgt nicht zur Bereitstellung personalisierter Inhalte oder Werbung und nicht zur direkten Kommunikation mit einer bestimmten Person.<br><br>' +
            'Rechtsgrundlage für den Einsatz von Google Analytics in dieser eingeschränkten Grundkonfiguration ist § 25 Abs. 2 Nr. 2 TDDDG, soweit der Einsatz für die Bereitstellung der Website und die einwilligungsfreie Reichweitenmessung ohne Cookies oder vergleichbare Identifier unbedingt erforderlich ist. Soweit personenbezogene Daten verarbeitet werden, erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der datenschutzfreundlichen statistischen Analyse, Stabilisierung und Optimierung unseres Webangebots.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Google LLC in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist. Google LLC ist nach eigener Angabe nach dem EU-US Data Privacy Framework zertifiziert.'
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

        // console.log('Google Analytics Cookieless allowed! Thank you!');
      `,
      onDecline: `
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
