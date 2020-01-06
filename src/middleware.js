// express가 아닌 graphQL 미들웨어를 정의
// resolver들을 보호하기 위해

export const isAuthenticated = (request) => {
    if(!request.user) {
        throw Error('You need to log in!');
    }
    return;
}