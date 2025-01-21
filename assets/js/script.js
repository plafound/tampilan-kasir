document.addEventListener("DOMContentLoaded", () => {
    const productMenu = document.getElementById("productMenu");
    const orderContainer = document.getElementById("orderContainer");
    const subtotalElement = document.getElementById("Subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const totalHargaModal = document.getElementById("totalHarga");
    const categoryLinks = document.querySelectorAll('.nav-menu');

    const orderDetails = document.getElementById("orderDetails");
    const paymentMethod = document.getElementById("paymentMethod");
    const paymentMethodModal = document.getElementById("paymentMethodModal");
    const confirmOrderButton = document.getElementById("confirmOrderButton");

    let cartItems = [];

    // Fungsi untuk memperbarui total harga
    function calculateTotals() {
        const subtotal = cartItems.reduce((sum, item) => sum + item.harga * item.quantity, 0);
        // const tax = subtotal * 0.1; // Pajak 10% dari subtotal
        const tax = 0;
        const total = subtotal + tax;

        // Update tampilan subtotal, pajak, dan total
        subtotalElement.textContent = `Rp. ${subtotal.toLocaleString("id-ID")}`;
        taxElement.textContent = `Rp. ${tax.toLocaleString("id-ID")}`;
        totalElement.textContent = `Rp. ${total.toLocaleString("id-ID")}`;
        totalHargaModal.value = `Rp. ${total.toLocaleString("id-ID")}`;

        // Update nilai di modal konfirmasi pembayaran
        document.getElementById("totalHarga").textContent = `Rp. ${subtotal.toLocaleString("id-ID")}`;
        document.getElementById("taxModal").textContent = `Rp. ${tax.toLocaleString("id-ID")}`;
        document.getElementById("totalPaymentModal").textContent = `Rp. ${total.toLocaleString("id-ID")}`;
    }

    // Fungsi untuk menambahkan item ke keranjang
    function addToCart(name, kategori, harga) {
        const existingItem = cartItems.find((item) => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1; // Tambah quantity jika item sudah ada
        } else {
            cartItems.push({ name, kategori, harga, quantity: 1 });
        }
        renderCart();
        calculateTotals();
    }

    // Fungsi untuk mengurangi jumlah item
    function decreaseQuantity(index) {
        const item = cartItems[index];
        if (item.quantity > 1) {
            item.quantity -= 1; // Kurangi quantity jika lebih dari 1
        } else {
            removeFromCart(index); // Hapus item jika quantity sudah 1
        }
        renderCart();
        calculateTotals();
    }

    // Fungsi untuk menambah jumlah item
    function increaseQuantity(index) {
        const item = cartItems[index];
        item.quantity += 1; // Tambah quantity
        renderCart();
        calculateTotals();
    }

    // Fungsi untuk merender isi keranjang
    function renderCart() {
        orderContainer.innerHTML = ""; // Bersihkan keranjang
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "d-flex justify-content-between align-items-center mb-3";
            cartItem.innerHTML = `
                <div>
                    <p class="mb-0 fw-semibold">${item.name}</p>
                    <p class="mb-0 text-secondary fs-7">${item.kategori}</p>
                    <div class="d-flex gap-3 mt-2">
                        <button type="button" id="decrease-btn" class="btn btn-sm btn-quantity rounded-circle" data-index="${index}"><i class="bx bx-minus"></i></button>
                        <p class="mb-0">${item.quantity}</p>
                        <button type="button" id="increase-btn" class="btn btn-sm btn-quantity rounded-circle" data-index="${index}"><i class="bx bx-plus"></i></button>
                    </div>

                </div>
                <div class="d-flex align-items-center gap-2">
                    <p class="mb-0 fw-bold">Rp. ${(item.harga * item.quantity).toLocaleString("id-ID")}</p>
                    <button type="button" id="delete-btn" class="btn btn-sm btn-light btn-delete" data-index="${index}"><i class="bx bx-trash"></i></button>
                </div>
            `;
            orderContainer.appendChild(cartItem);

            // Tambahkan event listener untuk tombol hapus
            cartItem.querySelector("#delete-btn").addEventListener("click", () => {
                removeFromCart(index);
            });

            // Tambahkan event listener untuk tombol kurangi
            cartItem.querySelector("#decrease-btn").addEventListener("click", () => {
                decreaseQuantity(index);
            });

            // Tambahkan event listener untuk tombol tambah
            cartItem.querySelector("#increase-btn").addEventListener("click", () => {
                increaseQuantity(index);
            });
        });
    }

    // Fungsi untuk menghapus item dari keranjang
    function removeFromCart(index) {
        cartItems.splice(index, 1); // Hapus item dari array
        renderCart();
        calculateTotals();
    }

    // Tambahkan event listener pada setiap card menu
    productMenu.querySelectorAll(".card-menu").forEach((card) => {
        card.addEventListener("click", () => {
            const name = card.dataset.name;
            const kategori = card.dataset.kategori;
            const harga = parseInt(card.dataset.harga, 10);
            addToCart(name, kategori, harga);
        });
    });

    // Fungsi untuk menampilkan menu berdasarkan kategori
    function filterMenu(category) {
        const cards = productMenu.querySelectorAll('.card-menu');
        cards.forEach(card => {
            const cardCategory = card.dataset.kategori;
            if (category === 'Semua' || cardCategory === category) {
                card.style.display = 'block'; // Tampilkan item
            } else {
                card.style.display = 'none'; // Sembunyikan item
            }
        });
    }

    // Event listener untuk navigasi kategori
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.textContent; // Ambil kategori dari teks link
            filterMenu(category);
        });
    });

    // Menampilkan semua item ketika halaman pertama kali dimuat
    filterMenu('Semua');

    // Menampilkan rincian pesanan di modal
    function showOrderDetails() {
        orderDetails.innerHTML = ""; // Bersihkan rincian
        cartItems.forEach(item => {
            const itemDetail = document.createElement("div");
            itemDetail.className = "d-flex justify-content-between";
            itemDetail.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>Rp. ${(item.harga * item.quantity).toLocaleString("id-ID")}</span>
            `;
            orderDetails.appendChild(itemDetail);
        });
    }

    // Menampilkan modal konfirmasi pemesanan
    function showConfirmationModal() {
        showOrderDetails();
        const selectedPaymentMethod = paymentMethod.value;
        paymentMethodModal.textContent = selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1); // Menampilkan metode pembayaran yang dipilih
        const modal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
        modal.show();
    }

    // Event listener untuk konfirmasi pesanan
    confirmOrderButton.addEventListener("click", () => {
        const selectedPaymentMethod = paymentMethod.value;
        alert(`Pesanan berhasil dikonfirmasi dengan metode pembayaran: ${selectedPaymentMethod}`);
        // Reset keranjang setelah konfirmasi
        cartItems = [];
        renderCart();
        calculateTotals();
        const modal = bootstrap.Modal.getInstance(document.getElementById('orderConfirmationModal'));
        modal.hide();
    });

    // Menampilkan modal konfirmasi pemesanan
    document.getElementById("confirmButton").addEventListener("click", showConfirmationModal);

    // Mencegah klik kanan dan keyboard shortcut tertentu
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('keydown', (event) => {
        // Mencegah F12
        if (event.key === "F12") {
            event.preventDefault();
        }
        // Mencegah Ctrl+Shift+I
        if (event.ctrlKey && event.shiftKey && event.key === "I") {
            event.preventDefault();
        }
        // Mencegah Ctrl+U (melihat sumber halaman)
        if (event.ctrlKey && event.key === "u") {
            event.preventDefault();
        }
    });
});