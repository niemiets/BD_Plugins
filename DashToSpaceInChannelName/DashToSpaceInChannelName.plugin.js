/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 0.0.5
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/DashToSpaceInChannelName
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */
module.exports = class DashToSpaceInChannelName{
    start() {
        this.dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
        this.dashToSpace(document.getElementsByClassName("title-29uC1r"))
    }
    stop() {
        for(var i = 0;document.getElementsByClassName("channelName-2YrOjO").length > i;i++){
            BdApi.ReactDOM.render(BdApi.findModuleByProps("getChannel").getChannel(document.getElementsByClassName("mainContent-u_9PKf")[i].dataset.listItemId.slice(11,document.getElementsByClassName("mainContent-u_9PKf")[i].dataset.listItemId.length)).name, document.getElementsByClassName("channelName-2YrOjO")[i])
        }
        BdApi.ReactDOM.render(BdApi.findModuleByProps("getChannel").getChannel(BdApi.findModuleByProps("getChannelId").getChannelId()).name,document.getElementsByClassName("title-29uC1r")[0])
    }
    observer(changes){
        if(changes.addedNodes[0] != undefined && typeof changes.addedNodes[0].className == "string"){
            if(changes.addedNodes[0].className.includes("container-3w7J-x")){
                this.dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
            }else if(changes.addedNodes[0].className.includes("title-3qD0b-")){
                this.dashToSpace(document.getElementsByClassName("title-29uC1r"))
            }
        }
    }
    dashToSpace(elements){
        for(var i = 0;i < elements.length;i++){
            BdApi.ReactDOM.render(elements[i].textContent.replace(/-/g, " "), elements[i])
        }
    }
}
