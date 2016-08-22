import {Injectable} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';

@Injectable()
export class TabGroupRepositoryService {

    private _storageKey: string = 'grpee';

    get(): Promise<TabGroup[]> {
        return new Promise<TabGroup[]>((resolve, reject) => {
            chrome.storage.sync.get('tabmonster', (items) => {
                if (items['tabmonster']) {
                    resolve(items['tabmonster']);
                } else {
                    resolve([]);
                }
            })
        });
    }

    set(data: TabGroup[]): Promise<void> {
        return new Promise<void>(
            (resolve, reject) => {
                chrome.storage.sync.set({ tabmonster: data }, () => {
                    resolve();
                })
            });
    }
}