const asyncRedis = require("async-redis");
const {v4: uuidv4 } = require('uuid');
const db = asyncRedis.createClient({
    host: '172.105.54.179', 
    port: 6379, 
    password:'gBbV7C#ORXH73^Yb'});
 
db.on("error", function(error) {
  console.error(error);
});
db.getItems = async(collectionName)=>{
  const result = (await db.get(collectionName)) || {};
  return JSON.parse(result);
}
db.getItemById = async (collectionName, id)=>{
  const result = await db.get(collectionName);
  if(result){
    return JSON.parse(result)[id];
  }else{
    return {};
  }
}
db.setItem = async(collectionName, data, id)=>{
  const collId = id || uuidv4();
  const collectionData = JSON.parse((await db.get(collectionName))||{});
  data['id'] = collId;
  collectionData[collId] = data;
  await db.set(collectionName, JSON.stringify(collectionData));
  return collectionData;
}
db.updateItem = async(collectionName, data)=>{
  const collectionData = JSON.parse((await db.get(collectionName))||{});
  collectionData[data.id] = data;
  await db.set(collectionName, JSON.stringify(collectionData));
  return collectionData;
}
db.deleteItem = async(collectionName, id)=>{
  let collectionData = JSON.parse(await db.get(collectionName)||{});
  delete collectionData[id];
  await db.set(collectionName, JSON.stringify(collectionData));
  return collectionData;
}
module.exports = db;