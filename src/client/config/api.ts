/**
 * TODO: 나중에 진짜 배포 한다면 따로 설정 파일 빼서 적용해야 할것이다.
 */
const protocol: string = 'http';
const port: number = 3000;
const host: string = window.location.hostname;
const uri: string = host + ':' + port;

export default function (path: string) {
    return protocol + '://' + uri + path;
}
