/**
 * @name AccountSwitcher
 * @author Niemiets
 * @description Switch between ur accounts easily
 * @version 0.0.3
 * @authorId 397074265708691456
 * @authorLink https://github.com/Niemiets
 * @website https://github.com/Niemiets/BD_Plugins
 * @source https://github.com/Niemiets/BD_Plugins/tree/main/AccountSwitcher
 * @updateUrl https://raw.githubusercontent.com/Niemiets/BD_Plugins/main/AccountSwitcher/AccountSwitcher.plugin.js
 */
module.exports = class AccountSwitcher {
    start() {
        var thisToken = BdApi.findModuleByProps("getToken").__proto__.getToken()
        var updated = false
        if(BdApi.loadData(PluginName, 0) !== undefined){
            updateToken()
            updated = true
        }
        if(updated == false){
            addToken(thisToken)
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
    for(var i = 0; BdApi.loadData(PluginName, i) !== undefined; i++){
        data.push(BdApi.loadData(PluginName, i))
    }
    return data
}

function updateToken(){
    for(var i = 0; BdApi.loadData(PluginName, i) !== undefined; i++){
        if(settings()[i].id == BdApi.findModuleByProps("getId").getId()){
            BdApi.saveData(PluginName, i, {"token": thisToken, "id": settings()[i].id})
        }
    }
}

function addToken(token){
    BdApi.saveData(PluginName, settings().length, {"token": token, "id": BdApi.findModuleByProps("getId").getId()})
}

function getIndexOfToken(){
    for(var i = 0; i < settings().length; i++){
        if(settings()[i].id == BdApi.findModuleByProps("getId").getId()){
            return i
        }
    }
}

function changePosition(what,howMuch){
    for(var i = 1; i < howMuch + 1; i++){
        switchPosition(what, what + i)
    }
    for(var i = -1; i > howMuch - 1; i--){
        switchPosition(what, what + i)
    }
}

function switchPosition(what, withWhat){
    dataWhat = BdApi.loadData(PluginName, what)
    dataWithWhat = BdApi.loadData(PluginName, withWhat)
    if(data !== undefined && data2 !== undefined){
        BdApi.saveData(PluginName, withWhat, dataWhat)
        BdApi.saveData(PluginName, what, dataWithWhat)
    }
}

var PluginName = module.exports.name
