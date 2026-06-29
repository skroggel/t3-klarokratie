(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: 'google-maps',
      purposes: ['multimedia'],
      contextualConsentOnly: true,

      cookies: [
        /^NID$/,
        /^_Secure-ENID$/,
        /^SOCS$/,
        /^AEC$/,
        /^SID$/,
        /^HSID$/,
        /^__Secure-/,
        /^CONSENT$/,
        /^1P_JAR$/,
      ],

      translations: {
        zz: {
          title: 'Google Maps'
        },

        en: {
          description:'We use Google Maps, a map service provided by Google Ireland Limited. Google Maps is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Maps is used to display interactive maps and to provide map functions on our website. Cookies may be set and personal data may be processed, in particular IP address, location data if you have enabled it, device and browser information, usage data and interaction data with the map.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Google LLC in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly. According to its own information, Google LLC is certified under the EU-US Data Privacy Framework.' +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', '_Secure-ENID', 'Duration:', '13 months') +
            klarokratieGetTableHtml('Cookie:', 'SOCS', 'Duration:', '13 months') +
            klarokratieGetTableHtml('Cookie:', 'AEC', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', 'SID', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', 'HSID', 'Duration:', '2 years') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YNID', 'Duration:', '6 months') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YENID', 'Duration:', '13 months') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YEC', 'Duration:', '13 months') +
            klarokratieGetTableHtml('Cookie:', '__Secure-ROLLOUT_TOKEN', 'Duration:', '6 months')
        },

        de: {
          description: 'Wir verwenden Google Maps, einen Kartendienst des Anbieters Google Ireland Limited. Google Maps wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'Google Maps dient der Anzeige interaktiver Karten und der Nutzung von Kartenfunktionen auf unserer Website. Hierbei können Cookies gesetzt und personenbezogene Daten, insbesondere IP-Adresse, Standortdaten, sofern diese von Ihnen freigegeben werden, Geräte- und Browserinformationen, Nutzungsdaten sowie Interaktionsdaten mit der Karte, verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Google LLC in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist. Google LLC ist nach eigener Angabe nach dem EU-US Data Privacy Framework zertifiziert.' +
            klarokratieGetTableHtml('Cookie:', 'NID', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', '_Secure-ENID', 'Dauer:', '13 Monate') +
            klarokratieGetTableHtml('Cookie:', 'SOCS', 'Dauer:', '13 Monate') +
            klarokratieGetTableHtml('Cookie:', 'AEC', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'SID', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', 'HSID', 'Dauer:', '2 Jahre') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YNID', 'Dauer:', '6 Monate') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YENID', 'Dauer:', '13 Monate') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YEC', 'Dauer:', '13 Monate') +
            klarokratieGetTableHtml('Cookie:', '__Secure-ROLLOUT_TOKEN', 'Dauer:', '6 Monate')
        },
      },
      onInit: `
      `,
      onAccept: `
        // console.log('Google Maps allowed! Thank you!');
      `,
      onDecline: `
        // console.log('Google Maps denied! You are welcome!');
      `,
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
