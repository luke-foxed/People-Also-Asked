export class CacheHelper {
  // Give each cache item unique ID
  generateCacheID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 6)
    );
  }

  // Write react state to cache
  writeToCache(state) {
    let ID = this.generateCacheID();
    if (state.response.group1.questions.length > 0) {
      this.removeOldCache();
      localStorage.setItem(ID, JSON.stringify(state));
      console.log("Cache written!");
      this.getLocalStorageSize();
    }
  }

  // Retrieve cache from localstorage
  getCache() {
    let cache = [];
    let values = Object.keys(localStorage);
    values.forEach(cacheItem => {
      cache.push(JSON.parse(localStorage.getItem(cacheItem)));
    });

    return cache;
  }

  // Check if search term exists in cache
  checkCacheForSearchTerm(searchTerm) {
    let foundItem;
    if (localStorage.length > 0) {
      let cache = this.getCache();
      foundItem = cache.find(cacheItem => {
        return cacheItem.searchTerm === searchTerm;
      });
    }
    return foundItem;
  }

  // Give indication of how much localstorage is used
  // https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
  getLocalStorageSize() {
    var _lsTotal = 0,
      _xLen,
      _x;
    for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
        continue;
      }
      _xLen = (localStorage[_x].length + _x.length) * 2;
      _lsTotal += _xLen;
      //   console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }

    let total = (_lsTotal / 1024).toFixed(2);
    console.log(`Total = ${total}KB / 5000KB`);
  }

  // If cache length has exited limit, remove oldest entry
  removeOldCache() {
    if (localStorage.length === 200) {
      console.log("Removing earliest cache entry...");
      let lastCacheItem = localStorage.key(0);
      localStorage.removeItem(lastCacheItem);
    }
  }
}
