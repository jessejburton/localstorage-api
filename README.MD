# Local Storage API
## Build working prototypes with "live" data

This class will allow you to simulate an API and database backend in the browser for rapid prototyping.

Not meant to be an alternative to backend storage, simply a tool that allows you to create prototypes that work as if they have a backend.

## To Use
### NPM
You can install this as an npm package using:

    npm i localstorage-collection-api

And then import it in to your project with:

    import { ls } from 'localstorage-collection-api'

Then in your JavaScript you will have access to the LocalStorageAPI and all of the methods outlined below.

### Download
You can also just download the LocalStorageAPI.js file from this repository. To use it this way you must include the type="module" attribute in your javascript file:

    <script type="module" src="main.js"></script>

And then you can import the module via:

    import { ls } from './localStorageAPI.js'

<font size="1">use ./ if the file is in the same folder or specify the relative path.</font>

## API

### Collections
A collection is an array of objects stored in Local Storage.

#### Creating A New Collection
```javascript
    ls.createCollection("users")
```
Creates a new empty array called "users" in localStorage

#### Deleting a Collection
```javascript
    ls.deleteCollection("users")
```
Deletes a collection called "users" from localStorage if it exists

#### Getting a Collection
```javascript
    ls.getCollection("users")
```

```javascript
    ls.get("users")
```
Gets all items in the "users" collection if it exists, creates the collection if it doesn't and returns an empty array.

***

### Items
An item is an object within a collection. Unlike a real backend there are no schema restrictions or checks for duplicate records, whatever object you pass in gets added to the collection.

#### Create an Item
```javascript
    ls.create("users", {
      firstName: "Jesse",
      lastName: "Burton"
    })
```

Adds an item to the "users" collection with the properties of firstName and lastName.

A unique id field will automatically be created

A createdAt date will also be added to the item

If "users" collection doesn't exist it will be created

returns the object with the id.

#### Update an Item
```javascript
    ls.update("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6",
      firstName: "John",
      lastName: "Doe"
    })
```

Updates the item in the "users" collection with the same id property as the object passed in

returns the object or "Item not found".

#### Delete an Item
```javascript
    ls.delete("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6"
    })
```

Deletes the item in the "users" collection with the same id property as the object passed in.

This way you could pass in just the id as a property on an object, or the whole object.

returns "Item removed" or "Item not found".

#### Get an Item
```javascript
    ls.get("users", {
      id: "705e7dad-e0a3-495d-93dd-f088f98803a6"
    })
```

```javascript
    ls.get("users", {
      firstName: "Jesse"
    })
```

The first example will return an item in the "users" collection with the passed in id

The second example will return any item in the "users" collection with the firstName of "Jesse"

You can pass in any name value pair and it will return the items that match that parameter.

Currently only the first matching name/value pair is searched.

#### Options
The third paramter to the get function is an options object. Currently the available options are:

* sort
* order

So you can pass in an object to automatically sort the results ie.

```javascript
    ls.get("users", null, {
      sort: "firstName"
    })
```

```javascript
    ls.get("users", null, {
      sort: "createdAt",
      order: "DESC"
    })
```

```javascript
    ls.get(
      "users",
      {
        firstName: "Jesse"
      },
      {
        sort: "lastName",
        order: "DESC"
      })
```

By default the order is ASC, you can pass in DESC to reverse the results

By passing null as the second paramater you are requesting all items.

Pass in a search parameter to filter and sort the results

Date fields are automatically detected and sorted