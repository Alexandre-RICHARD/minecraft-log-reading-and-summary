const listController = {

  initiate: (req, res) => {
    const fs = require('fs');
    const path = require('path');

    const absolutepath = path.resolve(__dirname, 'logs');
    const lineTable = [];

    const getDirectories = (source) =>
      fs.readdirSync(source, {withFileTypes: true})
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);
    const result = getDirectories(absolutepath);

    result.map((element) => {
      // eslint-disable-next-line max-len
      const subelement = fs.readFileSync(path.resolve(__dirname, 'logs', element, element), 'utf8');
      const lineSeparator = subelement.split('\n');
      lineSeparator.forEach((ele) => {
        lineTable.push(`${element.slice(0, 10)} - ${ele}`);
      });
    });

    res.json(lineTable);
  },

  getFTPData: (req, res) => {
    console.log('Oui oui oui');

    const Client = require('ftp');
    const c = new Client();

    c.connect({
      host: 'sftp://msr1048.minestrator.com',
      port: 'shadowmere.f3051d10',
      user: '6023Sat960May-MSR',
      password: '2022',
    });
    c.on('ready', function() {
      c.on('ready', function() {
        c.list(function(err, list) {
          if (err) throw err;
          console.dir(list);
          c.end();
        });
      });
    });

    res.json(list);

    // console.log('Oui oui oui');

    // const Client = require('ftps');
    // const FTP = new Client({
    //   host: 'sftp://msr1048.minestrator.com',
    //   username: '6023Sat960May-MSR',
    //   port: 'shadowmere.f3051d10',
    //   password: '2022',
    // });

    // console.log(FTP.ls());

    // res.json('ok');
  },

};
module.exports = listController;
