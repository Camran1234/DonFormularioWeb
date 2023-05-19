import NavAdmin from "./NavAdmin";
const MenuAdmin = () => {
    
    const data = [
        {name: 'Page A', uv: 400},
        {name: 'Page B', uv: 200},
        {name: 'Page C', uv: 100},
        {name: 'Page D', uv: 500},
    ];

    return(
        <div className="background-admin">
            <NavAdmin />
            <div className="containerCenter">
                <h1 className="center">Bienvenido {localStorage.getItem("admin")}</h1>
                <img 
                className="center"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-EvkTiVYcRA0%2FU_qEXJ_QMWI%2FAAAAAAACSAE%2FwPXUK51pAQg%2Fs1600%2Fimagenes%252Bbonitas%252By%252Bfotos%252Bde%252Bpaisajes%252Bnaturales%252B-%252Bamazing%252Bfree%252Bwallpapers%252B(9).jpg&f=1&nofb=1&ipt=7cd45c4bc28167c7442eaafdbb3acc331f6a64b5566c606e64dfe8051372f225&ipo=images"/>
            </div>
            <div className="containerCenter">
                
            </div>      
        </div>
    )
}

export default MenuAdmin;