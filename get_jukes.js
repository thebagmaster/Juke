conn = new Mongo();
db = conn.getDB("jukes");
printjson(db.getCollectionNames());
