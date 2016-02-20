import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {TabGroup} from '../entities/tabgroup/tabgroup';

@Component({
    selector: 'tab-group-detail',
    templateUrl: 'app/tabgroupdetail/tab-group-detail.component.htm'
})
export class TabGroupDetailComponent {

    @Input('tab-group') tabGroup: TabGroup;

    @Output() sync: EventEmitter<TabGroup> = new EventEmitter<TabGroup>();
    
    @Output() delete: EventEmitter<TabGroup> = new EventEmitter<TabGroup>();
    
    @Output() load: EventEmitter<TabGroup> = new EventEmitter<TabGroup>();
    
    syncHandle(){
        this.sync.emit(this.tabGroup);
    }
    
    loadHandle(){
        this.load.emit(this.tabGroup);
    }
    
    deleteHandle(){
        this.delete.emit(this.tabGroup);
    }
}