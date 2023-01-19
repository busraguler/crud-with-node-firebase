const firebase = require("firebase-admin");
const serviceAccount = require("../../service-account-key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});
const db = firebase.firestore();

async function create(collection, comment) {
  const result = await db.collection(collection).add(comment);
  comment.id = result.id;
  return comment;
}

async function get(collection) {
  const result = await db.collection(collection).get();
  let list = [];
  result.forEach((doc) => {
    let data = doc.data();
    data.id = doc.id;
    list.push(data);
  });
  return list.length ? list : null;
}

async function getById(collection, id) {
  const result = await db.collection(collection).doc(id).get();
  if (!result.exists) return null;

  const doc = result.data();
  doc.id = result.id;
  return doc;
}

async function deleteById(collection, id) {
  const doc = db.collection(collection).doc(id);
  const result = await doc.get();
  if (!result.exists) return null;
  await doc.delete();
  return { id };
}

async function update(collection, id, document) {
  const doc = db.collection(collection).doc(id);
  const result = await doc.get();
  if (!result.exists) return null;
  await doc.set(document);
  document.id = id;
  return document;
}

module.exports = { create, get, getById, deleteById, update };
