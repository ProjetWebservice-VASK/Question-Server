var swagger = require('swagger-framework');

var host = '127.0.0.1';
var port = (process.env.PORT || 8081);
var url = 'http://' + host + ':' + port;

var framework = swagger.Framework({ basePath: url });

var questionApi = framework.api({
    path: '/questions',
    description: 'Manage questions',
    consumes: ['application/hal+json'],
    produces: ['application/hal+json']
});

var questionResource = questionApi.resource({ path: '/questions' });

/**
 * GET all the questions
 */
questionResource.operation(
    {
        method: 'GET',
        summary: 'Retrieve all the questions',
        notes: 'questions are ordered by descending date',
        type: 'Question',
        nickname: 'getAll',
        parameters: [],
        responseMessages: [
            {
                code: 200,
                message: 'OK'
            }
        ]
    }
);

/**
 * POST a question
 */
questionResource.operation(
    {
        method: 'POST',
        summary: 'Create a new question',
        notes: '',
        type: 'Question',
        nickname: 'create',
        parameters: [
            {
                name: 'question',
                description: 'The sentence of the question',
                required: true,
                type: 'string',
                paramType: 'path'
            }
        ],
        responseMessages: [
            {
                code: 201,
                message: 'OK'
            }
        ]
    }
);

questionApi.model({
    id: 'Question',
    required: [],
    properties: {
        id: {
            type: 'integer',
            description: 'unique identifier for the question'
        },
        question: {
            type: 'string'
        },
        answer: {
            type: 'string'
        },
        date: {
            type: 'date'
        },
        processing: {
            type: 'boolean'
        }
    }
});

if (module.parent) {
    module.exports = framework;
} else {
    framework.server().listen(port, host, function(err) {
        if (err) throw err;

        console.log('Server started ' + url + '/');
    });
}