export class Tab {
    constructor(public id: number, public url: string, public pinned: boolean){}
}

export interface TabCallback {
    (tabs: Tab[]): void;
}