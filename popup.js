(function(){
  
  var tabsStorage = function(){
    
    var STORAGE_KEY = 'grpee';
    
    return {
      get: getData,
      set: setData
    };
    
    function getData(){
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    
    function setData(data){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }();
  
  var tabManager = function(){
    
    return {
      getTabs: getTabs,
      createTab: createTab,
      removeTabs: removeTabs
    };
    
    function getTabs(cb){
      var queryInfo = {
        currentWindow: true
      };
      
      chrome.tabs.query(queryInfo, function(tabs) {
        var myTabs = tabs.map(function(t){
          return { id: t.id, url: t.url, pinned: t.pinned };
        });
        cb(myTabs);
      });
    }
    
    function createTab(tab){
      chrome.tabs.create({
        url: tab.url,
        pinned: tab.pinned
      });
    }
    
    function removeTabs(tabs){
      chrome.tabs.remove(
        tabs.map(
          function(t){
            return t.id;
          }));
    }
  }();
  
  function handleSync(sender){
    
    var prop = sender.currentTarget.parentElement.parentElement.getAttribute('data-prop'),
      map = tabsStorage.get(),
      oldRow, newRow,
      listDiv = document.getElementById('list');
      
      tabManager.getTabs(function(tabs){
        
        map[prop].tabs = tabs;
  
        tabsStorage.set(map);
        
        oldRow = document.getElementById('div' + prop);
        newRow = createRow(map, prop);
        
        listDiv.insertBefore(newRow, oldRow);
        document.getElementById('list').removeChild(oldRow);
      });
      
  }
  
  function handleLoad(sender){
    
    var prop = sender.currentTarget.parentElement.parentElement.getAttribute('data-prop'),
      map = tabsStorage.get(),
      restoreTabs = map[prop].tabs;
    
    tabManager.getTabs(function(tabs){
        restoreTabs.forEach(function(tab, index) {
          tabManager.createTab(tab);
        });
        tabManager.removeTabs(tabs);
    });
    
  }
  
  function handleDelete(sender){
    
    var parent = sender.currentTarget.parentElement.parentElement,
      prop = parent.getAttribute('data-prop'),
      map = tabsStorage.get(),
      listDiv = document.getElementById('list');
    
    delete map[prop];
    tabsStorage.set(map);
    
    listDiv.removeChild(parent);
    
  }
    
  function createRow(map, item){  
    var itemDiv,
      nameDiv,
      buttonsDiv,
      button, 
      title,
      count;
  
      itemDiv = document.createElement('div');
      //itemDiv.className = 'row';
      itemDiv.id = 'div' + item;
      itemDiv.setAttribute('data-prop', item);
      
      nameDiv = document.createElement('div');
      //nameDiv.className = 'col-xs-8';
      itemDiv.appendChild(nameDiv);
      
      title = document.createElement('h3');
      title.textContent = map[item].name;
      count = document.createElement('small');
      title.appendChild(count)
      count.textContent = '[' + map[item].tabs.length + ']';
      nameDiv.appendChild(title);
      
      buttonsDiv = document.createElement('div');
      //buttonsDiv.className = 'col-xs-4';
      itemDiv.appendChild(buttonsDiv);
      
      button = document.createElement('button');
      button.textContent = 'sync';
      button.className = 'btn btn-primary btn-xs';
      button.addEventListener('click', handleSync);
      buttonsDiv.appendChild(button);
  
      button = document.createElement('button');
      button.textContent = 'load';
      button.className = 'btn btn-primary btn-xs';
      button.addEventListener('click', handleLoad);
      buttonsDiv.appendChild(button);
      
      button = document.createElement('button');
      button.textContent = 'delete';
      button.className = 'btn btn-primary btn-xs';
      button.addEventListener('click', handleDelete);
      buttonsDiv.appendChild(button);
      
      return itemDiv; 
  }
  
  function addRow(map, item){
    
    var listDiv = document.getElementById('list');
    listDiv.appendChild(createRow(map, item));
    
  }

  
  function handleNew(){
    var name = document.getElementById('txtNew').value,
      prop = name.replace(/\s/g, "_"),
      map = tabsStorage.get();
    
    if(prop.length === 0){
      return;
    }
    document.getElementById('txtNew').value = '';
    
    if(map.hasOwnProperty(prop)){
      alert('name conflict');
      return;
    }
  
    map[prop] = {
      name: name,
      tabs: []
    };
  
    tabsStorage.set(map);
    
    addRow(map, prop);
  }
  
  function init(){
    document.getElementById('btnNew').addEventListener('click', handleNew);
    var map = tabsStorage.get();
      
    if(map === null){
      map = {};
      storage.set('grpee', map);
      return;
    }  
    
    for(var item in map) {
      addRow(map, item);
    }
  }
    
  document.addEventListener('DOMContentLoaded', init);
}());
