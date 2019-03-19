const userSchema = {
    'title': 'User',
    'description': 'Site user',
    'type': 'object',
    'properties': {
        'firstname': {
            'description': 'User first name',
            'type': 'string',
            'minLength': 2,
            'maxLength': 40
        },
        'lastname': {
            'description': 'User last name',
            'type': 'string',
            'minLength': 2,
            'maxLength': 40
        },
        'birthday': {
            'description': 'User birthday',
            'type': 'string',
            'format': 'date'
        }
    },
    'required': ['firstname', 'lastname', 'birthday']
};

module.exports = userSchema;