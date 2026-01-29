const fs = require('node:fs')
const path = require('node:path')
const https = require('node:https');
const compressing = require('compressing');
const env = require('./env')

const sdkConfigId = "fycoding/sdkconfig";

// 通过 window 对象向渲染进程注入 nodejs 能力
window.services = {
  path: {
    sep: path.sep,
    existsSync: fs.existsSync,
    createLink: (target, linkPath) => {
      if(fs.existsSync(linkPath)) {
        fs.unlinkSync(linkPath);
      }
      fs.symlinkSync(target, linkPath, 'junction');
    },
    mkdir: fs.mkdirSync
  },
  env: env,
  // 获取配置
  getConfig(){
      let config = window.utools.db.get(sdkConfigId);
      if(!config) {
        config = {
          _id: sdkConfigId,
          sdkPath: ''
        }
      }
      return config;
  },
  // 下载文件
  async download(url, saveTo, callback = (msg) => { }) {
    if (fs.existsSync(saveTo)) {
      callback('文件存在，跳过下载');
      return;
    }
    const file = fs.createWriteStream(saveTo);
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const total = parseInt(res.headers['content-length'], 10);
        let received = 0;

        res.on('data', chunk => {
          received += chunk.length;
          const percent = total ? Math.round((received / total) * 100) : 0;
          callback(`下载中... ${percent}%`);
        });
        res.pipe(file);
        file.on('finish', () => {
          callback('下载完成');
          resolve();
        });
        file.on('error', reject);
      }).on('error', reject);
    });
  },
  // 解压当前文件夹
  async uncompress(fileName) {
    const parsed = path.parse(fileName);
    const withoutExtension = path.join(parsed.dir, parsed.name);
    let uncompressHandler = null;
    switch (parsed.ext) {
      case ".zip":
        uncompressHandler = compressing.zip;
        break;
      case ".gzip":
        uncompressHandler = compressing.gzip;
        break;
      case ".tar":
        uncompressHandler = compressing.tar;
        break;
      case ".tgz":
        uncompressHandler = compressing.tgz;
        break;
      default:
        throw new Error("无法解压该格式的文件");
    }
    await uncompressHandler.uncompress(fileName, withoutExtension)
    await flattenSingleSubfolder(withoutExtension);
  },
  openDirectoryDialog() {
    let dirs =  window.utools.showOpenDialog({
      properties: ['openDirectory']
    });
    return dirs[0] || false;
  },
}

async function flattenSingleSubfolder(folderPath) {
  try {
    const items = fs.readdirSync(folderPath);
    if (items.length !== 1) {
      return;
    }
    const singleItem = items[0];
    const singleItemPath = path.join(folderPath, singleItem);
    if (fs.statSync(singleItemPath).isDirectory()) {
      const subItems = fs.readdirSync(singleItemPath);

      subItems.forEach(item => {
        const source = path.join(singleItemPath, item);
        const target = path.join(folderPath, item);
        fs.renameSync(source, target);
      });
      fs.rmdirSync(singleItemPath);
    }
  } catch (error) {
    throw error;
  }
}
