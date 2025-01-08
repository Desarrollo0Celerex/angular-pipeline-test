export interface SendNotificationResponse {
    channelId: number;
    success: boolean;
    isRepeated: boolean;
    whatsappMessage?: string;
}
