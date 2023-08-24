export interface CreateTask {
    title: string;
    message: string;
    buttonLabel: string;
    taskModuleId: number;
    cancelRoute: string | [];
}
