const session = require('../database/neo4j');

const addUser = async (request, response) => {

    const user = {
        name: request.body.name,
        email: request.body.email
    }

    await session.run('CREATE (p:People{name:$name, email:$email}) RETURN p', {
        name: user.name, email: user.email})
        .then(() => { response.status(201).send({
            message: "User added successfully!"})
        })
        .catch((err) => {
            response.status(400).send(err)
        })
        .then(()=> {
            session.close
        });
}


const followingUser = async (request, response) => {
        const user = {
            email1: request.body.email1,
            email2: request.body.email2
        }

        await session.run('MATCH (p1:People{email:$email1}) OPTIONAL MATCH (p2:People{email:$email2}) CREATE (p1)-[:FRIENDS]->(p2)',
        {email1: user.email1, email2: user.email2})
            .then(() => {response.status(200).send(
                { menssage:'Following' }
            )})
            .catch((err) => {
                response.status(400).send(err)
            })
            .then(()=> {
                session.close
            });
}


const followUser = async (request, response) => {

        const user = {
            email: request.body.email
        }

        await session.run('MATCH (p:People{email:$email})-[:FRIENDS]->(p2) RETURN p2', {
                email: user.email,
            }).then(result => {
                var userArr = [];
                result.records.forEach(function (record) {
                    userArr.push({
                        name: record._fields[0].properties.name,
                        email: record._fields[0].properties.email
                    })
                });
                if(userArr.length >0){
                    response.status(200).send(userArr);
                } else{
                    response.status(200).send({message:'Does not follow users'});
                }
                
            })
            .catch((err) => {
                response.status(400).send(err)
            })
            .then(()=> {
                session.close
            });
}


const recommendFollowers = async (request, response) => {

    const user = {
        email: request.body.email
    }


    await session.run('MATCH (p:People{email:$email})-[:FRIENDS]->()-[:FRIENDS]->(p2) WHERE p <> p2 RETURN p2',{
            email: user.email,
        }).then(result => {
            var userArr = [];
            result.records.forEach(function (record) {
                userArr.push({
                    name: record._fields[0].properties.name,
                    email: record._fields[0].properties.email
                })
            });
            if(userArr.length > 0){
                response.status(200).send(userArr);
            } else{
                response.status(200).send({message: 'No recommendations'})
            }
        })
        .catch((err) => {
            response.status(400).send(err)
        })
        .then(()=> {
            session.close
        });
}

module.exports ={
    addUser,
    followingUser,
    followUser,
    recommendFollowers
}
