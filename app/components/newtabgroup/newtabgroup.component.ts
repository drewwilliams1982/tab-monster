import {Component, EventEmitter, Output} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';

@Component({
    moduleId: __moduleName,
    selector: 'new-tab-group',
    templateUrl: 'newtabgroup.component.htm'
})
export class NewTabGroupComponent {

    constructor() { 
    }

    @Output() groupAdded: EventEmitter<TabGroup> = new EventEmitter<TabGroup>();

    name: string;

    addHandler(): void {
        if(this.name === undefined || this.name.length === 0){
            return;
        }
        
        var tabGroup: TabGroup = new TabGroup();
        tabGroup.name = this.name;
        this.groupAdded.emit(tabGroup);
        this.name = "";
    }
}