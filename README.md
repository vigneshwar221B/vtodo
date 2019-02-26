# vtodo

A Note app created with **Node Js, MongoDb for database and PassportJs for Authentication.**

To run the app, just change the ADMIN and PASSWORD in dbkeys.js

```
dbPassword = 'mongodb+srv://<ADMIN>:<PASSWORD>@cluster0-tbqz7.mongodb.net/test?retryWrites=true/userdb';
```
I used Atlas. You can use localhost.

The public folder contains the **CSS**. The views folder contains all the **ejs** file. The model folder contains **userlist.js** which contains the user schema and the model itself.

The route folder have JS files which handles all the routes. The validation are also implemented there.

You might need some npm packages

```
    "bcryptjs"
    "body-parser"
    "connect-flash"
    "cookie-parser"
    "ejs"
    "express"
    "express-session"
    "lodash"
    "mongoose"
    "passport"
    "passport-local"

```

Feel free to fork it and make any changes you want.



