import {Injectable, Inject} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';
import {TabGroupRepositoryService} from '../tabgrouprepository/tab-group-repository.service'
import {TabManagerService} from '../tabmanager/tab-manager.service'

@Injectable()
export class TabService {

    constructor(
        @Inject(TabGroupRepositoryService) private _repository: TabGroupRepositoryService,
        @Inject(TabManagerService) private _tabManager: TabManagerService) {
    }

    get(): Promise<TabGroup[]> {
        return this._repository.get();
    }

    async addTabGroup(tabGroup: TabGroup): Promise<void> {
        var tabGroups = await this._repository.get();
        tabGroups.splice(0, 0, tabGroup);
        await this._repository.set(tabGroups);
    }

    async deleteTabGroup(tabGroup: TabGroup): Promise<void> {
        var tabGroups = await this._repository.get();
        
        var deleteElem = this._find(tabGroups, tabGroup);
        var index = tabGroups.indexOf(deleteElem);
        tabGroups.splice(index, 1);
        this._repository.set(tabGroups);
    }

    async syncTabGroup(tabGroup: TabGroup): Promise<void> {
        var tabs = await this._tabManager.getTabs();
        var tabGroups = await this._repository.get();
        var saveTabGroup = this._find(tabGroups, tabGroup);
        saveTabGroup.tabs = tabs;
        this._repository.set(tabGroups);
    }

    async loadTabGroup(tabGroup: TabGroup): Promise<void> {
        var tabs = await this._tabManager.getTabs();
        tabGroup.tabs.forEach((tab, index) => this._tabManager.createTab(tab));
        this._tabManager.removeTabs(tabs);
    }
    
    private _find(tabGroups:TabGroup[], tabGroup:TabGroup){
        return tabGroups.find((tg, i, tgs) => tg.name === tabGroup.name);
    }
}