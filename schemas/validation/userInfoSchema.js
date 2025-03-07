export const userInfoValidationSchema = {
    firstName: {
        notEmpty: {
            errorMessage: 'First name field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: 'First name field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        }
    },
    mobile: {
        notEmpty: {
            errorMessage: 'First name field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        }
    },
    address: {
        notEmpty: {
            errorMessage: 'Address field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        },
        isLength: {
            options: {
                min: 8
            },
            errorMessage: 'Your address should be more decriptive please'
        }
    },
}