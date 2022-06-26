const path = require('path');
const commonConfiguration = require('./webpack.common');
const portFinderSync = require('portfinder-sync');
const {merge} = require('webpack-merge');

module.exports = merge(commonConfiguration, {
  stats: "errors-warnings",
  mode: "development",
  infrastructureLogging: {
    level: 'warn'
  },
  devServer: {
    host: 'localhost',
    port: portFinderSync.getPort(3000),
    open: true,
    https: false,
    static: {
        watch: true,
        directory: path.join(__dirname, 'static')
    },
    watchFiles: ['src/**', 'static/**'], // 해당 디렉토리에 있는 파일이 CRUD가 됐을 경우, 런타임으로 로딩을 다시한다(ReLoad).
    client: {
        logging: 'none', // 브라우저 레벨에서 에러를 어느범위 까지 허용할지를 설정한다.
        overlay: true, // 컴파일 과정에서 에러가 생길 경우, 브라우저 단에서 풀 스크린으로 에러를 보여준다.
        progress: false // 빌드 진행률을 보여준다.
    },
    setupMiddlewares: (middlewares, devServer) => {
        const port = devServer.options.port;
        const http = devServer.options.https ? 's' : '';
        const domain1 = `http${http}://${devServer.options.host}:${port}`;
        const domain2 = `http${http}://localhost:${port}`;
        
        console.log(`프로젝트 실행`);
        console.log(domain1);
        console.log(domain2);
        
        return middlewares;
    }
  }
});