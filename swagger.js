var swagger = require('swagger-framework');

var host = '127.0.0.1';
var port = (process.env.PORT || 8081);
var url = 'http://' + host + ':' + port;

var framework = swagger.Framework({basePath: url});

var questionApi = framework.api({
    path: '/questions',
    description: 'Manage questions',
    consumes: ['application/hal+json'],
    produces: ['application/hal+json']
});

/**
 * Question resource
 */
var questionResource = questionApi.resource({path: '/questions'});

/**
 * GET all the questions
 */
questionResource.operation({
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
});

/**
 * POST a question
 */
questionResource.operation({
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
});

/**
 * Single Question resource
 */
var singleQuestionResource = questionApi.resource({path: '/questions/{id}'});

/**
 * GET a single question
 */
singleQuestionResource.operation({
    method: 'GET',
    summary: 'Retrieve a question',
    notes: '',
    type: 'Question',
    nickname: 'get',
    parameters: [
        {
            name: 'id',
            description: 'ID of the question to fetch',
            required: true,
            type: 'string',
            paramType: 'path'
        }
    ],
    responseMessages: [
        {
            code: 200,
            message: 'OK'
        }
    ]
});

/**
 * Question received resource
 */
var questionReceivedResource = questionApi.resource({path: '/questions/{id}/received'});

/**
 * POST the confirmation of the question's reception
 */
questionReceivedResource.operation({
    method: 'GET',
    summary: 'Confirm the question\'s reception',
    notes: 'has to be sent once the next pending question is retrieved',
    type: 'none',
    nickname: 'confirmReception',
    parameters: [
        {
            name: 'id',
            description: 'ID of the question',
            required: true,
            type: 'string',
            paramType: 'path'
        }
    ],
    responseMessages: [
        {
            code: 204,
            message: 'No Content'
        }
    ]
});

/**
 * Question answer resource
 */
var questionAnswerResource = questionApi.resource({path: '/questions/{id}/answer'});

/**
 * POST the question's answer
 */
questionAnswerResource.operation({
    method: 'PUT',
    summary: 'Answer the question',
    notes: '',
    type: 'none',
    nickname: 'answerQuestion',
    parameters: [
        {
            name: 'id',
            description: 'ID of the question',
            required: true,
            type: 'string',
            paramType: 'path'
        },
        {
            name: 'answer',
            description: 'Answer to the question',
            required: true,
            type: 'string',
            paramType: 'form'
        }
    ],
    responseMessages: [
        {
            code: 204,
            message: 'No Content'
        }
    ]
});

/**
 * Next question resource
 */
var nextQuestionResource = questionApi.resource({path: '/questions/next'});

/**
 * GET the next pending question
 */
nextQuestionResource.operation({
        method: 'GET',
        summary: 'Retrieve the next pending question',
        notes: 'once retrieved, a validation of the reception of this question must be sent',
        type: 'Question',
        nickname: 'getNextPending',
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
 * Question Model
 */
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
    framework.server().listen(port, host, function (err) {
        if (err) throw err;

        console.log('Server started ' + url + '/');
    });
}