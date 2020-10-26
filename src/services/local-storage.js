// module with classes and logic for working with local storage in browsers with JavaScript
class StorageItem {
  key
  value

  constructor (data) {
    this.key = data.key
    this.value = data.value
  }
}

// class for working with local storage in browser (common that can use other classes for store some data)
export class LocalStorage {
  localStorageSupported;

  constructor () {
    this.localStorageSupported = typeof window.localStorage !== 'undefined' && window.localStorage !== null
  }

  // add value to storage
  add (key, item) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item)
    }
  }

  // get all values from storage (all items)
  getAllItems () {
    const list = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)

      list.push(new StorageItem({
        key: key,
        value: value
      }))
    }

    return list
  }

  // get only all values from localStorage
  getAllValues () {
    const list = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)

      list.push(value)
    }

    return list
  }

  // get one item by key from storage
  get (key) {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key)

      return item
    } else {
      return null
    }
  }

  // remove value from storage
  remove (key) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key)
    }
  }

  // clear storage (remove all items from it)
  clear () {
    if (this.localStorageSupported) {
      localStorage.clear()
    }
  }
}

export const localStoreWorker = new LocalStorage()
