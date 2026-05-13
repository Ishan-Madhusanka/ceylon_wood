const products = {
  'dining-table': {
    name: 'Dining Table', tag: 'Bestseller',
    desc: 'Crafted from premium teak wood, this elegant table offers durability, natural finish, and timeless style. Perfect for family meals, comfortably seating 6 people. Ideal for modern and classic interiors.',
    price: 'From Rs. 55,000',
    details: '🪵 Material: premium teak wood\n👥 Seats: 6\n📐 72"x36" (custom)\n🚚 Delivery: 3–4 weeks',
    images: ['image/diningtable1.webp', 'image/diningtable2.webp', 'image/diningtable3.webp'],
  },
  'wardrobe': {
    name: 'Almira Wardrobe', tag: 'Premium',
    desc: 'Solid Mahogany with dovetail joinery. Available with or without mirror, any custom size.',
    price: 'From Rs. 120,000',
    details: '🪵 Material: Mahogany\n🚪 3-door\n🪞 Mirror optional\n🚚 Delivery: 4–5 weeks',
    images: ['image/almira1.jpeg', 'image/almira2.jpeg', 'image/almira3.jpeg'],
  },
  'sofa': {
    name: 'Colonial Sofa Set', tag: 'Popular',
    desc: 'Rubber Wood frame with high-density foam. 3+1+1 set with premium fabric cushions.',
    price: 'From Rs. 95,000',
    details: '🪵 Material: Rubber Wood\n🛋️ 3+1+1 set\n🎨 Custom fabric\n🚚 Delivery: 3–4 weeks',
    images: ['image/sofa2.jpg', 'image/sofa3.jpg', 'image/sofa1.webp'],
  },
  'dressing-table': {
    name: 'Dressing Table', tag: 'New Arrival',
    desc: 'Jak Wood with adjustable mirror and 3 drawers. Hand-carved drawer handles.',
    price: 'From Rs. 45,000',
    details: '🪵 Material: Jak Wood\n🪞 Adjustable mirror\n🗄️ 3 drawers\n🚚 Delivery: 2–3 weeks',
    images: ['image/dressingtable.jpg', 'image/dressingtable2.jpg', 'image/dressingtable3.png'],
  },
  'bed-frame': {
    name: 'King Size Bed Frame', tag: 'New',
    desc: 'Solid Teak with hand-carved headboard. Available in all standard and custom sizes.',
    price: 'From Rs. 110,000',
    details: '🪵 Material: Solid Teak\n🛏️ King size\n🎨 Hand-carved headboard\n🚚 Delivery: 4–5 weeks',
    images: ['images/bed-frame.jpg', 'images/bed-frame-2.jpg', 'images/bed-frame-3.jpg'],
  },
  'bookshelf': {
    name: 'Bookshelf Cabinet', tag: 'Classic',
    desc: 'Pine Wood 5-shelf unit. Works as bookshelf, display unit, or TV unit.',
    price: 'From Rs. 38,000',
    details: '🪵 Material: Pine\n📚 5 shelves\n🎨 Natural/painted\n🚚 Delivery: 2–3 weeks',
    images: ['images/bookshelf.jpg', 'images/bookshelf-2.jpg', 'images/bookshelf-3.jpg'],
  },

  'Computer Table': {
    name: 'wood computer table', tag: 'Classic',
    desc: 'Pine Wood 5-shelf unit. Works as bookshelf, display unit, or TV unit.',
    price: 'From Rs. 38,000',
    details: '🪵 Material: Pine\n📚 5 shelves\n🎨 Natural/painted\n🚚 Delivery: 2–3 weeks',
    images: ['images/bookshelf.jpg', 'images/bookshelf-2.jpg', 'images/bookshelf-3.jpg'],
  },

  'Side Table': {
    name: 'wood side table', tag: 'Classic',
    desc: 'Pine Wood 5-shelf unit. Works as bookshelf, display unit, or TV unit.',
    price: 'From Rs. 38,000',
    details: '🪵 Material: Pine\n📚 5 shelves\n🎨 Natural/painted\n🚚 Delivery: 2–3 weeks',
    images: ['images/bookshelf.jpg', 'images/bookshelf-2.jpg', 'images/bookshelf-3.jpg'],
  },

  'Display Cabinet': {
    name: 'wood display cabinet', tag: 'Classic',
    desc: 'Pine Wood 5-shelf unit. Works as bookshelf, display unit, or TV unit.',
    price: 'From Rs. 38,000',
    details: '🪵 Material: Pine\n📚 5 shelves\n🎨 Natural/painted\n🚚 Delivery: 2–3 weeks',
    images: ['images/bookshelf.jpg', 'images/bookshelf-2.jpg', 'images/bookshelf-3.jpg'],
  },
};

let cart = [];

function openModal(key) {
  const p = products[key];
  if (!p) return;
  document.getElementById('modal-tag').textContent = p.tag;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-details').innerHTML = p.details.replace(/\n/g, '<br>');
  const mainImg = document.getElementById('modal-main-img');
  mainImg.src = p.images[0]; mainImg.alt = p.name;
  const thumbsEl = document.getElementById('modal-thumbs');
  thumbsEl.innerHTML = '';
  p.images.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'modal-thumb' + (i === 0 ? ' active' : '');
    div.innerHTML = '<img src="' + src + '" alt="">';
    div.onclick = () => switchImage(src, div);
    thumbsEl.appendChild(div);
  });
  const btn = document.getElementById('modal-add-cart');
  btn.textContent = 'Add to Cart 🛒';
  btn.classList.remove('added');
  btn.onclick = () => addToCart(key);
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchImage(src, thumbEl) {
  document.getElementById('modal-main-img').src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function addToCart(key) {
  const p = products[key];
  const existing = cart.find(i => i.key === key);
  if (existing) { existing.qty += 1; } 
  else { cart.push({ key, name: p.name, price: p.price, image: p.images[0], qty: 1 }); }
  updateCartUI();
  const btn = document.getElementById('modal-add-cart');
  btn.textContent = '✓ Added!';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Add to Cart 🛒'; btn.classList.remove('added'); }, 2000);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  updateCartUI();
}

function changeQty(key, amount) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.key !== key);
  }
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = total;
  const itemsEl = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    document.getElementById('cart-footer').style.display = 'none';
    return;
  }
  itemsEl.innerHTML = cart.map(item =>
    '<div class="cart-item">' +
    '<div class="cart-item-img"><img src="' + item.image + '" alt="" onerror="this.style.display=\'none\'"></div>' +
    '<div class="cart-item-info">' +
      '<div class="cart-item-name">' + item.name + '</div>' +
      '<div class="cart-item-qty">' +
        '<button class="qty-btn" onclick="changeQty(\'' + item.key + '\', -1)">−</button>' +
        '<span class="qty-num">' + item.qty + '</span>' +
        '<button class="qty-btn" onclick="changeQty(\'' + item.key + '\', 1)">+</button>' +
      '</div>' +
      '<div class="cart-item-price">' + item.price + '</div>' +
    '</div>' +
    '<button class="cart-item-remove" onclick="removeFromCart(\'' + item.key + '\')">🗑️</button>' +
    '</div>'
  ).join('');
  document.getElementById('cart-footer').style.display = 'block';
  const totalPrice = cart.reduce((sum, i) => {
  const num = parseInt(i.price.replace(/[^0-9]/g, ''));
  return sum + (num * i.qty);
}, 0);
document.getElementById('cart-total').textContent = 'Rs. ' + totalPrice.toLocaleString();
document.getElementById('cart-items-count').textContent = total + ' item' + (total > 1 ? 's' : '');
}


function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}


function handleSubmit() {
  const name = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const product = document.getElementById('product').value;

    if (!fname) {
    alert('Please enter your first name.');
    return;
  }

  if (!lname) {
    alert('Please enter your last name.');
    return;
  }

  if (!email) {
    alert('Please enter your email address.');
    return;
  }

  if (!phone) {
    alert('Please enter your phone number.');
    return;
  }

  if (!product) {
    alert('Please select a product.');
    return;
  }

  if (!message) {
    alert('Please enter your message.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = '✓ Enquiry Sent!';
  btn.style.background = '#4A7C4A';

  setTimeout(() => {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('product').value = '';
  }, 3000);
}
