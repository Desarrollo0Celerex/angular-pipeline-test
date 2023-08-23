export interface SendTaskNotfication {
    taskId: string;
    canSendByEmail: boolean;
    canSendByWhatsapp: boolean;
    email: string;
    phoneNumber: string;
    taskTitle: string;
    taskDetails: string;
    workspaceName: string;
    workspaceAvatarUrl: string;
    createdByName: string;
}
