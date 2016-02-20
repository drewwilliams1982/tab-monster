import {Component, OnInit} from 'angular2/core';
import {TabGroup} from './entities/tabgroup/tabgroup';
import {NewTabGroupComponent} from './newtabgroup/newtabgroup.component';
import {TabGroupDetailComponent} from './tabgroupdetail/tab-group-detail.component';
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

    constructor(private _tabService: TabService) { }

    ngOnInit() {
        this._init();
    }

    addGroup(tabGroup: TabGroup): void {
        this._tabService.addTabGroup(tabGroup);
        this._init();
    }

    deleteTabGroup(tabGroup: TabGroup): void {
        this._tabService.deleteTabGroup(tabGroup);
        this._init();
    }

    syncTabGroup(tabGroup: TabGroup): void {
        this._tabService.syncTabGroup(tabGroup);
    }

    loadTabGroup(tabGroup: TabGroup): void {
        this._tabService.loadTabGroup(tabGroup);
    }

    private _init(): void {
        this.tabGroups = this._tabService.get();
    }
}
