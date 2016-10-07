import { NodeCallback } from 'aramsay-framework';
export interface Bcrypt {
    compare(data: string, hash: string, callback: NodeCallback<boolean>): void;
}
