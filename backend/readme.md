### SETUP:
Create `AppData` folder in root. Into this folder create empty file `tokens` and folder `log`.
Run `npm i`
And after successful install run `npm start` (or `nodemon start`)

### API Services:

LOGIN:

    POST /api/login
    body:
    {
        "pin": 0000<int>
    }
    ==> 
    {
        "message": "Login was successful!"<str>,
        "token": kuf6m40pcux9u4dw62<str>,
        "expiresIn": "7200"<str>
    }
..............................................................................
    
    GET /api/login
    headers:
    {
        x-api: kuf6m40pcux9u4dw62<str>
    }
    ==>
    {
        "message": "The token is (in)valid!"<str>
    }
..............................................................................
    
    GET /api/login/expiration
    headers:
    {
        x-api: kuf6m40pcux9u4dw62<str>
    }
    ==>
    {
        "message": "Date when token expires."<str>,
        "expirationTimestamp": 1633512053977<int>,
        "expirationDate": "06.10.2021 11:20:53"<str>
    }
..............................................................................

