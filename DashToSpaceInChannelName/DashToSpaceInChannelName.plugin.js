/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channel names to spaces
 * @version 0.0.4
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/DashToSpaceInChannelName
 * @updateUrl https://niemiets.github.io/BD_Plugins/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */
module.exports = class DashToSpaceInChannelName{
    start() {
        this.dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
        this.dashToSpace(document.getElementsByClassName("title-29uC1r"))
    }
    stop() {
    }
    onSwitch() {
        this.dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
        this.dashToSpace(document.getElementsByClassName("title-29uC1r"))
    }
    dashToSpace(elements){
        for(var i = 0;i < elements.length;i++){
            elements[i].textContent = elements[i].textContent.replace(/-/g, " ")
        }
    }
}
