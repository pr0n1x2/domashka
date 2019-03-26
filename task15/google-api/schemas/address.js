const addressSchema = {
    'title': 'Address',
    'description': 'User address',
    'type': 'object',
    'properties': {
        'googleId': {
            'description': 'Google address ID',
            'type': 'string',
            'minLength': 40,
            'maxLength': 40,
        },
        'address': {
            'description': 'Address',
            'type': 'string',
            "minLength": 1
        },
    },
    'required': ['googleId', 'address']
};

module.exports = addressSchema;