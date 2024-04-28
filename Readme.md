# 俄罗斯方块游戏：
## 技术：webpack + jquery + typescript + 面向对象开发
## 项目目的：
1. 学习 TS 如何结合 webpack 做开发；
2. 巩固 TS 的知识；
3. 体验面向对象编程思想；

## 声明文件：
1. 什么是声明文件？
   > 以`.d.ts`结尾的文件；

2. 声明文件有什么作用？
   > 为 JS 代码提供类型声明；

3. 声明文件的位置？
   > 1. 放到 tsconfig.json 配置中包含的目录中 include: []；
   > 2. 放到 node_modules/@types 文件夹中；
   > 3. 手动配置 typeRoots: [];
   > 4. 与 JS 代码所在目录相同，并且文件名也相同的文件。用 ts 代码书写的工程发布之后的格式；

## 装饰器：
> 1. 面向对象的概念（java：注解，c#：特征），decorator；
> 2. angular 大量使用，react中有用到；
> 3. 目前JS支持装饰器，目前处于建议征集的第二阶段；

## 解决的问题：
- 关注点的问题：在定义某个东西的时候，最清楚该东西的情况；
- 重复代码问题；

上述两个文件产生的根源：某些信息，在定义时，能够附加的信息量有限；

## 作用：
为某些属性、类、参数、方法提供元数据信息；

## 装饰器的本质：
在 JS 中，装饰器本质就是一个函数（装饰器是要参与运行的）。


```ts
class User {
    @require
    @range(3, 5)
    loginId: string; // 必须是3-5个字符
    @requireaaaa
    @range(6, 12)
    loginPwd: string; // 必须是6-12个字符
    @require
    @range(0, 100) 
    age: number; // 必须是0-100之间的数字
    gender: "男" | "女"
}

const u = new User();

function validate(obj: object) {
   for (const objKey in obj) {
      const val = obj[objKey];
   }
}
```

## 面向对象：
1. TS 为前端面向对象开发带来了契机；
   > 1. JS语言没有类型检查，如果使用面向对象的方式开发，会产生大量的接口，而大量的接口会导致调用复杂度剧增，这种复杂度必须通过严格额类型检查来避免错误，尽管可以使用注释或文档或记忆力，但是它们是没有强约束力。
   > 2. TS 带来了完整的类型系统，因此开发复杂程序时，无论接口数量有多少，都可以获得完整的类型检查，并且这种是具有强约束力的。 
2. 面向对象中有许多非常成熟的模式，能处理复杂问题；
   > 在过去的很多年中，在大型应用或复杂领域，面向对象已经积累了非常多的经验。

### 什么是面向对象？
面向对象：Oriented（基于） Object（事物），简称OO；
- 是一种编程思想，他提出一切以对象对切入点思考问题。其他编程思想：面向过程、函数式编程；

## 类型演算：
> 根据已知的信息，计算出新的类型

### typeof：
> 表示获取某个数据的类型；当typeof作用于类的时候，得到的类型是该类的构造函数
> ```ts
> class User {
>   loginId: string;
>   loginPwd: string;
>   age: number;
>   gender: "男" | "女"
>   }
> 
> function createUser(cls: typeof User): User {
>   return new cls();
> }
> 
> const u = createUser(User)
> ```

### keyof：
> 作用于类、接口、类型别名，用于获取其他类型中的所有成员名组成的联合类型。
> ```ts
> interface User {
>    loginId: string;
>    loginPassword: string;
>    age: number;
> }
> 
> function printUserProperty(obj: User, propertyName: keyof User) {
>    console.log(obj[propertyName]);
> }
> 
> const u: User = {
>    loginId: 'codexgh',
>    loginPassword: 'codexgh',
>    age: 18
> }
> 
> printUserProperty(u, 'loginPassword')
> ```

### in：
> 该关键字往往和keyof联用，限制某个索引类型的取值范围。
> ```ts
> interface User {
>    loginId: string;
>    loginPassword: string;
>    age: number;
> }
> 
> type Obj = {
>    [p in keyof User]: User[p]
> }
> 
> const u: Obj = {
>    loginId: 'codexgh',
>    loginPassword: 'codexgh',
>    age: 18,
> }
> ```