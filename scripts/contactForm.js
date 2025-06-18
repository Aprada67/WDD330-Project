const contactForm = document.getElementById("contact-form");

// Contact form
contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("https://formsubmit.co/ajax/albertojprada10@gmail.com", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            document.getElementById("form-message").textContent = "Message sent successfully!";
            form.reset();
        } else {
            document.getElementById("form-message").textContent = "Something went wrong. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("form-message").textContent = "There was an error submitting the form.";
    }
});