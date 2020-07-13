# Local Storage API
## Build working prototypes with "live" data

This class will allow you to simulate an API and database backend in the browser for rapid prototyping.

Not meant to be an alternative to backend storage, simply a tool that allows you to create prototypes that work as if they have a backend.

## To Use

Simply dpwnload and include the localStorageAPI.js file in your project using:

    <script src="localStorageAPI.js"></script>

Then in your JavaScript you will have access to the LocalStorageAPI and all of the methods outlines below.

## API
So that you don't have to type LocalStorageAPI each time you can reference it via a simpler variable, for example:

```javascript
    const ds = LocalStorageAPI
    ds.createCollection("users")
```

***

### Collections
A collection is an array of objects stored in Local Storage.

#### Creating A New Collection
```javascript
    ds.createCollection("users")
```
Creates a new empty array called "users" in localStorage

#### Deleting a Collection
```javascript
    ds.deleteCollection("users")
```
Deletes a collection called "users" from localStorage if it exists

#### Getting a Collection
```javascript
    ds.getCollection("users")
```

```javascript
    ds.get("users")
```
Gets all items in the "users" collection if it exists

***

### Items
An item is an object within a collection. Unlike a real backend there are no schema restrictions or checks for duplicate records, whatever object you pass in gets added to the collection.

#### Create an Item
```javascript
    ds.create("users", {
      firstName: "Jesse",
      lastName: "Burton"
    })
```

Adds an item to the "users" collection with the properties of firstName and lastName.

A unique id field will automatically be created

If "users" collection doesn't exist it will be created

returns the object with the id.

#### Update an Item
```javascript
    ds.update("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6",
      firstName: "John",
      lastName: "Doe"
    })
```

Updates the item in the "users" collection with the same id property as the object passed in

returns the object or "Item not found".

#### Delete an Item
```javascript
    ds.delete("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6"
    })
```

Deletes the item in the "users" collection with the same id property as the object passed in.

This way you could pass in just the id as a property on an object, or the whole object.

returns "Item removed" or "Item not found".

#### Get an Item
```javascript
    ds.get("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6"
    })
```

```javascript
    ds.get("users", {
      firstName: "Jesse"
    })
```

The first example will return an item in the "users" collection with the passed in id

The second example will return any item in the "users" collection with the firstName of "Jesse"

You can pass in any name value pair and it will return the items that match that parameter.

Currently only the first name value pair is searched.