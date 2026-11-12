"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveMinutesApiApi = void 0;
class FiveMinutesApiApi {
    constructor() {
        this.name = 'fiveMinutesApiApi';
        this.displayName = '5MinutesAPI API';
        this.documentationUrl = 'https://5minutesapi.com/dashboard';
        this.icon = 'file:logo.svg';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.5minutesapi.com',
                url: '/v1/me',
            },
        };
    }
}
exports.FiveMinutesApiApi = FiveMinutesApiApi;
