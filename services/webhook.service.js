/**
 * Webhook Service
 * 处理抖音等平台的 Webhook 业务逻辑
 */

/* eslint-disable no-console */

// 处理抖音 verify_webhook 事件（签名验证）
async function handleVerifyWebhook(payload) {
    const {challenge} = payload || {};
    console.log('[WebhookService] handleVerifyWebhook challenge:', challenge);
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

    // TODO: 根据事件类型分发处理
    return {};
}

module.exports = {
    handleDouyin,
};
