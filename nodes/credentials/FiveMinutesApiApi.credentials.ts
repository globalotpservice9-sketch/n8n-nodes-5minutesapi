import {
    ICredentialType,
    INodeProperties,
    IAuthenticateGeneric,
    Icon,
    ICredentialTestRequest,
} from 'n8n-workflow';

export class FiveMinutesApiApi implements ICredentialType {
    name = 'fiveMinutesApiApi';
    displayName = '5MinutesAPI API';
    documentationUrl = 'https://5minutesapi.com/dashboard';
    icon = 'file:logo.svg' as Icon;

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

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.5minutesapi.com',
            url: '/v1/me',
        },
    };
}