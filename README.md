# Pantry

## Project - Pantry Clone


### Key points
- Tried To Make A Clone Of Pantry APIS.
- Tech Stack:
   - Java Script
   - Node Js
   - MongoDB
   - PostMan
- So Basically The Overview Is We Have To Create Pantry And The Pantry ConTains Baskets And We Have To Perform CRUD
  Operation To Add Data ,Update Data And Delete Data From Basket.So For That I Have Created 6 APIS . 2 APIS For 
  Pantry And Another 4 For Basket.

### Models
- Pantry Model
```yaml
{ 
  name: {string},
  description: {string, default descritpion},
  notifications: {Boolean,default true},
  percentFull: {Number, default 0}, 
  baskets: {[Object]},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Basket Model
```yaml

{ 
  basketName: {string},
  basket: {Mixed Object}, 
  pantryId: {ObjectId, refs to pantry model},
  expire: {string},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

## Pantry APIs 
### POST /createpantry
- For Creating A Pantry We Have to Take The Email And Pantry Name From User.
- By Taking These Credential We Are Generating A Pantry For The User And To Access It We Are Providing The User A Unique Id.
- Return HTTP status 201 on a succesful pantry creation. Also return the PantryId. The response should be a JSON object like [this](#successful-response-structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)

### GET /pantry/:pantryId
- By Providing The Unique Pantryid In Params User Can Able To Access Their Pantry [this](#Pantry)
- On a successful Scenerio The response should be a JSON object like [this](#successful-response-structure)
- If the credentials are incorrect We Are returning a suitable error message with a valid HTTP status code. The response should be a JSON object  like [this](#error-response-structure)

## Basket API
### POST /pantry/:pantryId/:basketName
- Creating a Basket For A Pantry User By Taking The PantryId And basketName from Params and Basket Details From Request body[this](#Basket)
- BasketName is Unique If User Want To Create A Basket Of Same Name Then It Will Simply Override The Value Of The Existing Basket.
- After A Basket Created It Will Automatically Removed From Pantry After 24HR.
- Also We Are Checking That If The Pantry Capacity Is Full(i.e 100)Then Basket Cant Be Added.
- Returning HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like [this](#successful-response-structure) 
- Returning HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

### GET /pantry/:pantryId/:basketName
- In This Api By Taking The Pantryid And BasketName we Have To Find It In DB Then Simply Provide It To The User [here](#get-basket-response)
- Returning the HTTP status 200 if any Baskets are found. The response structure should be like [this](#successful-response-structure) 
- If no Basket Is found then We Are returning an HTTP status 404 with a response like [this](#error-response-structure) 

### PUT /pantry/:pantryId/basket/:basketName
- By Taking The PantryId And BasketName In Params We Have To Find It In DB.
- Then We Are Taking The Body From RequestBody And Simply Appending It to The Existing Data. 
- Return the HTTP status 200 On successful Update Scenerio. The response structure should be like [this](#successful-response-structure) 
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 

### DELETE /pantry/:pantryId/basket/:basketName
- By Taking The Pantryid And BasketId We Are Checking The Details Are Correct Or Not.
- If We Are Able To Find The Data Then We Are Simply Deleting The Basket Only From The DataBase Permanetly.
- If We Are Unable To Find The Details, return an HTTP status 404 with a response body like [this](#error-response-structure)
- Returning an HTTP status 200 if It Was Deleted successfully with a body like [this](#successful-response-structure) 


## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  Data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

## Collections
### Pantry
```yaml
{
    status: true,
    messege: "Successfully Fetched Your Pantry Details",
    Data: {
        "name": "Rahul",
        "description": "storing data",
        "notifications": true,
        "percentFull": 1,
        "baskets": [
            {
                "basketName": "basket",
                "expire": "2022-02-13T05:45:55.244Z"
            }
        ]
    }
}
```
### Basket
```yaml
{
   status: true,
    messege: "Your Pantry Was Updated By Basket basket",
    save: {
        "basketName": "basket",
        "basket": {
            "age": 21
        },
        "pantryId": "620619e8018146b79195c393",
        "expire": "2022-02-13T05:45:55.244Z",
        "_id": "620638093ed785396473d84a",
        "createdAt": "2022-02-11T10:18:49.756Z",
        "updatedAt": "2022-02-11T10:18:49.756Z",
        "__v": 0
    }
}
```


## Response examples
### Get basket response
```yaml
{
    status: true,
    messege: "Here's Your Basket !",
    Data: {
        "basket": {
            "hi": "there",
            "check": {
                "class": 5
            }
        }
    }
}
```
