import {Injectable} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';

@Injectable()
export class TabGroupRepositoryService {

    private _storageKey: string = 'grpee';

    get(): TabGroup[] {
        return JSON.parse(localStorage.getItem(this._storageKey));
    }

    set(data: TabGroup[]) {
        localStorage.setItem(this._storageKey, JSON.stringify(data));
    }
}