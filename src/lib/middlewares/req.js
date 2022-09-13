 export default function extractUserInfo(req, res, next) {
    const getHeader = key => req.headers[key] || '';
    req.user = {
        email: getHeader('x-auth-email'),
        id: getHeader('x-auth-id'),
        server: getHeader('x-auth-server')
    }
    next();
}