module.exports = (error, request,response) =>{
    console.error(error)

    if(error.name === 'CastError')
        response.status(400).send({error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    else{
        response.status(500).end()
    }

}