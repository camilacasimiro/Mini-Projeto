const pool = require('../database/postegres');

/**Método que cadastra um usuáro */
const createdUser = (request, response) => {

    const { name, email } = request.body;

    pool.query('INSERT INTO Users (name, email) VALUES ($1, $2)', [name, email], (err, results) => {
        if (err) {
            if (err.detail) {
                response.status(400).send({ message: "Already Exists" });
                return
            }
            response.status(400).send(err);
        }
        response.status(201).send({
            message: "User added successfully!",
            body: {
                user: { name, email }
            },
        });
    });
}


/**Método que mostra todos os usuáro cadastrados */
const getUsers = (request, response) => {

    pool.query('SELECT * FROM Users', (err, results) => {
        console.log(results)
        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount== 0) {
            response.status(200).json({message: "There is no registered user"});

        } else {
            response.status(200).json(results.rows);
        }


    });
}


/**Método que mostra atualiza dados do usuáro cadastrado */
const updateUser = (request, response) => {

    const { name, email } = request.body;

    pool.query('UPDATE Users SET name = $1 WHERE email=$2', [name, email], (err, results) => {

        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount == 0) {
            response.status(400).send({ message: 'Email informed does not exist' });

        } else {
            response.status(200).send({ message: 'User updated successfully!' });
        }

    });
};


/**Método que remove usuáro cadastrado */
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM Users WHERE id = $1', [id], (err, results) => {
        if (err) {
            response.status(400).send(err);

        } else if (results.rowCount == 0) {
            response.status(400).send({ message: 'User informed does not exist' });

        } else {
            response.status(200).send({ message: 'User deleted!' });
        }

    });
}


module.exports = {
    createdUser,
    getUsers,
    updateUser,
    deleteUser
}