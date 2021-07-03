const client = require('../database/redis');

/**Método que acidiona chave e texto */
const createdDraft = (request, response) => {

    const id = request.params.id;
    const draft = request.body.draft;

    client.setex(id, 7200, draft, (err, resp) => {
        if (err) {
            response.status(400).send(err);
        } else {
            response.status(200).json([{ id: id, draft: draft }]);
        }
    }) 

}


/**Método que recupera chave e texto */
const getDraft = (request, response) => {

    const id = request.params.id;
    
    client.get(id, (err, reply) => {

        if (reply != null) {
            response.status(200).json({ id: id, draft: reply });

        } else {
            response.status(400).send({message: 'Draft not found'})
        }
    })
}

module.exports = {
    createdDraft,
    getDraft,
}