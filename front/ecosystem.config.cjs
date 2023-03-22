module.exports = {
  apps: [
    {
      name: 'next-app', // 애플리케이션 이름을 원하는 대로 설정하세요.
      script: 'npm',
      args: 'start', // Next.js 애플리케이션을 실행할 명령어입니다.
      instances: 'max', // 클러스터 모드에서 실행할 인스턴스 수를 설정합니다.
      exec_mode: 'cluster', // 클러스터 모드를 사용하여 실행합니다.
      autorestart: true, // 프로세스가 실패할 경우 자동으로 다시 시작합니다.
      watch: false, // 파일 변경을 감지하여 자동으로 재시작하는 기능을 비활성화합니다.
      max_memory_restart: '1G', // 메모리 제한을 초과할 경우 프로세스를 재시작합니다.
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
