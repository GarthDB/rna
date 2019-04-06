// import initdb from './initdb.mjs'
import PouchDB from 'pouchdb-node'
import PouchDBAdapterNodeWebsql from 'pouchdb-adapter-node-websql'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
PouchDB.plugin(PouchDBAdapterNodeWebsql)

const db = new PouchDB('_dna', {
  adapter: 'websql',
})

export default function build() {
  glob('./data/**/*.json', (er, files) => {
    files.forEach(file => {
      const type = file
        .split(path.sep)
        .slice(2, -1)
        .join(path.sep)
      const id = `${type}/${path.parse(file).name}`
      const fileContent = JSON.parse(fs.readFileSync(file, 'utf8'))
      const document = {
        _id: id,
        type,
        data: fileContent,
      }
      db.put(document, (err, result) => {
        if (!err) {
          console.log('Successfully posted a document!')
        } else {
          console.log(err)
        }
      })
    })
  })
}

build()
