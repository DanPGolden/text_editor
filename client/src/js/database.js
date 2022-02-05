import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      console.log('db line 6 database.js', db)
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // console.error('putDb not implemented');
  
  console.log('content line 21 database.js',content);
  try {

      const jateDb = await openDB('jate', 1);
      const tx = jateDb.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const request = store.put({ content: content, id: 1 })

      // Get confirmation of the request.
      const result = await request;
      console.log('Saved to the database', result);

  } catch {
      console.log('Error database.js line34',err)
      console.error('put to the database failed')
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // console.error('getDb not implemented');

  try {
    
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    
    console.log('GET from the database line 51 database.js', request);
  // Get confirmation of the request.
  const result = await request;
  console.log('result line 54 database.js', result);

  return result[0].content;
} catch {
  console.log(err)
  console.error('get from DB failed')
}}

initdb()