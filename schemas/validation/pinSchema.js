export const pinValidationSchema = {
    pin: {
        isLength: {
            options: {
                min: 4,
                max: 4
            },
            errorMessage: "Your pin must be 4 digits long",
        },
        notEmpty: {
            errorMessage: "Pin must not be empty"
        },
        isString: {
            errorMessage: "Pin must be letters of the alphabet"
        }
    }
}