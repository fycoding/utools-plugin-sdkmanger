const regedit = require('regedit').promisified;

const envKey = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment";

const env = {
    /**
     * 设置环境变量，没有则创建
     * @param {*} key 
     * @param {*} value 
     */
    async setx(key, value) {
        if (key == 'Path') return false;
        await regedit.putValue({
            [envKey]: {
                [key]: {
                    value: value,
                    type: 'REG_SZ'
                }
            }
        });
        return true;
    },
    /**
     * 删除环境变量
     * @param {*} key 
     */
    async delete(key) {
        if (key == 'Path') return false;
        let value = await this.get(key);
        if (value === false) return false;
        await regedit.deleteValue(`${envKey}\\${key}`);
        return true;
    },
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
    },
    async addPath(value) {
        const paths = await this.getPaths();
        if (paths.includes(value)) return true;
        paths.push(value);
        await this.setPaths(paths);
        return true;

    },
    async removePath(value) {
        let paths = await this.getPaths();
        if (!paths.includes(value)) return true;
        paths = paths.filter(item => item != value);
        await this.setPaths(paths);
        return true;
    },
    /**
     * @returns {array}
     */
    async getPaths() {
        let { _, value : paths } = await this.get("Path");
        const lastChar = paths.charAt(paths.length - 1);
        if (lastChar == ";") {
            paths = paths.slice(0, -1);
        }
        return paths.split(';');
    },
    /**
     * 
     * @param {array} paths 
     */
    async setPaths(paths) {
        let value = paths.join(";");
        await regedit.putValue({
            [envKey]: {
                "Path": {
                    value: value + ";",
                    type: 'REG_EXPAND_SZ'
                }
            }
        });
        return true;
    }
}

module.exports = env;