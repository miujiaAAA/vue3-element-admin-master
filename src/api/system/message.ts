import request from "@/utils/request";

const MESSAGE_BASE_URL = "/api/v1/message";
const MessageAPI = {
  /**
   * 查询消息通道
   */
  getChannelInfo(key: string) {
    return request({
      url: `${MESSAGE_BASE_URL}/${key}/getChannelInfo`,
      method: "GET",
      //params: { key }, // 将 key 作为查询参数
    });
  },
};
export default MessageAPI;
