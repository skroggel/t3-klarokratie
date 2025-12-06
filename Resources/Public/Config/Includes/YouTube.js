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
          description: 'We use the YouTube service provided by Google Ireland Limited, Gordon House, Barrow Street, 4 Dublin, Ireland, email: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>. If YouTube is active on our website and a video is played, our website establishes a connection to the servers of Google Ireland Limited and transmits the data required to display the stream or video. With regard to the transfer of personal data to the USA, there is an adequacy decision on the EU-US Data Privacy Framework of the EU Commission within the meaning of Art. 45 GDPR (hereinafter: <a href="https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en">DPF</a>). The operator of the service is certified under the DPF, so that the usual level of protection of the GDPR applies to the transfer.\n' +
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
          description: 'Wir verwenden auf unserer Seite den Dienst YouTube des Unternehmens Google Ireland Limited, Gordon House, Barrow Street, 4 Dublin, Irland, E-Mail: <a href="mailto:support-deutschland@google.com">support-deutschland@google.com</a>, Website: <a href="https://www.google.com/" target="_blank">https://www.google.com/</a>. Sofern Youtube auf unserer Website aktiv geschaltet ist und ein Video abgespielt wird, stellt unsere Website eine Verbindung zu den Servern des Unternehmens Google Ireland Limited her und überträgt die benötigten Daten zur Anzeige des Streams bzw. Videos.\n' +
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
