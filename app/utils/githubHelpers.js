var axios = require('axios'),
    id = 'YOUR_CLIENT_ID',
    sec = 'YOUR_SECRET_KEY',
    param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos'
        + param + '&per_page=100');
}

function getTotalStars(repos) {
    return repos.data.reduce(function(prev, curr) {
        return prev + curr.stargazers_count
    }, 0);
}

function getPlayersData(player) {
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function(totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            };
        });
}

function calculateScores(players) {
    return [
        players[0].followers * 3 + players[0].totalStars + 1,
        players[1].followers * 3 + players[1].totalStars + 1
    ];
}

var helpers = {
    getPlayersInfo: function(players) {
        return axios.all(players.map(function(username) {
            return getUserInfo(username);
        })).then(function(info) {
            return info.map(function(user) {
                return user.data;
            });
        }).catch(function(err) {
            console.warn('Error in getPlayersInfo', err);
        });
    },
    battle: function(players) {
        var playerOneData = getPlayersData(players[0]),
            playerTwoData = getPlayersData(players[1]);
            
        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function(err) {
                console.warn('Error in getPlayersInfo: ', err);
            });
    }
};

module.exports = helpers;