export const userValidationSchema = {
    email: {
        isEmail: {
            errorMessage: "Email must be valid"
        },
        notEmpty: {
            errorMessage: "Email must not be empty"
        }
    },
    password: {
        isLength: {
            options: {
                min: 8
            },
            errorMessage: "Password must be at least 8 characters"
        },
        matches: {
            options: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
            errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        },
        notEmpty: {
            errorMessage: "Password must not be empty"
        }
    }
}