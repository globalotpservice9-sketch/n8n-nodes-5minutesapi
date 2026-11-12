import {
    IAuthenticateGeneric,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class FiveMinutesApiApi implements ICredentialType {
    name = 'fiveMinutesApiApi';
    displayName = '5MinutesAPI Authentication';
    // Gora yahan click kar ke seedha aapki site par API key lene aayega
    documentationUrl = 'https://5minutesapi.com/dashboard'; 

    properties: INodeProperties[] = [
        {
            displayName: 'Master API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
            description: 'Get your API Key from the 5MinutesAPI Dashboard (e.g., 5m_live_...)',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.apiKey}}',
            },
        },
    };
}