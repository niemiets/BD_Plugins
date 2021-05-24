/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 0.0.3
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/DashToSpaceInChannelName
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */
module.exports = class DashToSpaceInChannelName{
    start() {
        dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
        dashToSpace(document.getElementsByClassName("title-29uC1r"))
    }
    stop() {
    }
    onSwitch() {
        dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
        dashToSpace(document.getElementsByClassName("title-29uC1r"))
    }
}

function dashToSpace(elements){
    for(var i = 0;i < elements.length;i++){
        elements[i].textContent = elements[i].textContent.replace(/-/g, " ")
    }
}
