const placeSchema = {
    'title': 'Google Place',
    'description': 'Place from Google API',
    'type': 'object',
    'properties': {
        'googleAddressId': {
            'description': 'Google address ID',
            'type': 'string',
            'minLength': 1,
        },
        'googlePlaceId': {
            'description': 'Google place ID',
            'type': 'string',
            "minLength": 1
        },
        'formattedAddress': {
            'description': 'Formatted address',
            'type': 'string',
            "minLength": 1
        },
        'name': {
            'description': 'Name of the place',
            'type': 'string',
        },
        'photos': {
            'description': 'List of place photos',
            'type': 'array',
            'minItems': 1,
            'items': {
                'type': 'string'
            }
        }
    },
    'required': ['googleAddressId', 'googlePlaceId', 'formattedAddress']
};

module.exports = placeSchema;