/**
 * @name DashToSpaceInChannelName
 * @author Niemiets
 * @description Changes dashes in channels name to spaces
 * @version 1.1.0
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/DashToSpaceInChannelName
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/DashToSpaceInChannelName/DashToSpaceInChannelName.plugin.js
 */

const {default: FormTitle, Tags: FormTitleTags} = BdApi.findModule(m => m.default.displayName === "FormTitle")
const {default: TextInput, TextInputSizes} = BdApi.findModule(m => m.default.displayName === "TextInput")
const {default: SwitchItem} = BdApi.findModule(m => m.default.displayName === "SwitchItem")
const {default: FormDivider} = BdApi.findModule(m => m.default.displayName === "FormDivider")
const {container: FormContainerClassName, dividerDefault: FormDividerClassName} = BdApi.findModuleByProps("container", "dividerDefault")
const ModalComponents = BdApi.findModule(m=>m["ModalRoot"]&&!m["default"])

module.exports = class DashToSpaceInChannelName{

    get regExp() {
        return new RegExp(...this.settings.regExp.match(/\/(.*)\/(.*)/).slice(1, 3))
    }
    
    get settings() {
        return BdApi.getData("DashToSpaceInChannelName", "settings")
    }
    set settings(object) {
        var { settings } = this
        settings[Object.keys(object)[0]] = Object.values(object)[0]
        BdApi.setData("DashToSpaceInChannelName", "settings", settings)
    }

    load() {
        if(!BdApi.getData("DashToSpaceInChannelName", "settings")){
            var patches = {regExp: "/-/g"}

            for(const patchName in this){
                if(patchName.match(/patch.+/)){
                    patches[patchName] = true
                }
            }
            BdApi.setData("DashToSpaceInChannelName", "settings", patches)
        }
    }

    start() {
        // Patch components
        this.patch()

        // Rerender components
        this.rerender()
    }

    stop() {
        // Unpatch all patches
        BdApi.Patcher.unpatchAll("DashToSpaceInChannelName")
        
        // Rerender components
        this.rerender()
    }

    getSettingsPanel() {
        var patches = []

        for(const patchName in this){
            if(patchName.match(/patch.+/)){
                patches.push(
                    BdApi.React.createElement("div", {
                        className: "DashToSpaceInChannelName-Patch-Container",
                        children: [
                            BdApi.React.createElement(Switch, {
                                children: patchName.match(/patch(.+)/)[1],
                                className: "DashToSpaceInChannelName-Patch-Switch",
                                id: patchName.match(/patch(.+)/)[1],
                                note: undefined,
                                onChange: (react, data)=>{
                                    this.settings = {[patchName]: data}
                                },
                                value: this.settings[patchName]
                            })
                        ]
                    })
                )
            }
        }

        // On settings modal close
        BdApi.Patcher.before("DashToSpaceInChannelName(SettingsPanel)", ModalComponents, "ModalRoot", (_, args)=>{
            if(args[0].transitionState === 2){
                // Unpatch all patches
                BdApi.Patcher.unpatchAll("DashToSpaceInChannelName")
                
                // Patch components
                this.patch()

                // Rerender components
                this.rerender()

                BdApi.Patcher.unpatchAll("DashToSpaceInChannelName(SettingsPanel)")
            }
        })

        return BdApi.React.createElement("div", {
            className: "DashToSpaceInChannelName-Settings-Container",
            children: [
                BdApi.React.createElement("div", {
                    className: FormContainerClassName + " DashToSpaceInChannelName-RegExp-Container",
                    children: [
                        BdApi.React.createElement(FormTitle, {
                            children: "RegExp",
                            id: "DashToSpaceInChannelName-RegExp-Title",
                            tag: FormTitleTags.H5
                        }),
                        BdApi.React.createElement(Input, {
                            autoFocus: false,
                            className: "DashToSpaceInChannelName-RegExp-Input",
                            disabled : false,
                            error: null,
                            maxLength: Infinity,
                            name: "",
                            onChange: (react, data)=>{
                                try {
                                    var pattern, flags
                                    try{
                                        [, pattern, flags] = data.match(/\/(.*)\/(.*)/)
                                    }catch(error){
                                        throw SyntaxError("Invalid regular expression: " + data)
                                    }
                                    const regExp = new RegExp(pattern, flags)
                                    react.props.error = null
                                    this.settings = {regExp: regExp.toString()}
                                }catch(error){
                                    react.props.error = error.toString().match(/.*/)
                                }
                            },
                            placeholder: "eg. /-/g",
                            size: TextInputSizes.DEFAULT,
                            type: "regexp",
                            value: this.settings.regExp
                        }),
                        BdApi.React.createElement(FormDivider, {
                            className: FormDividerClassName
                        })
                    ]
                }),
                patches
            ]
        })
    }

    patch = ()=>{
        Object.entries(this.settings).forEach(
            (setting)=>{
                if(setting[1] === true){
                    this[setting[0]]()
                }
            }
        )
    }

    patchChannelNames = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "ChannelItem"), "default", 
            (_, __, ret)=>{
                if(ret?.props?.children?.props?.children?.[1]?.props?.children?.[0]?.props?.children?.[1]?.props?.children?.[0]?.props?.children){
                    ret.props.children.props.children[1].props.children[0].props.children[1].props.children[0].props.children = ret.props.children.props.children[1].props.children[0].props.children[1].props.children[0].props.children.replace(this.regExp, " ")
                }
            }
        )
    }

    patchChannelTitle = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "HeaderBar"), "default", 
            (_, __, ret)=>{
                if(ret?.props?.children?.props?.children?.[0]?.props?.children?.[0]?.props?.children?.[1]?.props?.children){
                    ret.props.children.props.children[0].props.children[0].props.children[1].props.children = ret.props.children.props.children[0].props.children[0].props.children[1].props.children.replace(this.regExp, " ")
                }
            }
        )
    }

    patchChannelWelcome = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName === "TextChannelEmptyMessage"), "default", 
            (_, __, ret)=>{
                // Header
                if(ret?.props?.children?.[1]?.props?.children){
                    ret.props.children[1].props.children = ret.props.children[1].props.children.replace(this.regExp, " ")
                }
                // Description
                if(ret?.props?.children?.[2]?.props?.children?.[0]){
                    ret.props.children[2].props.children[0] = ret.props.children[2].props.children[0].replace(this.regExp, " ")
                }
            }
        )
    }
    
    patchChannelMention = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m?.default?.displayName==="Mention"), "default", 
            (_, __, ret)=>{
                if(ret.props.children[0]?.props["aria-label"] == "Channel"){
                    if(typeof ret.props.children[1] === "object"){
                        ret.props.children[1][0] = ret.props.children[1][0].replace(this.regExp, " ")
                    }else{
                        ret.props.children[1] = ret.props.children[1].replace(this.regExp, " ")
                    }
                }
            }
        )
    }

    patchChannelAutocomplete = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m.default.displayName === "Autocomplete").default.Channel.prototype, "renderContent", 
            (_, __, ret)=>{
                ret.props.children[1].props.children.props.children = ret.props.children[1].props.children.props.children.replace(this.regExp, " ")
            }
        )
    }

    patchSearchbar = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModuleByProps("SearchPopoutComponent").GroupData.FILTER_IN, "component", 
            (_, __, ret)=>{
                BdApi.Patcher.after("DashToSpaceInChannelName(Searchbar)", ret.props, "renderResult", 
                    (_, __, ret)=>{
                        BdApi.Patcher.unpatchAll("DashToSpaceInChannelName(Searchbar)")
                        ret.props.children[1].props.children = ret.props.children[1].props.children.replace(this.regExp, " ")
                    }
                )
            }
        )
    }

    patchQuickswitcher = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m.Channel.displayName === "Channel").Channel.prototype, "renderName", 
            (_, __, ret)=>{
                ret.props.children[0].props.children = ret.props.children[0].props.children.replace(this.regExp, " ")
            }
        )
    }

    patchServerTemplate = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModule(m=>m.default.toString().includes("acceptGuildTemplate")), "default", 
            (_, __, ret)=>{
                ret.preview.props.children[1].props.children[0].props.channels.forEach(
                    (item)=>{
                        if(item.type == 0 || item.type == 2){
                            item.name = item.name.replace(this.regExp, " ")
                        }
                    }
                )
                return ret
            }
        )
    }

    patchChannelsSettingsPanel = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModuleByDisplayName("SettingsView").prototype, "renderSidebar", 
            (_, __, ret)=>{
                var channelItem = ret?.props?.children?.[0]?.props?.children?.props?.children
                if(channelItem?.[1]&&channelItem?.[0]?.props?.className === BdApi.findModule(m=>m["channelIcon"]&&m["background"]).channelIcon){
                    ret.props.children[0].props.children.props.children = channelItem[1].replace(this.regExp, " ")
                }
            }
        )
    }

    patchSlateChannelTextArea = ()=>{
        BdApi.Patcher.after("DashToSpaceInChannelName", BdApi.findModuleByDisplayName("SlateChannelTextArea").prototype, "render", 
            (_, __, ret)=>{
                if(ret?.props?.children?.[1]?.props?.children?.[0]){
                    ret.props.children[1].props.children[0].props.children = ret.props.children[1].props.children[0].props.children.replace(this.regExp, " ")
                }
            }
        )
    }

    rerender = ()=>{
        // Rerender channel names
        this.rerenderChannelNames()

        // Rerender channel title
        this.rerenderChannelTitle()

        // Rerender slate channel text area
        this.rerenderSlateChannelTextArea()
    }

    rerenderChannelNames = ()=>{
        Object.keys(document.getElementsByClassName("containerDefault-YUSmu3")).forEach(
            (i)=>{
                BdApi.getInternalInstance(document.getElementsByClassName("containerDefault-YUSmu3")[i]).return.stateNode.forceUpdate()
            }
        )
    }

    rerenderChannelTitle = ()=>{
        BdApi.getInternalInstance(document.getElementsByClassName("chat-2ZfjoI")[0]??document)?.return?.stateNode?.forceUpdate()
    }

    rerenderSlateChannelTextArea = ()=>{
        BdApi.getInternalInstance(document.getElementsByClassName("slateTextArea-27tjG0")[0]??document)?.return?.stateNode?.forceUpdate()
    }
}

class Input extends BdApi.React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    render() {
        return BdApi.React.createElement(TextInput, {
            autoFocus: this.props.autoFocus,
            className: this.props.className,
            disabled: this.props.disabled,
            error: this.props.error,
            maxLength: this.props.maxLength,
            name: this.props.name,
            onChange: (data)=>{
                this.setState({value: data})
                this.props.onChange(this, data)
            },
            placeholder: this.props.placeholder,
            size: this.props.size,
            type: this.props.type,
            value: this.state.value
        })
    }
}

class Switch extends BdApi.React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    render() {
        return BdApi.React.createElement(SwitchItem, {
            children: this.props.children,
            className: this.props.className,
            id: this.props.id,
            note: this.props.note,
            onChange: (data)=>{
                this.setState({value: data})
                this.props.onChange(this, data)
            },
            value: this.state.value
        })
    }
}
