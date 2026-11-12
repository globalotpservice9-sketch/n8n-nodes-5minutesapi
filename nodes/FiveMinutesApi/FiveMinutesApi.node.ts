import {
    IExecuteFunctions,
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
export class FiveMinutesApi implements INodeType {
    description: INodeTypeDescription = {
        displayName: '5MinutesAPI',
        name: 'fiveMinutesApi',
        icon: 'file:logo.svg', // Folder mein 'logo.svg' zaroor rakhein
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Send Enterprise WhatsApp Messages via 5MinutesAPI',
        defaults: { name: '5MinutesAPI' },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'fiveMinutesApiApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Send WhatsApp Template',
                        value: 'sendTemplate',
                        description: 'Send an official Meta WhatsApp Template',
                        action: 'Send a WhatsApp template',
                    },
                ],
                default: 'sendTemplate',
            },
            {
                displayName: 'To Phone Number',
                name: 'toPhone',
                type: 'string',
                required: true,
                displayOptions: { show: { operation: ['sendTemplate'] } },
                default: '',
                description: 'Recipient phone number with country code (e.g., 923001234567)',
            },
            {
                displayName: 'WhatsApp Template Name',
                name: 'templateName',
                type: 'string',
                required: true,
                displayOptions: { show: { operation: ['sendTemplate'] } },
                default: '',
                description: 'Exact name of your approved template in Meta (e.g., order_confirmation)',
            },
            {
                displayName: 'Template Variables (Comma Separated)',
                name: 'variables',
                type: 'string',
                displayOptions: { show: { operation: ['sendTemplate'] } },
                default: '',
                description: 'Optional: Variables for your template body (e.g., John, $50.00)',
            },
            {
                displayName: 'Record ID (For Tracking)',
                name: 'recordId',
                type: 'string',
                displayOptions: { show: { operation: ['sendTemplate'] } },
                default: '',
                description: 'Optional: Your internal Order ID or Lead ID for tracking',
            },
            {
                displayName: 'Callback Webhook URL (For 2-Way Buttons)',
                name: 'callbackUrl',
                type: 'string',
                displayOptions: { show: { operation: ['sendTemplate'] } },
                default: '',
                description: 'Optional: URL to receive real-time Button Clicks from customers',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'sendTemplate') {
                const toPhone = this.getNodeParameter('toPhone', i) as string;
                const templateName = this.getNodeParameter('templateName', i) as string;
                const variablesStr = this.getNodeParameter('variables', i) as string;
                const recordId = this.getNodeParameter('recordId', i) as string;
                const callbackUrl = this.getNodeParameter('callbackUrl', i) as string;

                let variablesArray: string[] = [];
                if (variablesStr) {
                    variablesArray = variablesStr.split(',').map(v => v.trim());
                }

                const body: any = {
                    to: toPhone,
                    whatsapp_template: templateName,
                };

                if (variablesArray.length > 0) body.variables = variablesArray;
                if (recordId) body.record_id = recordId;
                if (callbackUrl) body.callback_url = callbackUrl;

                const options = {
                    method: 'POST',
                    body: body,
                    uri: 'https://api.5minutesapi.com/v1/send-message',
                    json: true,
                };

                try {
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'fiveMinutesApiApi', options);
                    returnData.push(responseData);
                } catch (error) {
                    if (this.continueOnFail()) {
                        returnData.push({ error: error.message });
                    } else {
                        throw error;
                    }
                }
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}