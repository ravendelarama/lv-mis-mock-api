// src/types/types.d.ts

interface WebhookEvent {
    sender: {
        id: string; // PSID
    };
    message: {
        text: string; // Message text
    };
    recipient: {
        id: string
    },
}

interface Entry {
    messaging: WebhookEvent[];
}

export interface Body {
    object: string; // Expected to be 'page'
    entry: Entry[];
}
