import {Component, OnInit} from 'angular2/core';
import {TabGroup} from './entities/tabgroup/tabgroup';
import {NewTabGroupComponent} from './components/newtabgroup/newtabgroup.component';
import {TabGroupDetailComponent} from './components/tabgroupdetail/tab-group-detail.component';
import {TabService} from './services/tab/tab.service';
import {TabGroupRepositoryService} from './services/tabgrouprepository/tab-group-repository.service'
import {TabManagerService} from './services/tabmanager/tab-manager.service'

@Component({
    moduleId: __moduleName,
    selector: 'my-app',
    templateUrl: 'app.component.htm',
    directives: [NewTabGroupComponent, TabGroupDetailComponent],
    providers: [TabService, TabGroupRepositoryService, TabManagerService]
    // REALLY INTERSTING POINT! When resolving injected services, the DI framework looks at the lowest component first
    // If the service is a listed _provider_ then it creates a new instance of that provider.
    // If the service is not listed, IT CHECKS THE PARENT COMPONENT. If the parent component uses it, then the child uses THE SAME INSTANCE.
    // If not found, then Angular spews up.
})
export class AppComponent implements OnInit {

    tabGroups: TabGroup[];

    title = 'Tab Monster';
    divcolour = "lightgray";
    
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
