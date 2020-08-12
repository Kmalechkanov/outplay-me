const navigation = (user) => {
    const authorized = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
            title: "LogOut",
            link: "/logout",
            custom: true
        },
    ]

    const notAuthorized = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "LogIn",
            link: "/login"
        }, 
        {
            title: "Register",
            link: "/register"
        },
    ]

    return user && user.loggedIn ? authorized : notAuthorized
}


export default navigation