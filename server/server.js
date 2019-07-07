//express library
const express = require('express');
const app = express();

//can parse post body and makes it available under res.body
bodyParser = require('body-parser');
//parser post data as json
app.use(bodyParser.json());

//allow cors for local dev
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,PATCH');
    next();
});


//sample people data to init the local data
const initialPeople = [
    {
        id: 1,
        name: "person1",
        age: 20,
        balance: 1000,
        email: 'person1@email.com',
        address: 'one the road',
        visible: false,
    },
    {
        id: 2,
        name: "person2",
        age: 40,
        balance: 23,
        email: 'person2@email.com',
        address: 'two the road',
        visible: false,
    }
];

//setup a template for the response object
//uses a status object for the consuming system to check before using the data
const getAPIResponse = () => {
    return {
        status: {
            code: 200,
            text: 'OK'
        },
        data: {}
    };
};

//start with some sample people data
let people = initialPeople;

app.listen(5000, function () {
    console.log('server listening on port 5000')
});

app.get('/app/people', function (req, res) {
    let response = getAPIResponse();

    if (people != null && people.length > 0) {
        response.data = people;
    } else {
        response.status.code = 404;
        response.status.text = 'NOT_FOUND';
    }
    res.send(response);
});

app.post('/app/people', function (req, res) {
    let response = getAPIResponse();

    if (req.body) {
        //get body from post for new record.
        //could also validate the structure here as well
        let newRecord = req.body;

        //locate the id number for the next record
        if (people) {
            newRecord.id = people.length + 1;
        } else {
            people = [];
            newRecord.id = 1;
        }

        people.push(newRecord);
    }

    response.status.code = 201;
    response.status.text = "CREATED";
    res.send(response);
});

app.put('/app/people/:id', function (req, res) {
    let response = getAPIResponse();

    if (req.params.id) {
        if (people != null && people.length > 0) {
            let index = people.findIndex(person => person.id === parseInt(req.params.id, 10));

            if (index !== -1) {
                people[index].visible = req.body.visible;
            } else {
                response.status.code = 404;
                response.status.code = "NOT_FOUND";
            }
        }
    } else {
        response.status.code = 404;
        response.status.text = 'NOT_FOUND';
    }

    res.send(response);
});

app.delete('/app/people/:id', function (req, res) {
    let response = getAPIResponse();

    if (req.params.id && parseInt(req.params.id, 10)) {
        if (people != null && people.length > 0) {
            let index = people.findIndex(person => person.id === parseInt(req.params.id, 10));

            if (index !== -1) {
                //remove one element from array at given index
                people.splice(index, 1);
            } else {
                response.status.code = 404;
                response.status.code = "NOT_FOUND";
            }
        }
    } else {
        response.status.code = 404;
        response.status.text = 'NOT_FOUND';
    }

    res.send(response);
});