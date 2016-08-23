/// <reference path="../../../typings/chrome/chrome.d.ts"/>

import {Injectable} from 'angular2/core';
import {TabGroup} from '../../entities/tabgroup/tabgroup';
import {Tab} from '../../entities/tab/tab';

@Injectable()
export class TabManagerService {

    /**
     * Get a list of the currently open tabs
     */
    getTabs(): Promise<Tab[]> {
        return new Promise<Tab[]>((resolve, reject) => {
            var queryInfo: chrome.tabs.QueryInfo = {
                currentWindow: true
            };

            chrome.tabs.query(queryInfo,
                (tabs: chrome.tabs.Tab[]) => {
                    var myTabs: Tab[] = tabs.map((t) => {
                        return new Tab(t.id, t.url, t.pinned);
                    });

                    resolve(myTabs);
                });
        });
    }

    /**
     * Create a tab in the chrome instance
     */
    createTab(tab: Tab) {
        chrome.tabs.create({
            url: tab.url,
            pinned: tab.pinned
        });
    }

    /**
     * Remove a list of tabs from the chrome instance
     */
    removeTabs(tabs: Tab[]) {
        chrome.tabs.remove(tabs.map((t) => t.id));
    }
}