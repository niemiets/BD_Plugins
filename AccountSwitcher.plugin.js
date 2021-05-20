/**
 * @name AccountSwitcher
 * @author Niemiets
 * @description Switch ur account easily
 * @version 0.0.1
 * @authorId 51512151151651
 * @authorLink https://discord.com/api/oauth2/authorize?client_id=842833245333618760&redirect_uri=https%3A%2F%2Fwww.niemiec.repl.co%2Fd8da15b8-e221-47f3-8c17-dd623f3ac476.png&response_type=code&scope=identify
 * @website https://github.com/rauenzi/BetterDiscordApp
 * @source https://gist.github.com/rauenzi/e5f4d02fc3085a53872b0236cd6f8225
 */
module.exports = class AccountSwitcher {
    load() {
    }
    start() {
        var updated = false
        if(BdApi.loadData(PluginName, 0) !== undefined){
            for(var i = 0;BdApi.loadData(PluginName, i) !== undefined;i++){
                if(settings()[i].id == BdApi.findModuleByProps("getId").getId()){
                    BdApi.saveData(PluginName, i, {"token": thisToken,"id": settings()[i].id})
                    updated = true
                    console.log("updated")
                }
            }
            if(updated == false){
                BdApi.saveData(PluginName, settings().length, {"token": thisToken,"id": BdApi.findModuleByProps("getId").getId()})
            }
        }else{
             BdApi.saveData(PluginName, 0, {"token": thisToken,"id": BdApi.findModuleByProps("getId").getId()})
        }
    }
    stop() {
        BdApi.Plugins.enable(PluginName)
        if(BdApi.loadData(PluginName, getIndexOfToken() + 1) !== undefined){
            console.log(BdApi.loadData(PluginName, getIndexOfToken() + 1).token)
            BdApi.findModuleByProps("loginToken").loginToken(BdApi.loadData(PluginName, getIndexOfToken() + 1).token)
            DiscordNative.app.relaunch()
        }else if(BdApi.loadData(PluginName, 0).token !== thisToken && BdApi.loadData(PluginName, 0) !== undefined){
            console.log(BdApi.loadData(PluginName, 0).token)
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

var thisToken = BdApi.findModuleByProps("getToken").__proto__.getToken()
var PluginName = module.exports.name
