document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    if (menuToggle && sidebarMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarMenu.classList.toggle('active');
        });
    }

    if (closeSidebarBtn && sidebarMenu) {
        closeSidebarBtn.addEventListener('click', function() {
            sidebarMenu.classList.remove('active');
        });
    }

    // Cerrar sidebar si se hace clic fuera de ella (opcional)
    document.addEventListener('click', function(event) {
        if (sidebarMenu && sidebarMenu.classList.contains('active')) {
            const isClickInsideSidebar = sidebarMenu.contains(event.target);
            const isClickOnMenuToggle = menuToggle ? menuToggle.contains(event.target) : false;
            if (!isClickInsideSidebar && !isClickOnMenuToggle) {
                sidebarMenu.classList.remove('active');
            }
        }
    });

    // Funcionalidad básica para el carrito (simulada)
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartCountSpan = document.querySelector('.cart-count');
    let cartItemCount = 0; // Debería leerse de localStorage o similar en una app real

    if (cartCountSpan) { // Actualizar el contador inicial si ya hay items (ej. desde localStorage)
        const storedCartCount = parseInt(localStorage.getItem('cartItemCountDeluxe')) || 0;
        cartItemCount = storedCartCount;
        cartCountSpan.textContent = cartItemCount;
        if (cartItemCount > 0) cartCountSpan.style.display = 'flex';
        else cartCountSpan.style.display = 'none';
    }


    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItemCount++;
            if (cartCountSpan) {
                cartCountSpan.textContent = cartItemCount;
                cartCountSpan.style.display = 'flex'; // Mostrar si estaba oculto
                // Guardar en localStorage para persistencia simple
                localStorage.setItem('cartItemCountDeluxe', cartItemCount);

                // Efecto visual rápido
                cartCountSpan.classList.add('pulse');
                setTimeout(() => cartCountSpan.classList.remove('pulse'), 300);
            }
            // Aquí podrías añadir lógica para realmente agregar el producto al carrito
            // (ej. a un array de objetos, y actualizar localStorage con los productos)
            alert('¡Producto agregado al carrito! (Simulación)');
        });
    });

    // Para la página del carrito (carrito.html)
    const checkoutButton = document.querySelector('.btn-checkout');
    const checkoutFormSection = document.querySelector('.checkout-form-section');
    const confirmOrderButton = document.querySelector('.btn-confirm-order');

    if (checkoutButton && checkoutFormSection) {
        checkoutButton.addEventListener('click', function() {
            checkoutFormSection.style.display = 'block';
            checkoutButton.style.display = 'none'; // Ocultar botón "Finalizar Compra"
             // Scroll hacia el formulario
            checkoutFormSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir envío real del formulario
            // Aquí iría la validación del formulario y el envío al backend
            alert('¡Pedido confirmado y enviado! (Simulación). Gracias por tu compra.');
            // Limpiar carrito (simulado)
            localStorage.removeItem('cartItemCountDeluxe');
            if(cartCountSpan) {
                cartCountSpan.textContent = '0';
                cartCountSpan.style.display = 'none';
            }
            // Redirigir a una página de gracias o a la home
            // window.location.href = 'index.html';
            // Por ahora, simplemente ocultamos el formulario y mostramos mensaje
            if(checkoutFormSection) checkoutFormSection.style.display = 'none';
            if(document.querySelector('.cart-items')) document.querySelector('.cart-items').innerHTML = '<p>Tu carrito está vacío.</p>';
            if(document.querySelector('.cart-summary')) document.querySelector('.cart-summary').innerHTML = '<p>Gracias por tu compra. Vuelve pronto.</p>';

        });
    }

    // Estilo CSS para el pulso del carrito (añadir al <head> o a style.css)
    const style = document.createElement('style');
    style.innerHTML = `
    .cart-count.pulse {
        animation: pulse 0.3s ease-out;
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    `;
    document.head.appendChild(style);

});