const toml = require('toml');
const fs = require('fs').promises;
const path=require('path');
const ast=require('ampelstatus');
const CONFIG=__dirname+"/conf.toml";

module.exports=main;

if(process.main!==module) {
  console.err(ast.err+' This script is to not be called directly.');
  process.exit(1);
}

async function main(conf) {
  data=new Object;
  conf.addDataExtention('toml', toml.parse);
  if(typeof pug != "undefined") conf.setPugOptions(pug);
  conf.addPlugin(require('eleventy-plugin-json-feed'), jsonfeed)
    //BEGIN EXTENSION-MAP
    try {
      data.ext=new Array;
      for await(j of fs.readdir('./img')) {
        let i=j.split('.');
        data.ext[i[0]]=i[1];
      }
    } catch {
      console.err(`${ast.err} 11ty-webcomic: Unable to create file extension map: ${e.message}`)
    }
    //END EXTENSION-MAP
  return data;
}
