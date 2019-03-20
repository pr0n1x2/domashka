const idSchema = {
    'title': 'ID',
    'description': 'Record ID in document',
    'type': 'object',
    'properties': {
        'id': {
            'description': 'Record ID',
            'type': 'string',
            'minLength': 24,
            'maxLength': 24
        },
    },
    'required': ['id']
};

module.exports = idSchema;