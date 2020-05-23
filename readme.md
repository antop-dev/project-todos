[![GitHub issues](https://img.shields.io/github/issues/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/issues)
[![GitHub forks](https://img.shields.io/github/forks/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/network)
[![GitHub stars](https://img.shields.io/github/stars/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/stargazers)
[![GitHub license](https://img.shields.io/github/license/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/antop-dev/project-todos.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fantop-dev%2Fproject-todos)

# Todos project

Webpack + TypeScript + Vue.js + Express 연습 해보는 Todo List 프로젝트.

배포에 대한 사항은 고려되어 있지 않은 소소한 개발 연습 프로젝트.

## Getting started

```
git clone https://github.com/antop-dev/project-todos.git
cd project-todos
npm install
```

Server
```
npm run dev:server
```

Client
```
npm run dev:client
```

Web
```
http://localhost:9000/
```

Test
```
npm run test:client
npm run test:server
npm run test:e2e
``` 

## References

### Webpack

* [Documentation &gt; Guide &gt; Getting Started](https://webpack.js.org/guides/getting-started/)
* [Documentation &gt; Guide &gt; Asset Management](https://webpack.js.org/guides/asset-management/)
* [Documentation &gt; Guide &gt; Output Management](https://webpack.js.org/guides/output-management/)
* [Documentation &gt; Guide &gt; Development](https://webpack.js.org/guides/development/)
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

### Vue Loader 15

* [Getting Started &gt; Manual Config](https://vue-loader.vuejs.org/guide/#manual-configuration)
* [Using Pre-Processors &gt; TypeScript](https://vue-loader.vuejs.org/guide/pre-processors.html#typescript)
* [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html)

### Typesciprt

* [TypeScript loader for webpack](https://github.com/TypeStrong/ts-loader)
* [TypeSearch](https://microsoft.github.io/TypeSearch/)
* [How to use a third party library in Typescript with or without its type definition file?](http://www.albertgao.xyz/2016/08/10/how-to-use-a-third-party-library-in-typescript-with-or-without-its-type-definition-file/)
* [Any Plans on including TypeScript definitions?](https://github.com/SortableJS/Vue.Draggable/issues/379)
* [배우기 &gt; 가이드 &gt; TypeScript 지원 &gt; 플러그인과 함께 사용하기 위한 타입 확장](https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins)
* [d.ts 만들기](https://www.slideshare.net/gloridea/dts-74589285)

### Class-Style Vue Components

* [배우기 &gt; 가이드 &gt; TypeScript 지원 &gt; 클래스 스타일 Vue 컴포넌트](https://kr.vuejs.org/v2/guide/typescript.html#%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%8A%A4%ED%83%80%EC%9D%BC-Vue-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
* [vue-class-component](https://github.com/vuejs/vue-class-component)
* [vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)

### Design

* [Vuetify](https://vuetifyjs.com/ko)
* [Material Design](https://material.io)
* [Metrial Design Icons](http://google.github.io/material-design-icons/)

### Third party packages

#### Client
* [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* [Sortable &#35;options](https://github.com/RubaXa/Sortable#options)

#### Server
* [Express](https://expressjs.com/ko/)
* [SQLite Node.js](http://www.sqlitetutorial.net/sqlite-nodejs)

### Test

#### Client
* [Testing Vue](https://laracasts.com/series/testing-vue)
* [Jest](https://jestjs.io)
* [Vue Test Utils](https://vue-test-utils.vuejs.org/)
* [setTimeout not triggering when unit testing](https://github.com/facebook/jest/issues/3211)
* [What is the difference between 'toBe' and 'toEqual' in Jest?](https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest)
* [Sinon.JS](https://sinonjs.org/)
* [Mocking Axios Calls](https://laracasts.com/series/testing-vue/episodes/8)
  * [httpbin](http://httpbin.org)
  * [Fake XHR and server - Sinon.JS](https://sinonjs.org/releases/latest/fake-xhr-and-server/)
  * [testdouble.js](https://github.com/testdouble/testdouble.js)
  * [moxios](https://github.com/axios/moxios)

#### Server
* [Mocha](https://mochajs.org/)
* [Chai Assertion Library](https://www.chaijs.com/)

#### End-to-End
* [cypress](https://www.cypress.io/)

## 시행착오

### Single File Component(SFC) with TypeScript

자꾸 이거 빠트려서 애먹었다.. ㅠㅠ

```html
<template>

</template>

<script lang="ts">
    // lang="ts" 잊지 말자...
    ..
</script>

<style scoped module>
    ...
</style>
```

### CSS Modules

CSS 모듈을 사용하려고 아래와 같이 설정을 넣었다...

```
{
    test: /\.css$/,
    use: [
        'vue-style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                // 아래 두 개 주목!
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
            }
        }
    ]
}
```

Vue 싱글파일 컴포넌트 작성할 때 아래처럼 일반적으로(?) 사용하게 되면

```html
<template>
    ...
    <span class="link" @click="remove">x</span>
</template>

<script lang="ts">
    ...
</script>

<style scoped>
    .link {
        cursor: pointer;
        font-weight: bold;
        color: red;
    }
</style>
```

아래처럼 CSS는 `스타일명_해시8자리`로 나오는데 HTML 태그는 `스타일명` 으로 나오면서 불일치하게 된다.

```html
<style type="text/css">
/* 설정 한대로 해시태그가 붙어서 생성 되었다. */
.link_2HwuedkQ[data-v-33df0029] {
    cursor: pointer;
    font-weight: bold;
    color: red;
}
</style>

<div data-v-33df0029="" data-v-3de47834="">
    <input data-v-33df0029="" type="checkbox">a
    <!-- class 속성값이 "link_2HwuedkQ"가 아니다!!! -->
    <span data-v-33df0029="" class="link">x</span>
</div>
``` 

아래와 같이 사용해야 한다.

```html
<template>
    ...
    <!-- v-bind 사용 -->
    <span :class="$style.link" @click="remove">x</span>
</template>

<script lang="ts">
    ...
</script>

<!-- module 속성 추가 -->
<style scoped module>
    .link {
        cursor: pointer;
        font-weight: bold;
        color: red;
    }
</style>
```

### TS2564: Property '...' has no initializer and is not definitely assigned in the constructor.

TypeScript 2.7 부터 컴파일 옵션 중 `strict: true`일 경우 클래스 속성의 값이 초기화 되어 있어야 한다.

```typescript
class Person {
    firstName: string;
    lastName: string;
}
```
 
위와 같이 작성 하고 컴파일을 하게 되면 TS2564 에러가 발생한다.

1. 해결방법으로는 속성 선언시 `!:`로 선언 하는 방법

```typescript
class Person {
    firstName!: string;
    lastName!: string;
}
```

2. 컴파일 설정에서 `strictPropertyInitialization` 값을 `false`로 한다.

```json
{
  "compilerOptions": {
    "strict": true,
    "strictPropertyInitialization": false
  }
}
```

[Strict Property Initialization Checks in TypeScript 2.7](https://hk.saowen.com/a/496168b33f7312485c463935eda3db511cb06f0f30060d7c57c1e500875c706e)

### component lists rendered with v-for should have explicit keys

v-for 디렉티브 사용시 :key 속성을 선언하지 않으면 빌드시에 아래와 같은 경고가 난다.

```
WARNING in ./src/client/components/TodoList.vue?vue&type=template&id=144cd6d2&scoped=true& (./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/client/components/TodoList.vue?vue&type=
    template&id=144cd6d2&scoped=true&)
    Module Warning (from ./node_modules/vue-loader/lib/loaders/templateLoader.js):
    (Emitted value instead of an instance of Error) <todo-item v-for="item in items">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
     @ ./src/client/components/TodoList.vue?vue&type=template&id=144cd6d2&scoped=true& 1:0-224 1:0-224
     @ ./src/client/components/TodoList.vue
     @ ./src/client/index.ts
```

### TS2322: Type 'Timeout' is not assignable to type 'number'.

setTimeout(f, delay) 를 사용하는 부분이 있다.

```typescript
let timer: number;
timer = setTimeout(function() {
    // do somthing
}, 1500);
clearTimeout(timer);
```

잘 되던 코드였는데 테스트 관련해서 패키지를 추가 후 에러가 나기 시작한다. TypeScript의 **타입** 중복으로 의심되어 찾아보니 @types/node 패키지와 함수 중복이 되고 있었다.

* typescript/lib/lib.dom.d.ts
    ```typescript
    declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
    declare function clearTimeout(handle?: number): void;
    ```

* @types/node/index.d.ts (Node를 TypeScript로 작성할 시 쓰는 패키지 같은데 내가 직접 사용하지 않는다. 디펜더시에 의해 추가됨)
    ```typescript
    declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timeout;
    declare function clearTimeout(timeoutId: NodeJS.Timeout): void;
    ```

위와 같이 같은 이름으로 정의된 펑션의 입출력 타입이 다른데 하나는 웹쪽이고 하나는 Node 쪽의 함수임을 알 수 있다.

인터넷에 돌아다니는 가장 간단한 해결 방법은 Window객체의 setTimeout/clearTimeout 펑션이라고 명시하는 것이다.

```typescript
let timer: number;
// window.setTimeout
timer = window.setTimeout(function() {
    // do somthing
}, 1500);
// window.clearTimeout
window.clearTimeout(timer);
```

### &#91;Vuetify&#93; Multiple instances of Vue detected

별 짓을 다 해봤는데 안된다.... 구글링 결과 현재 vue-test-utils 문제라는 듯!?

[&#91;Bug Report&#93; "$attrs is readonly" and "$listeners is readonly" console messages. #4068](https://github.com/vuetifyjs/vuetify/issues/4068)<br>
[$listeners is readonly error](https://github.com/vuejs/vue-test-utils/issues/532)<br>

### webpack.resolve.alise / tsconfig.compilerOptions.paths / jest.moduleNameMapper

webpack에서 alias를 사용할 경우 TypeScript와 Jest에서도 같이 설정을 맞춰야 한다.

[Enhance Jest configuration with Module Aliases](https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/)

* webpack.config.js
    ```javascript
    module.exports = {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src', 'client')
            },
            extensions: ['.ts', '.js', '.vue']
        }
    }
    ```

* tsconfig.json
    ```json
    {
      "compilerOptions": {
        "baseUrl": "./",
        "paths": {
          "@/*": [
            "src/client/*"
          ]
        }
      }
    }
    ```
 
 * jest.config.js
    ```javascript
    module.exports = {
       moduleNameMapper: {
           "@/([^\\.]*)$": "<rootDir>/src/client/$1"
       }
    };
    ```

### CORS policy

클라이언트와 서버를 완전 분리하게 되면서 클라이언트(Front-End)에서 서버로의 AJAX 요청이 막히게 되어버렸다.

```
// 8080 (Front-End) 에서 3000 (Back-End)로 요청 안됨.
Access to XMLHttpRequest at 'http://localhost:3000/todo' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

서버단에서 Node.js + Express 사용 시 cors 패키지 사용으로 간단히 해결 가능

```javascript
const cors = require('cors');
const app = express();
// enable allow CORS
app.use(cors());
```

출처: [node.js express에서 CORS 허용하기](http://guswnsxodlf.github.io/enable-CORS-on-express)

## 마치며..

여러가지 맛보기로 Todo List 프로젝트를 간단하게 완성해 봤다.

TypeScript를 쓰면서 처음에는 좋았지만... Javascript로 작성된 외부 라이브러리를 사용하는데에 있어서 힘들었다. 다시는 TypeScript를 사용하지 않을 것 같다... ㅜㅜ 

또 Jest, Mocha, Cypress 를 이용하여 간단하게 테스트도 해봤다.

다음에는 Vue + ＠ 로 더 나은 것(?)을 만들어 봐야겠다. Front-End와 Back-End를 완전히 나눠야 겠다.

2018.11.11
