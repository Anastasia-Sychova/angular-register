const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const router = {};


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(
    bodyParser.urlencoded({extended: false})
);

server.use(
    bodyParser.json()
);

let users = [
    {
        "id": 1,
        "account_number": 1,
        "first_name": "Test",
        "last_name": "Test",
        "created": "2020-03-17T108:48:43.053+00:00",
        "email": "test@test.com",
        "password": 123456
    }
]

let currentUser = {
    "id": 1,
    "account_number": 1,
    "first_name": "Test",
    "last_name": "Test",
    "created": "2020-03-17T11:48:43.053+00:00"
};

// Add custom routes before JSON Server router
server.get('/me/status', (req, res) => {
    if (req.headers.token === '') {
        res.json(
            {
                token: req.headers.token,
                user: null
            }
        )
    }
    res.json(
        {
            token: req.headers.token,
            user: currentUser
        }
    )
});

server.post('/me/login', (req, res) => {
    let user = users.find(user =>
      user.email === req.body.email && String(user.password) === String(req.body.password)
    );

    if (user) {
        res.json(
            {
                "token": "123456asdf",
                "user": user
            }
        )
    } else {
        res.status(400);
        res.send('Login or password Incorrect!');
    }
});

server.post('/me/register', (req, res) => {

    if (req.body) {
        currentUser.id = getId();
        currentUser.first_name = req.body.first_name;
        currentUser.last_name = req.body.last_name;

        res.json(
            {
                "token": "123456fdsa",
                "user": currentUser
            }
        )
    } else {
        res.status(400);
        res.send('Empty request body!');
    }
});

server.get('/me/logout', (req, res) => {
    currentUser.id = 0;

    res.send('');
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.listen(1234, 'localhost', () => {
    console.log('JSON Server is running')
});

function getId() {
    return Math.floor(Math.random() * (1000 - 1) + 1);
}
