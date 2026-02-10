function validateForm() {

    let firstName = document.getElementById("firstName").value.trim();
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value.trim();
    let gender = document.getElementById("gender").value;
    let dName = document.getElementById("dName").value.trim();
    let dAddress = document.getElementById("dAddress").value.trim();
    let dAge = document.getElementById("dAge").value;
    let images = document.getElementById("images").files.length;

    let errorMsg = document.getElementById("errorMsg");

    if (
        firstName === "" || age === "" || address === "" || gender === "" ||
        dName === "" || dAddress === "" || dAge === "" || images === 0
    ) {
        errorMsg.textContent = "⚠️ Please fill in all fields and upload images.";
        return false;
    }

    if (age <= 0 || dAge <= 0) {
        errorMsg.textContent = "⚠️ Age must be greater than zero.";
        return false;
    }

    alert("✅ Memorial submitted successfully!");
    return true;
}
