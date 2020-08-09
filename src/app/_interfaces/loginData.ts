import { User } from '../_models';


export interface loginData {
    success: boolean;
    user: User;
    msg: string;
}
