function redirectToWhatsApp(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const source = document.getElementById('source').value;

    const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. I wanted to say: ${message}. I heard about you via ${source}.`;

    const phoneNumber = '+96171607693';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
}
