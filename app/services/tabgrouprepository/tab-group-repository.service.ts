import {Injectable} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';

@Injectable()
export class TabGroupRepositoryService {

    private _storageKey: string = 'grpee';

    get(): TabGroup[] {
        var tabgroup = JSON.parse(localStorage.getItem(this._storageKey));
        console.log(tabgroup);
        if (tabgroup) {
            return tabgroup;
        }
        return [];
    }

    set(data: TabGroup[]) {
        localStorage.setItem(this._storageKey, JSON.stringify(data));
    }
}