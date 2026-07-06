/**
 * Webhook 控制器
 * 处理抖音等平台的 Webhook 回调
 */

const {webhookService} = require('../services');

// 处理抖音 Webhook 回调
async function handleDouyinWebhook(req, res) {
    try {
        const payload = Object.assign({}, req.query, req.body);
        const result = await webhookService.handleDouyin(payload);
        return res.json({...result});
    } catch (error) {
        console.error('Webhook 处理失败:', error.message || error);
        return res.status(500).json({code: 5000, msg: 'webhook 处理失败'});
    }
}

module.exports = {
    handleDouyinWebhook,
};
