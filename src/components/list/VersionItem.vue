<template>
    <div class="version-item">
        <!-- 序号 -->
        <div class="item index">{{ index }}</div>
        <!-- 版本号 -->
        <div class="item version">
            {{ version }}
            <span class="curr" v-if="currentVersion == version">当前版本</span>
        </div>
        <!-- 下载地址 -->
        <div class="item download-url">
            <span v-if="downloadUrl">{{ downloadUrl }}</span>
            <span v-else>无下载地址</span>
        </div>
        <!-- 操作按钮 -->
        <div class="item actions">
            <button @click="handleDownload" class="btn download">下载</button>
            <button @click="handleSwitch" class="btn switch">切换</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    currentVersion: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    downloadUrl: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['download', 'switch'])

const handleDownload = () => {
    emit('download', props)
}

const handleSwitch = () => {
    emit('switch', props)
}
</script>

<style lang="scss" scoped>
.version-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e4e7ed;
    background-color: #fff;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f5f7fa;
    }

    .item {
        padding: 0 12px;
        min-height: 24px;
        display: flex;
        align-items: center;

        &.index {
            width: 60px;
            font-weight: 600;
            color: #606266;
        }

        &.version {
            width: 120px;
            font-weight: 500;
            color: #409eff;

            .curr {
                display: inline-block;
                color: white;
                background-color: #6e1c42;
                padding: 2px 6px;
                border-radius: 4px;
                margin-left: 8px;
            }

        }

        &.download-url {
            flex: 1;
            min-width: 0;

            a {
                color: #409eff;
                text-decoration: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:hover {
                    text-decoration: underline;
                    color: #66b1ff;
                }
            }

            span {
                color: #909399;
                font-style: italic;
            }
        }

        &.actions {
            width: 160px;
            display: flex;
            gap: 8px;
        }
    }
}

.btn {
    padding: 6px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        color: #409eff;
    }

    &.download {
        border-color: #409eff;
        background-color: #409eff;
        color: #fff;

        &:hover {
            border-color: #66b1ff;
            background-color: #66b1ff;
        }
    }

    &.switch {
        border-color: #67c23a;
        background-color: #67c23a;
        color: #fff;

        &:hover {
            border-color: #85ce61;
            background-color: #85ce61;
        }
    }
}
</style>