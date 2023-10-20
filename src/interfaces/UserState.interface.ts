import { Application } from './Application.interface';

export interface UserState {
    isAuthenticated: boolean;
    role: string;
    email: string;
    name: string;
    onGoingApplication: Application | null;
}