import router from "@/router";
export function guard() {

    const Token = localStorage.getItem('token');

    if (Token) {
        return true;
    }
    else {
        router.push('/login');
    }
}