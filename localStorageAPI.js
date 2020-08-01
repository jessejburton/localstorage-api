class LocalStorageAPI {
  constructor() {
    // console.log("Local Storage API Created")
  }

  static createCollection(name) {
    if (localStorage.getItem(name)) return
    localStorage.setItem(name, "[]")
    return [];
  }

  static deleteCollection(name) {
    if (confirm(`Are you sure you would like to remove the entire ${name} collection?`)) {
      localStorage.removeItem(name);
      return true
    }
  }

  static getCollection(name) {
    return JSON.parse(localStorage.getItem(name))
  }

  static create(name, object) {
    let collection = this.getCollection(name)
    if (!collection) collection = this.createCollection(name)

    object.id = this.createUID()
    object.createdAt = new Date()
    let newCollection = [
      ...collection,
      object,
    ]
    localStorage.setItem(name, JSON.stringify(newCollection));
    return object
  }

  static update(name, object) {
    let collection = this.getCollection(name)
    if (!collection) return null
    let updated = false
    let newCollection = collection.map(item => {
      if (item.id === object.id) {
        updated = true
        return object
      } else {
        return item
      }
    })
    localStorage.setItem(name, JSON.stringify(newCollection));
    if (updated) return object
    return "Item not found"
  }

  static delete(name, object) {
    let collection = this.getCollection(name)
    if (!collection) return null
    let deleted = false
    let newCollection = collection.filter(item => item.id !== object.id)
    localStorage.setItem(name, JSON.stringify(newCollection));
    if (deleted) return "Item removed"
    return "Item not found"
  }

  static parseOptions(collection, options) {
    if (!options) return collection

    if (options.sort) {
      let isDate = false

      if (isDate) {
        collection = collection.sort((a, b) => {
          return new Date(b[options.sort]) - new Date(a[options.sort]) ? 1 : -1
        })
      } else {
        collection = collection.sort((a, b) => {
          if (options.order && options.order === "DESC") {
            return a[options.sort] < b[options.sort] ? 1 : -1
          } else {
            return b[options.sort] < a[options.sort] ? 1 : -1
          }
        })
      }
    }

    return collection
  }

  static get(name, object = null, options = null) {
    let collection = this.getCollection(name)
    if (!collection) return this.createCollection(name)

    if (!object) {
      return this.parseOptions(collection, options)
    }

    let newCollection = collection.filter(item => {
      for (var key in object) {
        return item[key] === object[key]
      }
    })

    newCollection = this.parseOptions(newCollection, options)
    return newCollection.length > 0 ? newCollection : "Item not found"
  }

  static getSingle(name, object = null, options = null) {
    let collection = this.get(name, object, options)
    return collection.length ? collection[0] : {}
  }

  static createUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}

export { LocalStorageAPI, LocalStorageAPI as ls }