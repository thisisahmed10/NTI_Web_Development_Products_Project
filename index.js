setTimeout(() => {
    alert("Welcome to our Product Manager! 🎉 Add your products using the form below.");
}, 1500);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        createItem();
    });
});

let count = 0;
function createItem() {
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value.trim();

    if (!name || !description || !price || !imageUrl) {
        alert("Please fill in all fields!");
        return;
    }

    if (parseFloat(price) < 0) {
        alert("Price cannot be negative!");
        return;
    }

    console.log("Creating product:", { name, description, price, imageUrl });

    const contentBox = document.getElementById('content');
    const productCard = document.createElement('div');
    productCard.className = 'card';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    img.onerror = function() {
        this.src = 'errorLoadingImage.jpeg';
    };

    const productName = document.createElement('h3');
    productName.textContent = name;

    const productDesc = document.createElement('p');
    productDesc.textContent = description;

    const productPrice = document.createElement('p');
    productPrice.className = 'price';
    productPrice.textContent = `$${parseFloat(price).toFixed(2)}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = "🗑️ Delete";
    deleteBtn.onclick = function() {
        deleteProduct(productCard, name);
    };

    productCard.addEventListener('click', function(event) {
        if (event.target === deleteBtn) return;
        
        if (this.style.width === '300px') {
            this.style.width = '200px';
        } else {
            this.style.width = '300px';
        }
    });

    productCard.appendChild(img);
    productCard.appendChild(productName);
    productCard.appendChild(productDesc);
    productCard.appendChild(productPrice);
    productCard.appendChild(deleteBtn);

    contentBox.appendChild(productCard);
    productCard.id = `card${count++}`;
    document.getElementById('productForm').reset();
    alert(`✅ Product "${name}" has been added successfully!`);
    sessionStorage.setItem(`${productCard.id}`, productCard);
}

function deleteProduct(cardElement, productName) {
    if (confirm(`⚠️ The item "${productName}" will be deleted!`)) {
        cardElement.remove();
        alert(`🗑️ Product "${productName}" has been deleted.`);
        sessionStorage.removeItem(`${cardElement.id}`, cardElement);
    }
}