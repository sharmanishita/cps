import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://recommendation:RYxDZJWicf0VeglY@cluster0.b8papcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'recommendation-system';
const collectionName = 'Concepts';

async function getAllPrerequisites(mainConcept) {
  const client = new MongoClient(uri);
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);

  const visited = new Set();
  const result = new Set();

  async function dfs(concept) {
    //console.log(concept);
    if (visited.has(concept)) return;
    visited.add(concept);

    const node = await collection.findOne({ name: concept });
    //console.log(node);
    if (node?.prerequisites?.length) {
      for (const prereq of node.prerequisites) {
        const pre = await collection.findOne({ _id: prereq });
        if (pre && pre.name) {
          result.add(pre.name);
          await dfs(pre.name);
        }
      }
    }
  }

  await dfs(mainConcept);
  await client.close();
  console.log(result);
  const concepts = Array.from(result);
  return concepts;
}


export default getAllPrerequisites;
