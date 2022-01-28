/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 1.0.3
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
        this.rerender()
    }

    stop() {
        Patcher.unpatchAll("DashToSpaceInChannelName")
        this.rerender()
    }

    rerender() {
        BdApi.getInternalInstance(document.getElementsByClassName("chat-2ZfjoI")[0]??document)?.return.stateNode.forceUpdate()
        Object.keys(document.getElementsByClassName("containerDefault-YUSmu3")).forEach(
            (i)=>{
                BdApi.getInternalInstance(document.getElementsByClassName("containerDefault-YUSmu3")[i]).return.stateNode.forceUpdate()
            }
        )
    }
}
