::��ת����ĿĿ¼
cd %cd% 

::����mongodb���˴�����mongodb�����ݿ�·����
start/min cmd /c "mongod --dbpath mongodb"

::����mongodb�������ü�����ip�Ͷ˿ڣ���Ӧ�ں�̨�����õ����ݿ����Ӷ˿ڣ�
start/min cmd /c mongo 127.0.0.1:27017

::����������ʶ˿ڣ����ʶ˿��ں�̨��Ŀ��������ã�
:: -- ʹ��ָ��·���������
::start/min cmd /c " "C:\user-Program Files (x86)\Chrome\chrome.exe" http://localhost:3000" "
:: -- ʹ��Ĭ���������
start/min cmd /c "start http://localhost:3000"


::������Ŀ����Ŀ������������������������ȴ��������ִ���������
supervisor app.js

:: ˵����
:: ���� - ��/k�� ������k����c���´������н������Զ��رգ�/k������
:: ���� - ��start/min�� ������С������