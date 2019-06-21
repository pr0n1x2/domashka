const authJsonSchema = {
    'title': 'Authorization',
    'description': 'Authorization on the site',
    'type': 'object',
    'properties': {
        'name': {
            'description': 'Display name',
            'type': 'string',
            'minLength': 3,
            'maxLength': 30
        },
        'roomId': {
            'description': 'Room',
            'type': 'string',
            "minLength": 1
        },
    },
    'required': ['name', 'roomId']
};

module.exports = authJsonSchema;