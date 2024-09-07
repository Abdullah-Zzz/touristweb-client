import './Footer.css'

export default function Footer(){
    return(
        <footer>
            <div className='footer-footerHead'>
            <h4>Trippy</h4>
            </div>
            <div className='footer-mainContainer'>
                <div className='footer-para'>
                Explore The Beauty 
                Of Pakistan.
                </div>
                <div className='footer-email'>
                    <p>Reach out to us if you have any queries</p>
                    <div className='footer-emailAndBtn'>
                    <input placeholder='YOUR EMAIL' type='email'/>
                    <button>Send</button>
                    </div>
                </div>
                <div className='footer-socials'>
                    <p>Follow Us</p>
                    <div className='footer-socialIcons'>
                        <div><img src='/Images/fb.png' width={"30px"}/></div>
                        <div><img src='/Images/insta.png'width={"30px"} /></div>
                        <div><img src='/Images/twitter.png' width={"30px"}/></div>
                    </div> 
                </div>
                <div className='footer-contact'>
                    <p>Contact Us</p>
                    <p>098098098098</p>
                </div>
            </div>

            <div className='footer-regards'>
            <p>Designed and developed by <span className='devName'> Umair Sarwar</span></p>
            </div>
        </footer>
    )
}