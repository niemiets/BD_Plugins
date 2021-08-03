/**
 * @name MessagePreviewer
 * @author Niemiets
 * @description Allows to preview messages before sending
 * @version 0.0.1
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/MessagePreviewer
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/MessagePreviewer/MessagePreviewer.plugin.js
 */
module.exports = class MessagePreviewer{
    start() {
        BdApi.Patcher.before("messagePreview", BdApi.findModuleByProps("changeDraft"), "changeDraft", (_, data)=>{
            this.deleteMessagePreview(data[0])
            this.createMessagePreview(data[0], data[1], undefined)
        })
    }

    stop() {
        BdApi.Patcher.unpatchAll("messagePreview")
    }

    createMessagePreview(channelId, content, author) {
        BdApi.findModuleByProps("sendMessage").receiveMessage(channelId, BdApi.findModuleByProps("createBotMessage").default(channelId, content, undefined, undefined, {messagePreview: true}, undefined, author))
    }

    deleteMessagePreview(channelId) {
        BdApi.findModuleByProps("getMessages").getMessages(channelId)._array.forEach((message, index, object)=>{
            if(message?.messageReference?.messagePreview) {
                object.splice(index, 1)
            }
        })
    }
}
