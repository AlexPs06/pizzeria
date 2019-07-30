// src/middleware/auth.js
export default function auth({ next, router }) {
    if (!localStorage.getItem('login')) {
        return router.push({ name: 'Login' });
    }

    return next();
}