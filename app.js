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
      <div class="container-with-buttons">
        <div class="before-btn"> ← </div>
        <div class="new-container">
          <div class="new-title-container">
            <h2 class="new-title">
              Beğenebileceğinizi düşündüklerimiz
            </h2>
          </div>
          <div class="carousel-wrapper">
            <div class="new-container-carousel">
            </div>
          </div>
        </div>
        <div class="next-btn"> → </div>
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
      const css = `
          *{
            font-family: Quicksand-SemiBold;
            font-weight: bold;
          }

          .new-title-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
            
          .container-with-buttons {
            position: relative;
            display: flex;
            align-items: center;
          }

          .new-container {
            flex: 1;
            overflow: hidden;
          }

        .before-btn,
          .next-btn {
            width: 40px;
            height: 40px;
            background: #fff; 
            color: black;
            border-radius: 50%;
            box-shadow: 0 6px 2px 0 #03030303, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position:absolute; 
            font-size: 24px;
            z-index: 10; 
            top: 50%; 
            transform: translateY(-50%); 
            border: none;
          }

          .before-btn{         
            left: -65px;
          }

          .next-btn {
            right: -65px;
          }
         
          .new-title{
            font-size: 24px;
            font-weight: 500;
            color: 2b2f33;
          }

          .carousel-wrapper {
            position: relative;
          }

          .new-container-carousel {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 24px;
          }

          .product-info-card {
            position: relative;
            width: 100%;
            border: 1px solid #f2f5f7;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            background: white;
          }

          .product-info-card img {
            width: 100%;
            object-fit: contain;
            margin-bottom: 12px;
          }

          .favorite-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background:white; 
          }

          .favorite-btn:hover {
            color: orange;
          }

          .favorite-btn.is-favorite {
            color: orange;
          }

          .original-price-row {
            font-size: 12px;
            color: #a2b1bc !important;
            display: inline-block;
            margin-right: 8px;
            text-decoration: line-through;
          }

          .discount-percent {
            display: inline-block;
            padding: 0 4px;
            background: #00a365;
            color: white;
            border-radius: 16px;
            font-size: 12px;
          }

          .current-price {
            display: inline-block;
            font-size: 18px !important;
            font-weight: bolder;
            color: #00a365;
          }

          .current-price-alone {
            display: inline-block;
            font-size: 18px !important;
            font-weight: bolder;
            color: black;
          }

          .add-basket-btn {
            position: absolute;
            bottom: 12px;
            right: 12px;
            background: #fff;
            color: #0091d5;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: rgba(176, 176, 176, 0.01) 0px 6px 2px 0px, rgba(176, 176, 176, 0.08) 0px 2px 9px 0px, rgba(176, 176, 176, 0.14) 0px 2px 4px 0px, rgba(176, 176, 176, 0.24) 0px 0px 1px 0px, rgba(176, 176, 176, 0.28) 0px 0px 1px 0px;
          }

          .add-basket-btn:hover {
            background: #0091d5;
            color : #fff;
          }

          /* 1400px altı - 4 kart */
          @media screen and (max-width: 1480px) {
            .new-container-carousel {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          /* 1024px altı - 3 kart */
          @media screen and (max-width: 1279px) {
            .new-container-carousel {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          /* 768px altı - 2 kart (Tablet) */
          @media screen and (max-width: 991px) {
            .new-container-carousel {
              grid-template-columns: repeat(2, 1fr);
            }

            .product-info-card {
              padding: 10px;
            }

            .product-info-card > p:first-of-type {
              font-size: 13px;
            }

            .current-price,
            .product-info-card > p {
              font-size: 16px;
            }

            .before-btn,
            .next-btn {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }
          }

          /* 480px altı - 2 kart (Mobil) */
          @media screen and (max-width: 480px) {
            .new-title{
              font-size:20px;
            }

            .new-container-carousel {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              padding: 12px 0;
            }

            .product-info-card {
              padding: 8px;
            }

            .favorite-btn {
              width: 32px;
              height: 32px;
              font-size: 16px;
              top: 8px;
              right: 8px;
            }

            .add-basket-btn {
              width: 38px;
              height: 38px;
              font-size: 22px;
              bottom: 8px;
              right: 8px;
            }

            .product-info-card > p:first-of-type {
              font-size: 12px;
              margin-bottom: 6px;
            }

            .discount-percent {
              font-size: 11px;
              padding: 2px 4px;
            }

            .current-price,
            .product-info-card > p {
              font-size: 14px;
            }

            .product-info-card img {
              margin-bottom: 8px;
            }

            .before-btn,
            .next-btn {
              width: 35px;
              height: 35px;
              font-size: 18px;
            }
          }

          /* 360px altı - Çok küçük ekranlar */
          @media screen and (max-width: 360px) {
            .product-info-card {
              padding: 6px;
            }

            .favorite-btn {
              width: 28px;
              height: 28px;
              font-size: 14px;
            }

            .add-basket-btn {
              width: 34px;
              height: 34px;
              font-size: 20px;
            }

            .product-info-card > p:first-of-type {
              font-size: 11px;
            }

            .current-price,
            .product-info-card > p {
              font-size: 13px;
            }
          }
      `;
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

        let priceHTML = `<p class="current-price-alone">${product.price}TL</p>`;
        if (product.price !== product.original_price) {
          const discount = Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          );
          priceHTML = `
                <div>
                  <span class="original-price-row">${product.original_price} TL</span>
                  <span class="discount-percent">%${discount}</span>
                </div>
                <p class="current-price">${product.price} TL</p> 
            `;
        }
        cardHTML += `
          <div class="product-info-card ${favoriteClass}" data-id="${product.id}" data-url="${product.url}">
            <button class="favorite-btn ${favoriteClass}">${favoriteIcon}</button>
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
