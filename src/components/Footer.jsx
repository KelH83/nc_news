const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return(
        <>
        {/* <a className="weatherwidget-io" href="https://forecast7.com/en/52d36n1d17/england/" data-label_1="ENGLAND" data-label_2="WEATHER" data-theme="dark" data-basecolor="rgb(64,2,105)" data-accent="rgba(64, 2, 5, 0.12)" >ENGLAND WEATHER</a>
        <script>
        {!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js')}
        </script> */}
        <p className='copyright'>©Copyright <span>{year}</span> K.Howes <button onClick={() => window.location = 'mailto:yourmail@domain.com'}>Contact me</button></p>
        </>
    )
}

export default Footer