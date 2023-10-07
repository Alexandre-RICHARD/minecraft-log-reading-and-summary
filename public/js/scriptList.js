const app = {
  base_URL: 'http://localhost:3000',

  init: () => {
    app.resetData().then((listData) => {
      const gametag = [
        '',
        'Arcabat',
        'Baptiste',
        'Caelis5129',
        'Cora',
        'Cha_Rospo',
        'Charline',
        'Cheliness',
        'Manon',
        'Helios_49',
        'Hélios',
        'Shadowmere_Swift',
        'Alex',
      ];

      const logData = [];
      let count = 1;
      const playerData = {};

      for (let i = 1; i < gametag.length / 2; i++) {
        playerData[`${gametag[i*2]}`] = {
          playTime: 0,
          connectCntr: 0,
          startTime: null,
          lastConnection: null,
        };
      }

      listData.forEach((element) => {
        if (element.includes(' joined the game') ||
          element.includes(' left the game')) {
          const oneLog = {
            // eslint-disable-next-line max-len
            player: gametag[gametag.indexOf(element.slice(46, element.slice(46).search(' ') + 46)) + 1],
            day: element.slice(8, 10),
            month: element.slice(5, 7),
            year: element.slice(0, 4),
            hour: element.slice(14, 16),
            minute: element.slice(17, 19),
            seconds: element.slice(20, 22),
            action: element[element.slice(46).search(' ') + 47] ==
              'j' ? 'rejoint' : 'quitté',
          };
          // eslint-disable-next-line max-len
          oneLog.date = new Date(oneLog.year, oneLog.month, oneLog.day, oneLog.hour, oneLog.minute, oneLog.seconds),
          // eslint-disable-next-line max-len
          logData.push(`${count} - [${oneLog.day}/${oneLog.month}/${oneLog.year} - ${oneLog.hour}:${oneLog.minute}:${oneLog.seconds}] : ${oneLog.player} a ${oneLog.action} le serveur.`);
          count += 1;
          if (oneLog.action === 'rejoint') {
            playerData[`${oneLog.player}`] = {
              playTime: playerData[`${oneLog.player}`].playTime,
              connectCntr: playerData[`${oneLog.player}`].connectCntr + 1,
              startTime: oneLog.date,
              lastConnection: `[${oneLog.day}/${oneLog.month}/${oneLog.year} - ${oneLog.hour}:${oneLog.minute}:${oneLog.seconds}]`,
            };
          }
          if (oneLog.action === 'quitté') {
            playerData[`${oneLog.player}`] = {
              // eslint-disable-next-line max-len
              playTime: playerData[`${oneLog.player}`].playTime + ((oneLog.date - playerData[`${oneLog.player}`].startTime) / 3600000),
              connectCntr: playerData[`${oneLog.player}`].connectCntr,
              startTime: null,
              lastConnection: `${oneLog.day}/${oneLog.month}/${oneLog.year} à ${oneLog.hour}:${oneLog.minute}:${oneLog.seconds}`,
            };
          }
        }
      });
      logData.forEach((element) => {
        const p = document.createElement('p');
        p.classList.add('listPart');
        p.textContent = element;
        document.querySelector('.log-list').appendChild(p);
      });

      // eslint-disable-next-line guard-for-in
      for (const ele in playerData) {
        const pLeft = document.createElement('p');
        pLeft.classList.add('result');
        const pMiddle = document.createElement('p');
        pMiddle.classList.add('result');
        const pRight = document.createElement('p');
        pRight.classList.add('result');
        // eslint-disable-next-line max-len
        pLeft.textContent = `${ele} :`;
        pMiddle.textContent = `${playerData[ele].connectCntr} connexions - ${Math.trunc(playerData[ele].playTime)}h ${Math.round((playerData[ele].playTime - Math.trunc(playerData[ele].playTime))*60)}m de jeu`;
        pRight.textContent = `Dernière connexion le ${playerData[ele].lastConnection}`
        document.querySelector('.resultsLeft').appendChild(pLeft);
        document.querySelector('.resultsMiddle').appendChild(pMiddle);
        document.querySelector('.resultsRight').appendChild(pRight);
      };
    });
  },

  async resetData() {
    try {
      const data = await fetch(app.base_URL + '/init');
      const listData = await data.json();
      return listData;
    } catch (error) {
      console.trace(error);
    }
  },

  //!
  // getDataByFTP() {
  //   app.requestFTP().then((data) => {
  //     console.log(data);
  //   });
  // },

  // async requestFTP() {
  //   try {
  //     const FTPdata = await fetch(app.base_URL + '/getFTP');
  //     return FTPdata;
  //   } catch (error) {
  //     console.trace(error);
  //   }
  // },
  //!
};

document.addEventListener('DOMContentLoaded', app.init);

// eslint-disable-next-line max-len
// document.querySelector('.getDataByFTP').addEventListener('click', app.getDataByFTP);
