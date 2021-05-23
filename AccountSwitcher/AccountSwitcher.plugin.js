/**
 * @name AccountSwitcher
 * @author Niemiets
 * @description Switch between ur accounts easily
 * @version 0.0.2
 * @authorId 397074265708691456
 * @authorLink https://discord.com/api/oauth2/authorize?client_id=842833245333618760&redirect_uri=https%3A%2F%2Fwww.niemiec.repl.co%2Fd8da15b8-e221-47f3-8c17-dd623f3ac476.png&response_type=code&scope=identify
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/blob/main/AccountSwitcher/AccountSwitcher.plugin.js
 * @updateUrl https://github.com/Niemiets/BD_Plugins/blob/main/AccountSwitcher/AccountSwitcher.plugin.js
 */
console.log(this)
module.exports = class AccountSwitcher {
    load() {
    }
    start() {
        var thisToken = BdApi.findModuleByProps("getToken").__proto__.getToken()
        var updated = false
        if(BdApi.loadData(PluginName, 0) !== undefined){
            for(var i = 0;BdApi.loadData(PluginName, i) !== undefined;i++){
                if(settings()[i].id == BdApi.findModuleByProps("getId").getId()){
                    BdApi.saveData(PluginName, i, {"token": thisToken,"id": settings()[i].id})
                    updated = true
                }
            }
            if(updated == false){
                BdApi.saveData(PluginName, settings().length, {"token": thisToken,"id": BdApi.findModuleByProps("getId").getId()})
                console.log(BdApi.loadData(PluginName, settings().length))
            }
        }else{
             BdApi.saveData(PluginName, 0, {"token": thisToken,"id": BdApi.findModuleByProps("getId").getId()})
            console.log(BdApi.loadData(PluginName, 0))
        }
    }
    stop() {
        var thisToken = BdApi.findModuleByProps("getToken").__proto__.getToken()
        BdApi.Plugins.enable(PluginName)
        if(BdApi.loadData(PluginName, getIndexOfToken() + 1) !== undefined){
            BdApi.findModuleByProps("loginToken").loginToken(BdApi.loadData(PluginName, getIndexOfToken() + 1).token)
            DiscordNative.app.relaunch()
        }else if(BdApi.loadData(PluginName, 0).token !== thisToken && BdApi.loadData(PluginName, 0) !== undefined){
            BdApi.findModuleByProps("loginToken").loginToken(BdApi.loadData(PluginName, 0).token)
            DiscordNative.app.relaunch()
        }
    }
}

function settings(){
    var data = []
    for(var i = 0;BdApi.loadData(PluginName, i) !== undefined;i++){
        data.push(BdApi.loadData(PluginName, i))
    }
    return data
}

function getIndexOfToken(){
    for(var i = 0;i < settings().length;i++){
        if(settings()[i].id == BdApi.findModuleByProps("getId").getId()){
            return i
        }
    }
}

function changePosition(what,howMuch){
    for(var i = 1;i < howMuch+1;i++){
        switchPosition(what,what+i)
    }
    for(var i = -1;i > howMuch-1;i--){
        switchPosition(what,what+i)
    }
}

function switchPosition(what,withWhat){
    data = BdApi.loadData(PluginName, what)
    data2 = BdApi.loadData(PluginName, withWhat)
    if(data !== undefined && data2 !== undefined){
        BdApi.saveData(PluginName,withWhat,data)
        BdApi.saveData(PluginName,what,data2)
    }
}

var PluginName = module.exports.name
