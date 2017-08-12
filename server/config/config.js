const api_data = [
    /* 国服API */
    '/UserArea', '/UserHotInfo', '/Free', '/ChampionRank', '/GetChampionDetail', 
    /* 国服高级API */
    '/UserExtInfo', '/BattleSummaryInfo', '/CombatList', '/GameDetail',
    /* 国服API字典数据 */
    '/Champion', '/Area', '/GetTierQueue',
    /* 国服API辅助接口 */
    '/GetUserIcon', '/GetAreaName', '/GetChampionSkin', '/GetChampionIcon', '/GetSummonSpellIcon', '/GetItemIcon', '/GetChampionCNName', '/GetChampionENName', '/GetMapName', '/GetMapImage', '/GetJudgement', '/GetWin', '/GetGameType'
];

const api_video = [
    '/GetAuthors', '/GetAuthorVideos', '/GetNewstVideos', '/GetHeroVideos', '/FindVideos'
];

const config = {
    /* 带玩的API地址 */
    gameCubedataHost: 'lolapi.games-cube.com',
    gameCubevideoHost: 'infoapi.games-cube.com',
    /* 带玩API TOKEN */
    dataToken: 'AFF64-826A6-2A788-838CB',
    videoToken: '81945-A67C4-90496-1E976',
    /* https秘钥和证书 */
    httpsKeyFile: './cert/chyingp-key.pem',
    httpsCertFile:'./cert/chyingp-cert.pem',
    apiDataList: api_data,
    apiVideoList: api_video
};

export default config;