export const userSecureValidationSchema = {
    securityQuestion: {
        notEmpty: {
            errorMessage: 'First name field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        }
    },
    securityAnswer: {
        notEmpty: {
            errorMessage: 'First name field must not be empty'
        },
        isString: {
            errorMessage: 'First name must be letter of the alphabet'
        }
    },
}