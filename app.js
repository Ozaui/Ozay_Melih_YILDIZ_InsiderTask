$(() => {
  const ProductCarousel = {
    products: [],
    favorites: [],

    init: function () {
      const currentPath = window.location.pathname;
      if (currentPath !== "/") {
        console.log("Wrong Page");
        return;
      }
      this.buildCSS();
      this.buildHTML();
      this.setEvent();
      this.fetchAndRenderProducts();
    },

    buildHTML: function () {
      const html = `
        <div class="new-container">
          <div class="new-title-container">
            <h2 class="new-title">
              Beğenebileceğinizi düşündüklerimiz
            </h2>
          </div>
          <div class="carousel-wrapper">
            <button class="carousel-nav-btn carousel-nav-left">←</button>
            <div class="new-container-carousel"></div>
            <button class="carousel-nav-btn carousel-nav-right">→</button>
          </div>
        </div>
      `;
      let targetElement = $(".ng-star-inserted");

      if (targetElement.length) {
        targetElement.eq(0).prepend(html);
        console.log("Konumlandırma başarılı");
      } else {
        $("body").append(html);
        console.log("Konumlandırma hatası. Sayfa sonuna yerleştirildi");
      }
    },

    buildCSS: function () {
      $("<style>").addClass("carousel-style").html(css).appendTo("head");
    },

    setEvent: function () {
      const self = this;

      $(".new-container").on("click", ".favorite-btn", function () {
        const productId = $(this).closest(".product-info-card").data("id");
        let isFavorite = self.favorites.includes(productId);

        if (isFavorite) {
          self.favorites = self.favorites.filter((id) => id !== productId);
          $(this).html("♡").removeClass("is-favorite");
        } else {
          self.favorites.push(productId);
          $(this).html("♥").addClass("is-favorite");
        }

        localStorage.setItem("FavoriteStorage", JSON.stringify(self.favorites));
        console.log("Favoriler güncellendi:", self.favorites);
      });

      $(".new-container").on("click", ".add-basket-btn", function () {
        const productUrl = $(this).data("url");
        if (productUrl) {
          window.open(productUrl, "_blank");
        } else {
          console.warn("Ürün URL'si bulunamadı");
        }
      });

      $(".new-container").on("click", ".carousel-nav-left", function () {
        const carousel = $(".new-container-carousel");
        carousel.animate({ scrollLeft: carousel.scrollLeft() - 300 }, 300);
      });

      $(".new-container").on("click", ".carousel-nav-right", function () {
        const carousel = $(".new-container-carousel");
        carousel.animate({ scrollLeft: carousel.scrollLeft() + 300 }, 300);
      });
    },

    fetchAndRenderProducts: async function () {
      const BASE_URL =
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
      const productStorage = "ProductsStorage";
      const favoriteStorage = "FavoriteStorage";

      let products = null;

      const cachedProducts = localStorage.getItem(productStorage);
      if (cachedProducts) {
        products = JSON.parse(cachedProducts);
        console.log("Ürünleri localStorage dan çektik");
      } else {
        console.log("Local Storage boş, API'dan çekiyorum");
        try {
          const response = await fetch(BASE_URL);
          if (!response.ok) throw new Error("API isteği gerçekleştirilemedi");
          products = await response.json();
          localStorage.setItem(productStorage, JSON.stringify(products));
        } catch (error) {
          console.log("Veriyi çekerken hata ile karşılaşıldı");
          return;
        }
      }

      const favorites = localStorage.getItem(favoriteStorage);
      this.favorites = favorites ? JSON.parse(favorites) : [];
      this.products = products;
      this.renderProducts(products);
    },

    renderProducts: function (products) {
      const render = $(".new-container").find(".new-container-carousel");
      if (!products || products.length === 0) {
        render.html("Verileri gösterirken problem oldu");
        $(".new-container").show();
        return;
      }

      let cardHTML = "";
      products.forEach((product) => {
        const isFavorite = this.favorites.includes(product.id);
        const favoriteClass = isFavorite ? "is-favorite" : "";
        const favoriteIcon = isFavorite ? "♥" : "♡";

        let priceHTML = `<p>${product.price}TL</p>`;
        if (product.price !== product.original_price) {
          const discount = Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          );
          priceHTML = `
                <p class="original-price-row"><s>${product.original_price} TL</s></p>
                <p class="discount-percent">%${discount}</p>
                <p class="current-price">${product.price} TL</p> 
            `;
        }
        cardHTML += `
          <div class="product-info-card ${favoriteClass}" data-id="${product.id}" data-url="${product.url}">
            <button class="favorite-btn">${favoriteIcon}</button>
            <img src="${product.img}" alt="${product.name}"/>
            <p> ${product.brand} - ${product.name}</p>
            ${priceHTML}
            <button class="add-basket-btn" data-url="${product.url}">+</button>
          </div>
        `;
      });

      render.html(cardHTML);
      $(".new-container").show();
    },
  };

  ProductCarousel.init();
});
