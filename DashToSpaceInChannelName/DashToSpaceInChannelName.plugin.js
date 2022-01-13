/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 1.0.1
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/DashToSpaceInChannelName
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */
Patcher = BdApi.Patcher
ReactDOM = BdApi.ReactDOM
const dashRegExp = new RegExp("-", "g")
module.exports = class DashToSpaceInChannelName{

    start() {
        // Channel names
        Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "ChannelItem"), "default", 
            (_, args, data)=>{
                if(data?.props?.children?.props?.children?.[1]?.props?.children?.[0]?.props?.children?.[1]?.props?.children?.[0]?.props?.children){
                    data.props.children.props.children[1].props.children[0].props.children[1].props.children[0].props.children = data.props.children.props.children[1].props.children[0].props.children[1].props.children[0].props.children.replace(dashRegExp, " ")
                }
            }
        )
        // Title
        Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "HeaderBar"), "default", 
            (_, args, data)=>{
                if(data?.props?.children?.props?.children?.[0]?.props?.children?.[0]?.props?.children?.[1]?.props?.children){
                    data.props.children.props.children[0].props.children[0].props.children[1].props.children = data.props.children.props.children[0].props.children[0].props.children[1].props.children.replace(dashRegExp, " ")
                }
            }
        )
        // Welcome to channel
        Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "TextChannelEmptyMessage"), "default", 
            (_, args, data)=>{
                if(data?.props?.children?.[2]?.props?.children?.[0]){
                    data.props.children[2].props.children[0] = data.props.children[2].props.children[0].replace(dashRegExp, " ")
                }
                if(data?.props?.children?.[1]?.props?.children){
                    data.props.children[1].props.children = data.props.children[1].props.children.replace(dashRegExp, " ")
                }
            }
        )
        this.reloadGuild()
    }

    stop() {
        Patcher.unpatchAll("DashToSpaceInChannelName")
        this.reloadGuild()
    }

    reloadGuild() {
        const currentGuildId = BdApi.findModuleByProps("getLastSelectedGuildId").getGuildId()
        const currentChannelId = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId()
        const transitionTo = BdApi.findModuleByProps("transitionTo").transitionTo
        //checks if ur not in dm
        if(currentGuildId){
            transitionTo(`/channels/@me`)
            setImmediate(()=>transitionTo(`/channels/${currentGuildId}/${currentChannelId}`))
        }
    }
}
