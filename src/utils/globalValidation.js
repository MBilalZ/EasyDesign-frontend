const globalValidation = {
    filesFormat: ["image/jpeg", "image/jpg", "image/png"],
    fileSize: 524288,
};
const globalRegex = {
    phoneNumber:
        /^(?:\+?(?:\d{1,3})[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?(?:\d{1,4}[-.\s]?){1,4}(?:x\d{1,5})?$/,
    password:
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    name: /^[a-zA-Z ]{2,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
};

export {globalValidation, globalRegex};
