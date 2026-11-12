"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveMinutesApiApi = void 0;
class FiveMinutesApiApi {
    constructor() {
        this.name = 'fiveMinutesApiApi';
        this.displayName = '5MinutesAPI API';
        this.documentationUrl = 'https://5minutesapi.com/';
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
    }
}
exports.FiveMinutesApiApi = FiveMinutesApiApi;
