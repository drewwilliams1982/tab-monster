import {Component, OnInit} from 'angular2/core';
import {TabGroup} from './entities/tabgroup/tabgroup';
import {NewTabGroupComponent} from './components/newtabgroup/newtabgroup.component';
import {TabGroupDetailComponent} from './components/tabgroupdetail/tab-group-detail.component';
import {TabService} from './services/tab/tab.service';
import {TabGroupRepositoryService} from './services/tabgrouprepository/tab-group-repository.service'
import {TabManagerService} from './services/tabmanager/tab-manager.service'

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.htm',
    directives: [NewTabGroupComponent, TabGroupDetailComponent],
    providers: [TabService, TabGroupRepositoryService, TabManagerService]
})
export class AppComponent implements OnInit {

    tabGroups: TabGroup[];

    constructor(
        private _tabService: TabService 
    ){
    }

    ngOnInit() {
        this._init();
    }

    async addGroup(tabGroup: TabGroup): Promise<void> {
        await this._tabService.addTabGroup(tabGroup);
        this._init();
    }

    async deleteTabGroup(tabGroup: TabGroup): Promise<void> {
        await this._tabService.deleteTabGroup(tabGroup);
        this._init();
    }

    async syncTabGroup(tabGroup: TabGroup): Promise<void> {
        await this._tabService.syncTabGroup(tabGroup); 
        this._init();
    }

    async loadTabGroup(tabGroup: TabGroup): Promise<void> {
        await this._tabService.loadTabGroup(tabGroup);
    }

    private async _init(): Promise<void> {
        var tabGroups = await this._tabService.get();
        this.tabGroups = tabGroups;
    }
}
