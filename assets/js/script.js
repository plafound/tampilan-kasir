document.addEventListener("DOMContentLoaded", () => {
  const productMenu = document.getElementById("productMenu");
  const orderContainer = document.getElementById("orderContainer");
  const subtotalElement = document.getElementById("Subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const totalHargaModal = document.getElementById("totalHarga");
  const categoryLinks = document.querySelectorAll(".nav-menu");
  const orderDetails = document.getElementById("orderDetails");
  const paymentMethod = document.getElementById("paymentMethod");
  const paymentMethodModal = document.getElementById("paymentMethodModal");
  const confirmOrderButton = document.getElementById("confirmOrderButton");

  // Data produk
  const products = [
    {
      id: 1,
      name: "Nasi Goreng",
      kategori: "Makanan",
      harga: 15000,
      gambar: "assets/images/nasgor.jpg",
    },
    {
      id: 2,
      name: "Air Mineral",
      kategori: "Minuman",
      harga: 5000,
      gambar: "assets/images/aqua.jpg",
    },
    {
      id: 3,
      name: "Kentang Goreng",
      kategori: "Snack",
      harga: 10000,
      gambar: "assets/images/kentang.png",
    },
    {
      id: 4,
      name: "Nasi Goreng Udang",
      kategori: "Makanan",
      harga: 17000,
      gambar: "assets/images/nasgor.jpg",
    },
    {
      id: 5,
      name: "Air Mineral (kecil)",
      kategori: "Minuman",
      harga: 3000,
      gambar: "assets/images/aqua.jpg",
    },
    {
      id: 6,
      name: "Kentang Goreng (kecil)",
      kategori: "Snack",
      harga: 7000,
      gambar: "assets/images/kentang.png",
    },
    {
      id: 7,
      name: "Signature Burger",
      description:
        "Premium beef patty with fresh lettuce, tomato, onion, pickles, and our secret signature sauce.",
      harga: 20000,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_1280.jpg",
      tags: ["Bestseller"],
    },
    {
      id: 8,
      name: "Double Cheese Deluxe",
      description:
        "Two juicy beef patties with double cheddar cheese, caramelized onions, and special sauce.",
      harga: 26000,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419420_1280.jpg",
      tags: ["Popular"],
    },
    {
      id: 9,
      name: "Bacon Avocado",
      description:
        "Angus beef patty topped with crispy bacon, fresh avocado, lettuce, and garlic aioli.",
      harga: 27500,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg",
      tags: ["New"],
    },
    {
      id: 10,
      name: "Spicy Jalapeño",
      description:
        "Beef patty with pepper jack cheese, fresh jalapeños, spicy mayo, and crispy onion strings.",
      harga: 25000,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2020/09/14/16/23/burger-5571385_1280.jpg",
      tags: ["Spicy"],
    },
    {
      id: 11,
      name: "Mushroom Swiss",
      description:
        "Beef patty topped with sautéed mushrooms, melted Swiss cheese, and truffle aioli.",
      harga: 26500,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2021/12/09/20/46/burger-6859072_1280.jpg",
      tags: ["Classic"],
    },
    {
      id: 12,
      name: "Veggie Deluxe",
      description:
        "Plant-based patty with fresh avocado, grilled peppers, lettuce, and vegan garlic aioli.",
      harga: 20000,
      kategori: "Makanan",
      gambar:
        "https://cdn.pixabay.com/photo/2021/03/19/21/52/burger-6108495_1280.jpg",
      tags: ["Vegetarian"],
    },
  ];

  // Fungsi untuk merender produk
  function renderProducts() {
    // Bersihkan kontainer produk
    productMenu.innerHTML = "";

    // Loop melalui data produk dan buat elemen HTML untuk setiap produk
    products.forEach((product) => {
      // Buat elemen HTML untuk setiap produk
      const card = `
            <div class="col-6 col-lg-3">
                <div class="card cursor-pointer card-menu" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-kategori="${product.kategori}" 
                    data-harga="${product.harga}">
                <div class="card-body p-4 text-center">
                    <p class="text-secondary fs-7">${product.kategori}</p>
                    <img src="${product.gambar}" alt="${
        product.name
      }" class="w-75 d-block mx-auto" style="height: 80px; width: 80px; object-fit: contain;">
                    <h4 class="card-title mt-2 mb-2" style="font-size: 13px;font-weight: 600;)">${
                      product.name
                    }</h4>
                    <p class="mb-0 text-primary fw-semibold">Rp. ${product.harga.toLocaleString()}</p>
                </div>
                </div>
            </div>
            `;
      // Tambahkan elemen card ke dalam kontainer
      productMenu.innerHTML += card;
    });
  }

  // Panggil fungsi render saat halaman dimuat
  renderProducts();

  // Inisialisasi variabel keranjang
  let cartItems = [];

  // Fungsi untuk memperbarui total harga
  function calculateTotals() {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.harga * item.quantity,
      0
    );
    // const tax = subtotal * 0.1; // Pajak 10% dari subtotal
    const tax = 0;
    const total = subtotal + tax;

    // Update tampilan subtotal, pajak, dan total
    subtotalElement.textContent = `Rp. ${subtotal.toLocaleString("id-ID")}`;
    taxElement.textContent = `Rp. ${tax.toLocaleString("id-ID")}`;
    totalElement.textContent = `Rp. ${total.toLocaleString("id-ID")}`;
    totalHargaModal.value = `Rp. ${total.toLocaleString("id-ID")}`;

    // Update nilai di modal konfirmasi pembayaran
    document.getElementById(
      "totalHarga"
    ).textContent = `Rp. ${subtotal.toLocaleString("id-ID")}`;
    document.getElementById("taxModal").textContent = `Rp. ${tax.toLocaleString(
      "id-ID"
    )}`;
    document.getElementById(
      "totalPaymentModal"
    ).textContent = `Rp. ${total.toLocaleString("id-ID")}`;
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
      cartItem.className =
        "d-flex justify-content-between align-items-center mb-3";
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
                    <p class="mb-0 fw-bold">Rp. ${(
                      item.harga * item.quantity
                    ).toLocaleString("id-ID")}</p>
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
    const cards = productMenu.querySelectorAll(".card-menu");
    cards.forEach((card) => {
      const cardCategory = card.dataset.kategori;
      if (category === "Semua" || cardCategory === category) {
        card.style.display = "block"; // Tampilkan item
      } else {
        card.style.display = "none"; // Sembunyikan item
      }
    });
  }

  // Event listener untuk navigasi kategori
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      categoryLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      const category = e.target.textContent; // Ambil kategori dari teks link
      filterMenu(category);
    });
  });

  // Menampilkan semua item ketika halaman pertama kali dimuat
  filterMenu("Semua");

  // Menampilkan rincian pesanan di modal
  function showOrderDetails() {
    orderDetails.innerHTML = ""; // Bersihkan rincian
    cartItems.forEach((item) => {
      const itemDetail = document.createElement("div");
      itemDetail.className = "d-flex justify-content-between";
      itemDetail.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>Rp. ${(item.harga * item.quantity).toLocaleString(
                  "id-ID"
                )}</span>
            `;
      orderDetails.appendChild(itemDetail);
    });
  }

  // Menampilkan modal konfirmasi pemesanan
  function showConfirmationModal() {
    showOrderDetails();
    const selectedPaymentMethod = paymentMethod.value;
    paymentMethodModal.textContent =
      selectedPaymentMethod.charAt(0).toUpperCase() +
      selectedPaymentMethod.slice(1); // Menampilkan metode pembayaran yang dipilih
    const modal = new bootstrap.Modal(
      document.getElementById("orderConfirmationModal")
    );
    modal.show();
  }

  // Event listener untuk konfirmasi pesanan
  confirmOrderButton.addEventListener("click", () => {
    const selectedPaymentMethod = paymentMethod.value;
    alert(
      `Pesanan berhasil dikonfirmasi dengan metode pembayaran: ${selectedPaymentMethod}`
    );
    // Reset keranjang setelah konfirmasi
    cartItems = [];
    renderCart();
    calculateTotals();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("orderConfirmationModal")
    );
    modal.hide();
  });

  // Menampilkan modal konfirmasi pemesanan
  document
    .getElementById("confirmButton")
    .addEventListener("click", showConfirmationModal);

  // Mencegah klik kanan dan keyboard shortcut tertentu
  // document.addEventListener('contextmenu', (event) => event.preventDefault());
  // document.addEventListener('keydown', (event) => {
  //     // Mencegah F12
  //     if (event.key === "F12") {
  //         event.preventDefault();
  //     }
  //     // Mencegah Ctrl+Shift+I
  //     if (event.ctrlKey && event.shiftKey && event.key === "I") {
  //         event.preventDefault();
  //     }
  //     // Mencegah Ctrl+U (melihat sumber halaman)
  //     if (event.ctrlKey && event.key === "u") {
  //         event.preventDefault();
  //     }
  // });
});
