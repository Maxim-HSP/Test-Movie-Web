::跳转到项目目录
cd %cd% 

::启动mongodb（此处定义mongodb的数据库路径）
start/min cmd /c "mongod --dbpath mongodb"

::挂载mongodb（可配置监听的ip和端口，对应在后台中配置的数据库链接端口）
start/min cmd /c mongo 127.0.0.1:27017

::打开浏览器访问端口（访问端口在后台项目入口中配置）
:: -- 使用指定路径浏览器打开
::start/min cmd /c " "C:\user-Program Files (x86)\Chrome\chrome.exe" http://localhost:3000" "
:: -- 使用默认浏览器打开
start/min cmd /c "start http://localhost:3000"


::启动项目（项目启动后不允许再输入命令，所以先打开浏览器再执行启动命令）
supervisor app.js

:: 说明：
:: 参数 - “/k” 将参数k换成c则新窗口运行结束后自动关闭（/k则保留）
:: 命令 - “start/min” 窗口最小化运行