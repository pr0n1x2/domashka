const addressSchema = {
    'title': 'Address',
    'description': 'User address',
    'type': 'object',
    'properties': {
        'googleId': {
            'description': 'Google address ID',
            'type': 'string',
            'minLength': 1,
        },
        'placeId': {
            'description': 'Google place ID',
            'type': 'string',
            "minLength": 1
        },
    },
    'required': ['googleId', 'address']
};

module.exports = addressSchema;