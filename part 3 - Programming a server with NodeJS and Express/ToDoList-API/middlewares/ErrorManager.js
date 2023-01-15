/* This is a function that is exported to the app.js file. It is a function that is called when the
user tries to access a page that does not exist. */

exports.ErrorManager = (error, request,response) =>{
    console.error(error)

    if(error.name === 'CastError')
        response.status(400).send({error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    else{
        response.status(500).end()
    }

}