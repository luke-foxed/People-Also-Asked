export class CacheHelper {
  generateCacheID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 6)
    );
  }

  writeToCache(state) {
    let ID = this.generateCacheID();
    localStorage.setItem(ID, JSON.stringify(state));
    console.log("Cache written!");
    this.getLocalStorageSize();
  }

  getCache() {
    let cache = [];

    let values = Object.keys(localStorage);

    values.forEach(element => {
      cache.push(JSON.parse(localStorage.getItem(element)));
    });

    return cache;
  }

  checkCacheForSearchTerm(searchTerm) {
    let foundItem;

    if (localStorage.length > 0) {
      let cache = this.getCache();

      foundItem = cache.find(element => {
        return element.searchTerm === searchTerm;
      });
    }

    return foundItem;
  }

  getLocalStorageSize() {
      
    // https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage

    var _lsTotal = 0,
      _xLen,
      _x;
    for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
        continue;
      }
      _xLen = (localStorage[_x].length + _x.length) * 2;
      _lsTotal += _xLen;
      console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }
    console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
  }
}
