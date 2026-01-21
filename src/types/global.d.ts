export {};

declare global {
  interface Window {
    services: {
      // 根据你的实际 services 结构定义类型
      [key: string]: any;
      // 或者具体定义
      download: any;
      // authService: AuthService;
    };
  }
}