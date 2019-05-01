/**
 * Error 인터페이스.
 * 공통 에러 메세지를 처리한다.
 * 서버 에러도 아래와 같은 name/message 속성이 존재함.
 */
export interface Error {
    name: string,
    message: string
}
