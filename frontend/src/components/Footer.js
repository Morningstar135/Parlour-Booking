const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return(
    <div className="">
        <footer>
        <h1 className="fs-4">Lycon Hair Saloon</h1>
        <h3 className="fs-5">Contact Us:</h3>
        <address className="fs-6">
            [Salon Address]
            [City, State, Zip Code]
            Phone: [Salon Phone Number]
            Email: [Salon Email]
        </address>
       <h4 className="fs-6"> © {currentYear} Lycon Saloon</h4>
       </footer>


    </div>
    )
}


export default Footer