
const {MongoClient,  ServerApiVersion} = require('mongodb')
const uri = 'mongodb+srv://dddtydrmwn:Didatama123.@cluster0.p2kh6c1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri, {
    ServerApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true

    }
})

export const db = client.db('Steel_Series')

export const getCollection = (collectionName: string) => {
    return db.collection(collectionName)
}