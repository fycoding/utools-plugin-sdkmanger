const regedit = require('regedit').promisified;

const envKey = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment";

const env = {
    /**
     * 设置环境变量，没有则创建
     * @param {*} key 
     * @param {*} value 
     */
    async setx(key, value) {
        console.log(key, value);
        await regedit.putValue({
            "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
                value: 'Moo corp',
                type: 'REG_SZ'
            }
        });
    },
    /**
     * 删除环境变量
     * @param {*} key 
     */
    delete(key) { },
    /**
     * 获取
     * @param {*} key 
     */
    async get(key) {
        const userEnv = await regedit.list(envKey);
        const values = userEnv[envKey];
        if (values.exists) {
            return values.values[key] || false;
        }
        return false;
    }
}

function getWholekey(key) {
    return `${envKey}\\${key}`;
}

module.exports = env;


// env.get('NVM_SYMLINK').then(res => {
//     console.log(res);
// })

env.setx("HHH", 123);