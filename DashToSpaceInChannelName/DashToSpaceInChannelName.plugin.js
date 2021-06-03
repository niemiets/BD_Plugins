/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 0.0.4
 * @authorId 391014265108691456
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
    stop() {}
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
