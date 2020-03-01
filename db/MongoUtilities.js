const MongoClient = require("mongodb").MongoClient;

function MongoUtils(){

    const il = {},
        rl = {},
        hostname = "localhost",
        port = 27017, 
        dbName = "CrispyCocktails", 
        colNameIngredients = "ingredientlist",
        colNameRecipes = "recipelist";
        

    il.connect = () => {
        client = new MongoClient(`mongodb://${hostname}:${port}`, {useUnifiedTopology: true});
        return client.connect();
    }

    // rl.connect = () => {
    //     client = new MongoClient('mongodb://${hostname}:${port}');
    //     return client.connect();
    // }
    
    il.find = query => il.connect().then(client => 
    {
        const ingredientsCol = client.db(dbName).collection(colNameIngredients);
        return ingredientsCol
            .find(query)
            .sort({IngredientName: +1})
            .toArray()
            .finally(() => client.close());
    });

    il.insert = ingredient => il.connect().then(client => 
        {
            const ingredientsCol = client.db(dbName).collection(colNameIngredients);
            return ingredientsCol
                .insertOne(ingredient)
                .finally(() => client.close());
        });

   

    il.search = query => il.connect().then(client =>
        {
            const ingredientsCol = client.db(dbName).collection(colNameIngredients);
            return  ingredientsCol.find({IngredientName: query}).toArray();
        
        });

    return il;
}

module.exports = MongoUtils();