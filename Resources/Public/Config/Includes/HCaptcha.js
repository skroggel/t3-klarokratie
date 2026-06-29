(function() {
  if (
    typeof klaroConfig === 'object' &&
    Array.isArray(klaroConfig.services)
  ) {
    const additionalService = {
      name: 'captcha',
      default: true,
      required: true,
      purposes: ['functional'],
      cookies: [
        /^__cf_bm/, // we delete the cookies if the user declines its use
        /^__cflb/,
        /^hcaptcha/,
      ],
      translations: {
        zz: {
          title: 'Captcha (hCaptcha)'
        },
        en: {
          description: 'We use hCaptcha, a service for protecting against spam, bots and abusive use. The provider is Intuition Machines, Inc., 1065 SW 8th St #704, Miami, FL 33130, USA, website: <a href="https://www.hcaptcha.com/" target="_blank" rel="noopener noreferrer">https://www.hcaptcha.com/</a>.<br><br>' +
            'hCaptcha is used to verify whether input on our website, in particular in forms, is made by a natural person or automatically by bots. This helps us protect our website against spam, abuse and automated attacks. Cookies or comparable technologies may be used and personal data may be processed, in particular IP address, device and browser information, technical usage data, interaction data with the captcha and, where applicable, mouse movements or other behavioural signals.<br><br>' +
            'The legal basis for storing and accessing information on your device is Section 25(2) no. 2 TDDDG, insofar as this is strictly necessary to provide the security function and to protect our website against abuse. Where personal data is processed, the processing is carried out on the basis of Article 6(1)(f) GDPR. Our legitimate interest lies in protecting our website, forms and IT systems against spam, bots, automated attacks and abusive use.<br><br>' +
            'The transfer of personal data to Intuition Machines, Inc. in the USA cannot be ruled out. For data transfers to the USA, an adequacy decision of the European Commission pursuant to Article 45 GDPR may apply on the basis of the EU-US Data Privacy Framework, provided that the respective recipient is certified accordingly.' +
            klarokratieGetTableHtml('Cookie:', '__cf_bm', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', '__cflb', 'Duration:', 'Session') +
            klarokratieGetTableHtml('Cookie:', 'hcaptcha', 'Duration:', 'Session')
        },
        de: {
          description: 'Wir verwenden hCaptcha, einen Dienst zum Schutz vor Spam, Bots und missbräuchlicher Nutzung. Anbieter ist Intuition Machines, Inc., 1065 SW 8th St #704, Miami, FL 33130, USA, Website: <a href="https://www.hcaptcha.com/" target="_blank" rel="noopener noreferrer">https://www.hcaptcha.com/</a>.<br><br>' +
            'hCaptcha dient dazu zu überprüfen, ob Eingaben auf unserer Website, insbesondere in Formularen, durch eine natürliche Person oder automatisiert durch Bots erfolgen. Hierdurch schützen wir unsere Website vor Spam, Missbrauch und automatisierten Angriffen. Dabei können Cookies gesetzt oder vergleichbare Technologien eingesetzt sowie personenbezogene Daten, insbesondere IP-Adresse, Geräte- und Browserinformationen, technische Nutzungsdaten, Interaktionsdaten mit dem Captcha sowie gegebenenfalls Mausbewegungen oder sonstige Verhaltenssignale, verarbeitet werden.<br><br>' +
            'Rechtsgrundlage für das Speichern und Auslesen von Informationen auf Ihrem Endgerät ist § 25 Abs. 2 Nr. 2 TDDDG, soweit dies für die Bereitstellung der Sicherheitsfunktion und den Schutz unserer Website vor Missbrauch unbedingt erforderlich ist. Soweit personenbezogene Daten verarbeitet werden, erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im Schutz unserer Website, Formulare und IT-Systeme vor Spam, Bots, automatisierten Angriffen und missbräuchlicher Nutzung.<br><br>' +
            'Eine Übermittlung personenbezogener Daten an Intuition Machines, Inc. in die USA kann nicht ausgeschlossen werden. Für Datenübermittlungen in die USA kann ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO auf Grundlage des EU-US Data Privacy Framework bestehen, soweit der jeweilige Empfänger hierfür zertifiziert ist.' +
            klarokratieGetTableHtml('Cookie:', '__cf_bm', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', '__cflb', 'Dauer:', 'Sitzung') +
            klarokratieGetTableHtml('Cookie:', 'hcaptcha', 'Dauer:', 'Sitzung')
        },
      },
    };

    if (!klaroConfig.services.find(service => service.name === additionalService.name)) {
      klaroConfig.services.push(additionalService);
    }
  }
})();
