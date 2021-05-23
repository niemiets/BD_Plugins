/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 0.0.2
 * @authorId 397074265708691456
 * @authorLink https://discord.com/api/oauth2/authorize?client_id=842833245333618760&redirect_uri=https%3A%2F%2Fwww.niemiec.repl.co%2Fd8da15b8-e221-47f3-8c17-dd623f3ac476.png&response_type=code&scope=identify
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/blob/main/DashToSpaceInChannelName
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */
module.exports = class DashToSpaceInChannelName{
    start() {
        dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
    }
    stop() {
    }
    onSwitch() {
        dashToSpace(document.getElementsByClassName("channelName-2YrOjO"))
    }
}

function dashToSpace(elements){
    for(var i = 0;i < elements.length;i++){
        elements[i].textContent = elements[i].textContent.replace(/-/g, " ")
    }
}
