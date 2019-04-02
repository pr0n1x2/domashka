const registerSchema = {
    'title': 'User',
    'description': 'User profile',
    'type': 'object',
    'properties': {
        'name': {
            'description': 'User name',
            'type': 'string',
            'minLength': 2,
        },
        'surname': {
            'description': 'User surname',
            'type': 'string',
            "minLength": 2
        },
        'phone': {
            'description': 'User phone',
            'type': 'string',
            "pattern": "^\\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$"
        },
        'email': {
            'description': 'User E-mail',
            'type': 'string',
            'format': 'email'
        },
        'password': {
            'description': 'User password',
            'type': 'string',
            "minLength": 6
        },
        'password2': {
            'description': 'User password',
            'type': 'string',
            'minLength': 6,
            'const': {
                "$data": "1/password"
            },
        }
    },
    'required': ['name', 'surname', 'phone', 'email', 'password', 'password2']
};

module.exports = registerSchema;