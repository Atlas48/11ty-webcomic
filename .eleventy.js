const toml = require('toml');
const fs = require('fs').promises;
const path=require('path');
const CONFIG=__dirname+"/conf.toml";

include = {
  inc: x => x+1,
  dec: x => x-1
}
module.exports=main;

if(process.main!==module) {
  console.err('This script is to not be called directly.');
  process.exit(1);
}

async function main(conf) {
  conf.addDataExtention('toml', toml.parse);
  //BEGIN CONFIG-PARSE
  try {
    var data=toml.parse(fs.readFile(CONFIG, 'utf-8'));
  } catch(e) {
    console.err(`11ty-webcomic: Unable to load config: ${e.message}`);
    if(typeof data == 'undefined') var data=new Object;
  }
  //END CONFIG-PARSE
  //BEGIN EXTENSION-MAP
  try {
    data.ext=new Array;
    for(j in await fs.readdir('./img')) {
      let i=j.split('.');
      data.ext[i[0]]=i[1];
    }
  } catch {
    console.err(`11ty-webcomic: Unable to create file extension map: ${e.message}`)
  }
  //END EXTENSION-MAP
  if(typeof data.pug == 'object') conf.setPugOptions(data.pug);
  return data;
}
