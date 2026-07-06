/**
 * Webhook Service
 * 处理抖音等平台的 Webhook 业务逻辑
 */

/* eslint-disable no-console */

const axios = require('axios');

const FORWARD_URL = 'https://yingxiao.baidu.com/webhook/plateform/dy';

// 将 payload 转发至营销平台
async function forwardToYingxiao(payload) {
    try {
        const response = await axios.post(FORWARD_URL, payload, {
            headers: {'Content-Type': 'application/json'},
            timeout: 5000,
        });
        console.log('[WebhookService] forwardToYingxiao success, status:', response.status);
        console.log('[WebhookService] forwardToYingxiao response:', response.data);
        return response.data;
    }
    catch (err) {
        console.error('[WebhookService] forwardToYingxiao error:', err.message);
        throw err;
    }
}

// 处理抖音 verify_webhook 事件（签名验证）
async function handleVerifyWebhook(payload) {
    const {challenge} = payload || {};
    console.log('[WebhookService] handleVerifyWebhook challenge:', challenge);

    // 转发至营销平台
    forwardToYingxiao(payload);
    return {challenge};
}

// 处理抖音 Webhook 回调
async function handleDouyin(payload) {
    // eslint-disable-next-line camelcase
    const {event, client_key, content} = payload || {};
    console.log('[WebhookService] handleDouyin event:', event, 'client_key:', client_key, 'content:', content);

    if (event === 'verify_webhook') {
        return handleVerifyWebhook(content);
    }

    return {};
}

module.exports = {
    handleDouyin,
};
