import React from "react";

function Footer(){
    return(
    <footer>
        <div className="bg-success text-white text-center">
            <p className="mb-1">Manage Your expense easily track, analyze and save smartly.</p>
            <p className="small mb-0">&copy; {new Date().getFullYear()} Secure Expense Tracker | Built with by Maharaja </p>
            </div>
    </footer>
    );

}
export default Footer;