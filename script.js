document.querySelector('#yourForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    const response = await fetch('https://3eaf61ef-0c14-4730-8f62-862f2de875ba.e1-us-east-azure.choreoapps.dev/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();
    console.log(result.message);  // Show the success message
});
