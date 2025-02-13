function updateRoastOptions() {
    const quantity = document.getElementById('quantity').value;
    const roastSelect = document.getElementById('roast');
    if (quantity != "0") {
        roastSelect.disabled = false;
    } else {
        roastSelect.disabled = true;
        roastSelect.value = "0";
        updatePrice();
    }
}

function updatePrice() {
    const roastPrice = parseInt(document.getElementById('roast').value) || 0;
    const quantityPrice = parseInt(document.getElementById('quantity').value) || 0;
    const totalPrice = roastPrice + quantityPrice;
    document.querySelector('.price').innerText = totalPrice + ' EGP';
}