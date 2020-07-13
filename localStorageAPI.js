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

    object.id = this.createUID();
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
        update = true
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

  static get(name, object = null) {
    let collection = this.getCollection(name)
    if (!collection) return null

    if (!object) return collection

    let newCollection = collection.filter(item => {
      for (var key in object) {
        return item[key] === object[key]
      }
    })
    return newCollection || "Item not found"
  }

  static createUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}