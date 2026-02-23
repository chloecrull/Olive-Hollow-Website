import type { NextApiRequest, NextApiResponse } from 'next';
import docusign from 'docusign-esign';

/**
 * Creates a DocuSign envelope and sends it to the specified recipient. To use
 * this endpoint you must set DOCUSIGN_ACCOUNT_ID, DOCUSIGN_BASE_URL,
 * DOCUSIGN_INTEGRATOR_KEY and DOCUSIGN_ACCESS_TOKEN as environment variables.
 * Docusign eSignature automates document workflows to reduce manual work
 * chasing signatures【678963661032952†L350-L354】.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  const { recipientEmail, recipientName, documentBase64, fileName } = req.body;
  try {
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(process.env.DOCUSIGN_BASE_URL || '');
    apiClient.addDefaultHeader('Authorization', `Bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`);
    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    const envDef = new docusign.EnvelopeDefinition();
    envDef.emailSubject = 'Please sign the lease';
    envDef.documents = [
      {
        documentBase64,
        name: fileName,
        fileExtension: 'pdf',
        documentId: '1',
      },
    ];
    envDef.recipients = {
      signers: [
        {
          email: recipientEmail,
          name: recipientName,
          recipientId: '1',
          routingOrder: '1',
          tabs: {
            signHereTabs: [
              {
                anchorString: '/sn1/',
                anchorUnits: 'pixels',
                anchorXOffset: '10',
                anchorYOffset: '20',
              },
            ],
          },
        },
      ],
    };
    envDef.status = 'sent';
    const results = await envelopesApi.createEnvelope(process.env.DOCUSIGN_ACCOUNT_ID || '', {
      envelopeDefinition: envDef,
    });
    return res.status(200).json({ envelopeId: results.envelopeId });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}