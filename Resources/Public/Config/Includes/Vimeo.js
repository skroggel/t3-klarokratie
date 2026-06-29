(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: "vimeo",
      purposes: ['multimedia'],
      // contextualConsentOnly: true,

      cookies: [
        /^_cf_bm$/,
        /^_cfuvid$/,
        /^(player|cf)_iclearance$/
      ],
      translations: {
        zz: {
          title: 'Vimeo'
        },
        en: {
          description: 'We use Vimeo, a video service provided by Vimeo.com, Inc. Vimeo is only activated if you have consented to the use of this service.<br><br>' +
            'Provider: Vimeo.com, Inc., 330 West 34th Street, 5th Floor, New York, NY 10001, USA, website: <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">https://vimeo.com/</a>.<br><br>' +
            'Vimeo is used to embed and play videos on our website. The integration is usually carried out through an embedded video player, in particular by means of an iframe. When the video player is loaded and used, cookies may be set or comparable technologies may be used and personal data may be transmitted to and processed by Vimeo, in particular IP address, device and browser information, usage data, interaction data with the video player and information about the video accessed.<br><br>' +
            'The legal basis for storing and accessing information on your device is your consent pursuant to Section 25(1) TDDDG. The legal basis for the subsequent processing of personal data is your consent pursuant to Article 6(1)(a) GDPR. You may withdraw your consent at any time with effect for the future.<br><br>' +
            'The transfer of personal data to Vimeo.com, Inc. in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly.' +
            klarokratieGetTableHtml('Cookie:', '_cf_bm', 'Duration:', '30 minutes') +
            klarokratieGetTableHtml('Cookie:', '_cfuvid', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '.*_iclearance', 'Duration:', 'Session')
        },
        de: {
          description: 'Wir verwenden Vimeo, einen Videodienst des Anbieters Vimeo.com, Inc. Vimeo wird nur aktiviert, wenn Sie in den Einsatz dieses Dienstes eingewilligt haben.<br><br>' +
            'Anbieter ist Vimeo.com, Inc., 330 West 34th Street, 5th Floor, New York, NY 10001, USA, Website: <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">https://vimeo.com/</a>.<br><br>' +
            'Vimeo dient der Einbindung und Wiedergabe von Videos auf unserer Website. Die Einbindung erfolgt regelmäßig über einen eingebetteten Videoplayer, insbesondere mittels iFrame. Beim Laden und Verwenden des Videoplayers können Cookies gesetzt oder vergleichbare Technologien eingesetzt sowie personenbezogene Daten, insbesondere IP-Adresse, Geräte- und Browserinformationen, Nutzungsdaten, Interaktionsdaten mit dem Videoplayer sowie Informationen zum aufgerufenen Video, an Vimeo übermittelt und von Vimeo verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist Ihre Einwilligung nach § 25 Abs. 1 TDDDG. Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Vimeo.com, Inc. in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework, soweit der jeweilige Empfänger hierfür zertifiziert ist.' +
            klarokratieGetTableHtml('Cookie:', '_cf_bm', 'Dauer:', '30 Minuten') +
            klarokratieGetTableHtml('Cookie:', '_cfuvid', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', '.*_iclearance', 'Dauer:', 'Sitzung')

        },
      },
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
