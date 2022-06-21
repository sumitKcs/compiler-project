const Footer = () => {
    let date = new Date()
    return (
        <>
        <div id="bottomBar">
            <div id="brandName">Made with ❤️ In India</div>
            <div id="copyright">&#169;{date.getFullYear()}</div>
            <div id="devName">
            <a href="https://www.linkedin.com/in/sumitssr/">Contact Developer</a>
            </div>
         </div>
        </>
    )
}

export default Footer