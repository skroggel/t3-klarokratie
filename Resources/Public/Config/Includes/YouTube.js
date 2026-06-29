(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "youTube",
      purposes: ['multimedia'],
      // contextualConsentOnly: true,
      cookies: [
        /^LAST_RESULT_ENTRY_KEY/, // we delete the cookies if the user declines its use
        /^VISITOR_INFO1_LIVE/,
        /^VISITOR_PRIVACY_METADATA/,
        /^YSC/,
        /^__Secure-/,
        /^nextId/,
        /^requests/,
      ],
      translations: {
        zz: {
          title: 'YouTube'
        },
        en: {
          description: 'We use YouTube, a video service provided by Google Ireland Limited. YouTube is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'YouTube is used to embed and play videos on our website. The integration is usually carried out through an embedded video player, in particular by means of an iframe. When the video player is loaded and used, cookies may be set or comparable technologies may be used and personal data may be transmitted to and processed by Google, in particular IP address, device and browser information, usage data, interaction data with the video player and information about the video accessed.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Google LLC in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly. According to its own information, Google LLC is certified under the EU-US Data Privacy Framework.' +
            klarokratieGetTableHtml('Cookie:', 'LAST_RESULT_ENTRY_KEY', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'VISITOR_INFO1_LIVE', 'Dauer:', 'approx. 6 months') +
            klarokratieGetTableHtml('Cookie:', 'VISITOR_PRIVACY_METADATA', 'Dauer:', 'approx. 6 months') +
            klarokratieGetTableHtml('Cookie:', 'YSC', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '__Secure-ROLLOUT_TOKEN', 'Dauer:', 'approx. 6 months') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YEC', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YNID', 'Dauer:', 'approx. 6 months') +
            klarokratieGetTableHtml('Cookie:', 'nextId', 'Dauer:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'requests', 'Dauer:', 'Session')
        },
        de: {
          description: 'Wir verwenden YouTube, einen Videodienst des Anbieters Google Ireland Limited. YouTube wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">https://www.google.com/</a>.<br><br>' +
            'YouTube dient der Einbindung und Wiedergabe von Videos auf unserer Website. Die Einbindung erfolgt regelmäßig über einen eingebetteten Videoplayer, insbesondere mittels iFrame. Beim Laden und Verwenden des Videoplayers können Cookies gesetzt oder vergleichbare Technologien eingesetzt sowie personenbezogene Daten, insbesondere IP-Adresse, Geräte- und Browserinformationen, Nutzungsdaten, Interaktionsdaten mit dem Videoplayer sowie Informationen zum aufgerufenen Video, an Google übermittelt und von Google verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Google LLC in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist. Google LLC ist nach eigener Angabe nach dem EU-US Data Privacy Framework zertifiziert.' +
            klarokratieGetTableHtml('Cookie:', 'LAST_RESULT_ENTRY_KEY', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'VISITOR_INFO1_LIVE', 'Dauer:', 'ca. 6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'VISITOR_PRIVACY_METADATA', 'Dauer:', 'ca. 6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'YSC', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', '__Secure-ROLLOUT_TOKEN', 'Dauer:', 'ca. 6 Monate') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YEC', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', '__Secure-YNID', 'Dauer:', 'ca. 6 Monate') +
            klarokratieGetTableHtml('Cookie:', 'nextId', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'requests', 'Dauer:', 'Sitzung')
        },
      }
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
