/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 백엔드 프록시: 브라우저 → /backend/* → JB 컴플라이언스 API.
  // CORS를 피하기 위해 같은 출처(/backend)로 호출하고 서버가 대신 전달한다.
  async rewrites() {
    const base =
      process.env.NEXT_PUBLIC_API_ORIGIN ?? "https://jb-contest.p-e.kr";
    return [{ source: "/backend/:path*", destination: `${base}/api/:path*` }];
  },
};

export default nextConfig;
