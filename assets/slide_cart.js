/*-----------------------------------------------------------------------------/
/ Slide Cart Popup
/-----------------------------------------------------------------------------*/
(function ($) {
    
    const defaultsCart = {
        cartDrawerContent: '.wrap-mini-cart-content',
        cartDrawerContentFooter: '.wrap-mini-cart-content-footer',
        removeFromCart: '.remove-cart',
        removeFromCartNoDot: 'remove-cart',
        cartAnnoucementWrap: 'siderbar-cart__annoucement_wrap',
        cartAnnoucementBarContent: 'siderbar-cart__annoucement_bar_content',
        cartAnnoucementBarComplete: 'siderbar-cart__annoucement_complete',
        cartAnnoucementBarInComplete: 'siderbar-cart__annoucement_incomplete',
        cartDrawerContentMobile: '.wrap-mini-cart-content-mobile',
        cartDrawerContentFooterMobile: '.wrap-mini-cart-content-footer-mobile',
        loadingAjax : 'icon__loading',
        elmDiscountCode : 'apply-discount',
        cartCount: 'CartCount',
        cartMobileContent: 'siderbar-cart-mobile',
        shippingText: '.shipping-text',
        mobileClose: '.siderbar-cart-mobile__close'
    };

    const cartDrawerContent = document.querySelector(defaultsCart.cartDrawerContent);
    const cartDrawerContentFooter = document.querySelector(defaultsCart.cartDrawerContentFooter);
    const cartAnnoucementBarContent =  document.getElementsByClassName(defaultsCart.cartAnnoucementBarContent)[0];
    const limitShipping = cartAnnoucementBarContent.getAttribute('data-limit-shipping');
    const cartAnnoucementWrap = document.getElementsByClassName(defaultsCart.cartAnnoucementWrap)[0];
    const cartAnnoucementBarComplete =  document.getElementsByClassName(defaultsCart.cartAnnoucementBarComplete)[0];
    const cartAnnoucementBarInComplete =  document.getElementsByClassName(defaultsCart.cartAnnoucementBarInComplete)[0];
    const cartCountSelector = document.getElementById(defaultsCart.cartCount);
    const cartDrawerContentMobile = document.querySelector(defaultsCart.cartDrawerContentMobile);
    const cartDrawerContentFooterMobile = document.querySelector(defaultsCart.cartDrawerContentFooterMobile);
    const loadingAjax = document.getElementsByClassName(defaultsCart.loadingAjax)[0];
    const discountCode = document.getElementsByClassName(defaultsCart.elmDiscountCode)[0];
    // const hasDiscountCode = document.getElementsByClassName(defaultsCart.elmDiscountCode)[0];
    const cartMobileContent = document.getElementsByClassName(defaultsCart.cartMobileContent)[0];
    const shippingText = document.querySelector(defaultsCart.shippingText);
    const mobileClose = document.querySelector(defaultsCart.mobileClose);

    $.getWithScrollbarWindow = function () {
        var scrollDiv = $("<div style='width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;'></div>");
        $("body").append(scrollDiv);
        var scrollbarWidth = scrollDiv[0].offsetWidth - scrollDiv[0].clientWidth;
        scrollDiv.remove();
        return scrollbarWidth;
    };

    // BACKDROP
    $.backdrop_show = function (options) {
        var settings = $.extend({
            callbackshow: null, callbackhide: null,
            notscroll: true, timeout: 500, class: ''
        }, options);
        var getWithScrollbarWindow = $.getWithScrollbarWindow();

        if ($(".backdrop-core").length < 1) {
            $("body").append("<div class='backdrop-core " + settings.class + "'></div>");
            setTimeout(function () {
                $(".backdrop-core").addClass("opening");
                if (getWithScrollbarWindow > 0) { $("body").css({marginRight: getWithScrollbarWindow}); }
                if (settings.callbackshow) {
                    settings.callbackshow();
                }
                if (settings.notscroll) {
                    $("body").addClass("modal-open");
                }
            }, 10);
            $(".backdrop-core").on("click", function () {
                $.backdrop_hide(settings);
            });
        }
    };

    $.backdrop_hide = function (options) {
        var settings = $.extend({
            callbackhide: null,
            notscroll: true, timeout: 500, class: ''
        }, options);

        if ($(".backdrop-core").length > 0) {
            if (settings.callbackhide) {
                settings.callbackhide();
            }
            $(".backdrop-core").removeClass("opening");
            if (settings.notscroll) {
                $("body").removeClass("modal-open").css({marginRight: ""});
            }
            setTimeout(function () {
                $(".backdrop-core").remove();
            }, settings.timeout);
        }
    };


    $(".icon-cart").click(function () {
        $.backdrop_show({
            callbackshow: function () {
                $("#cart-content").addClass("on");
                $('.header-page,.super-header').addClass('go-down');
            },
            callbackhide: function () {
                $("#cart-content").removeClass("on");
            },
            class: "backdrop-cart",
        });

        fetchCart(true);
    });

    $(document).on('click', "#cart-content .close", function () {
        
        $.backdrop_hide({
            callbackhide: function () {
                $("#cart-content").removeClass("on");
            }
        });
    });

    $('.wrap-mini-cart-upsell__add_to_cart').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.js-product-form').css('display', 'none');
        const formID = $(this).closest('.js-product-form').attr('id');
        addProductToCart(formID);
    });

    $('.js-product-add').on('click', function(e) {
        // cartMobileContent.style.display = 'block'; original
        cartMobileContent.style.display = 'none';
        fetchCart(false);
    });

    mobileClose.addEventListener('click', function(){
        cartMobileContent.style.display = 'none';
    });

    $(document).ready(function() {
        fetchCart(false);
    });

    
   
    /**
     *
     * @param cart
     */
    function renderCart(cart) {
        clearCartDrawer();
        const cartTotal = cart.item_count;

        cart.items.forEach((item, index) => {
            const key = item.key;
            const productTitle = item.product_title;
            const itemQty = item.quantity;
            const itemMinus = itemQty - 1;
            const itemPlus = itemQty + 1;
            const linePrice = formatMoneyCart(item.line_price);
            const productImage = `<a class="img column" href="${item.url}"><img src="${item.image}" alt="${productTitle}"/></a>`;
            const btnMinus = `<button type="button" class="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="${key}" data-qty="${itemMinus}"><span aria-hidden="true">&minus;</span></button>`;
            const btnAdd = `<button type="button" class="js-qty__adjust js-qty__adjust--plus" data-id="${key}" data-qty="${itemPlus}"><span aria-hidden="true">+</span></button>`
            const txtQuantity = `<input type="text" class="js-qty__num" value="${itemQty}" min="1" data-id="${key}" aria-label="quantity" pattern="[0-9]*" name="updates[]" id="${key}"></input>`;
            
            const concatProductInfo = `
                <div class="cart-buy row-section" data-line="${Number(index + 1)}" data-product-id=${item.id}>
                    ${productImage}
                    <div class="cart-info-wrap">
                        <div class="cart-info-title">
                            <div class="info_name">${productTitle}</div>
                            <div class="js-qty">${btnMinus}${txtQuantity}${btnAdd}</div>
                            <p>&nbsp;</p><a class="remove remove-cart" href="#">Remove</a>
                        </div>
                    </div>
                    <div class="cart-info-price">${linePrice}</div>
                </div>`;
            cartDrawerContent.innerHTML += concatProductInfo;
        });

        cartDrawerContentFooter.innerHTML = '';
        cartDrawerContentFooter.innerHTML += renderSubTotal(cart);
        
        removeFromCart = document.querySelectorAll(defaultsCart.removeFromCart);

        for (let i = 0; i < removeFromCart.length; i++) {
            removeFromCart[i].addEventListener('click', function() {
                const line = this.closest('.cart-buy').getAttribute('data-line');
                const productId = this.closest('.cart-buy').getAttribute('data-product-id');
                changeItem(line, 0, productId);
            });
        }

        cartAnnoucementBarContent.style.width = `${(100/limitShipping)*cartTotal > 100 ? 100 : (100/limitShipping)*cartTotal}%`;

        $('.js-qty__adjust').click( function() {
            var $el = $(this),
            id = $el.data('id'),
            $qtySelector = $el.siblings('.js-qty__num'),
            qty = parseInt($qtySelector.val().replace(/\D/g, ''));

            if (this.closest('.cart-buy') != null) {
                const line = this.closest('.cart-buy').getAttribute('data-line');
                // Add or subtract from the current quantity
                if ($el.hasClass('js-qty__adjust--plus')) {
                    qty = qty + 1;
                } else {
                    qty -= 1;
                    if (qty <= 1) qty = 1;
                }
                // Update the input's number
                $qtySelector.val(qty);
                changeItem(line, qty);
            }
            
        });
    }

    function renderCartMobile(cart)
    {
        clearCartDrawerMobile();
        
        if (cart.item_count != 0 && cartDrawerContentMobile != null) {
            // cartMobileContent.style.display = 'block';
            cart.items.forEach((item, index) => {
                const productImage = `<img src="${item.image}" alt="${item.product_title}"/>`;
                const itemQty = `<span class="product-item__quantity">x${item.quantity}</span>`;
                const concatProductMobileInfo = `
                    <li>
                        <div class="product-item">
                            <div class="product-item__image">${productImage}${itemQty}</div>
                        </div>
                    </li>
                `;
                cartDrawerContentMobile.innerHTML += concatProductMobileInfo;
            });

            cartDrawerContentFooterMobile.innerHTML = '';
            cartDrawerContentFooterMobile.innerHTML += renderSubTotal(cart);
        }
        
    }

    function addProductToCart(formID)
    {
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            dataType: 'json',
            data: $('#' + formID).serialize(),
            beforeSend: function(){
                setTimeout(function () { showLoading(); }, 10);
            },
            success() {
                fetchCart();
            },
            complete() {
                hideLoading();
            },
            error(error) {
                ajaxRequestFail(error);
            },
        });
    }

    /**
     *
     * @param {function} callback
     * @param {boolean} resetCart
     */
    function fetchCart(callback) {
        $.ajax({
            type: 'GET',
            url: '/cart.js',
            dataType: 'json',
            beforeSend: function(){
                setTimeout(function () { showLoading(); }, 10);
            },
            success(cart) {
                onCartUpdate(cart);
                if (cart.item_count === 0 && callback == true) {
                    renderBlankCart();
                } else {
                    // first render
                    renderCart(cart);
                    renderCartMobile(cart);

                    cart.items.forEach((item, index) => {
                        checkDuplicateCartAndUpsellProducts(item.id, false);
                    });
                    
                    handleAnnoucementBarStatus(cart.item_count);

                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            },
            complete() {
                hideLoading();
            },
            error(error) {
                ajaxRequestFail(error);
            },
        });
    }

    /**
     * @param cart
     */
    function onCartUpdate(cart) {
        cartCountSelector.innerHTML = cart.item_count;
    }

    /**
     * Function for fetchCart and removeItem
     * @param line
     * @param callback
     */
    function changeItem(line, quantity, callback) {
        $.ajax({
            type: 'POST',
            url: '/cart/change.js',
            data: `quantity=${quantity}&line=${line}`,
            dataType: 'json',
            beforeSend: function(){
                setTimeout(function () { showLoading(); }, 10);
            },
            success(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                } else {
                    const statusCart = cart.item_count == 0 ? true : false;
                    fetchCart(statusCart);
                    if(typeof callback != undefined) {
                        checkDuplicateCartAndUpsellProducts(callback, true);
                    }
                    handleAnnoucementBarStatus(cart.item_count);
                }
            },
            complete() {
                hideLoading();
            },
            error(error) {
                ajaxRequestFail(error);
            },
        });
    }

    function ajaxRequestFail(error){
        console.log("Error", error);
    }

    function clearCartDrawer() {
        cartDrawerContent.innerHTML = '';
        cartDrawerContentFooter.innerHTML = '';
    }

    function clearCartDrawerMobile() {
        cartDrawerContentMobile.innerHTML = '';
        cartDrawerContentFooterMobile.innerHTML = '';
    }

    function renderBlankCart() {
        clearCartDrawer();
        const blankCartContent = '<div class="siderbar-cart__empty_title">Your cart is currently empty.</div>';
        cartDrawerContent.innerHTML = blankCartContent;
        cartAnnoucementWrap.style.display = 'none';
        cartMobileContent.style.display = 'none';
        cartAnnoucementBarInComplete.style.display = 'none';
        cartAnnoucementBarComplete.style.display = 'none';

        $('.button-checkout').addClass("disabled");
    }

    /**
     * Check show/hidden bar content 
     * @param {int} itemCount 
     */
    function handleAnnoucementBarStatus(itemCount)
    {  
        if(limitShipping <= itemCount) {
            cartAnnoucementBarComplete.style.display = 'block';
            cartAnnoucementBarInComplete.style.display = 'none';
        } else {
            cartAnnoucementBarInComplete.style.display = 'block';
            cartAnnoucementBarComplete.style.display = 'none';
            cartAnnoucementBarInComplete.innerHTML = cartAnnoucementBarInComplete.textContent.replace('{{itemNumber}}', limitShipping - itemCount);
        }
    }

    function checkDuplicateCartAndUpsellProducts(callback, hasShow)
    {
        let show = (hasShow) ? 'block' : 'none';
        $('.js-product-form').each(function(i){
            var idUpSell = $(this).data('index');
            if (callback == idUpSell) {
                $(this).closest('form').css('display', show);
            }
        });
    }

    function showLoading()
    {
        loadingAjax.style.display = 'block';
    }

    function hideLoading()
    {
        loadingAjax.style.display = 'none';
    }

    /**
     * format money with shopify setting
     */
    function formatMoneyCart(money)
    {
        return Shopify.formatMoney(money, Shopify.money_format)
    }

    /**
     * Render cart sub total use discount code
     * @param {object} cart 
     */
    function renderSubTotal(cart)
    {  
        if (cart.item_count != 0 && discountCode != null) {
            let discountPrice = 0;
            let shippingFee = 0;
            const discounts = cart.cart_level_discount_applications;
            const subTotalPrice = formatMoneyCart(cart.items_subtotal_price);
            const shippingMsg = (shippingText != null) ? shippingText.getAttribute('data-text') : '';
            const hasDiscountCode = discountCode.getAttribute('ds-has-apply');
            const dsCode = discountCode.getAttribute('ds-auto');
            let textDiscount = '';
            
            if (discounts.length != 0 && typeof discountCode !== 'undefined') {
                for(let i = 0; i < discounts.length; i++) {
                    if(dsCode == discounts[i].title) {
                        discountPrice = cart.original_total_price - discounts[i].total_allocated_amount;
                        shippingFee = discounts[i].total_allocated_amount;
                    }
                }
            }

            if (hasDiscountCode == 'yes') {
                textDiscount = (discountPrice != 0) ? `<s>${subTotalPrice}</s> &nbsp; ${formatMoneyCart(discountPrice)}` : `${subTotalPrice}`;
            } else {
                textDiscount = `${subTotalPrice}`;
            }

            const textShippingFee = `<span>Shipping: </span> <span>${shippingMsg}</span>`;
            return `<div class="siderbar-cart-mobile__subtotal">
                <div><span>Subtotal ( ${cart.item_count} items ): </span><span>${textDiscount}</span></div>
                <div>${textShippingFee}</div> 
            </div>`;
        }
        return '';
    }

})(jQuery);